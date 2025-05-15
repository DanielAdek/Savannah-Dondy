import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatEntry } from '../lead/lead.schema';

export interface AiResult {
  reply: string;
  tag: 'Not relevant' | 'Weak lead' | 'Hot lead' | 'Very big potential';
  email?: string;
  companyName?: string;
  options?: string[];
}

// const systemPrompt = `
// You are IntelliBrain’s AI sales assistant. 

// EVERY single response MUST be a single JSON object, and NOTHING else.

// Schema:
// {
//   "reply":     "<string — what the bot says next>",
//   "tag":       "<Not relevant|Weak lead|Hot lead|Very big potential>",
//   "email":     "<string — extracted email or empty>",
//   "companyName":"<string — extracted company or empty>",
//   "options":   ["<option1>", "<option2>", ...]   // empty array if none
// }

// Flow (examples):

// 1) No prior messages:
// {"reply":"You are welcome to IntelliBrain. The world's most qualified talents. What talent do you want to hire?","tag":"Not relevant","email":"","companyName":"","options":["Frontend Developer","Backend Developer","Full Stack Developer","AI Engineer","DevOps Engineer"]}

// 2) User picks a talent:
// {"reply":"When are you looking to hire?","tag":"Not relevant","email":"","companyName":"","options":["Immediately","2 weeks","1 month","3 months","Not sure"]}

// 3) User picks timeline:
// {"reply":"Let's gather some information about you, What is your company name?","tag":"Not relevant","email":"","companyName":"","options":[]}

// 4) User enters company:
// {"reply":"What is your email address?","tag":"Not relevant","email":"","companyName":"","options":[]}

// 5) User enters email:
// {"reply":"What is your estimated budget or team size for this hire?","tag":"Not relevant","email":"","companyName":"<user’s company>","options":[]}

// 6) User picks budget:
// {"reply":"Thanks! I’ll connect you with the right talent. Here’s our Calendly link: ...","tag":"Hot lead","email":"","companyName":"<user’s company>","options":[]}

// Always follow this schema exactly, even on free-text questions.
// `.trim();


const systemPrompt = `
  You are IntelliBrain’s AI sales assistant. Every single response MUST be a valid JSON object and NOTHING else.

Return exactly:
{
  "reply": "...",
  "tag": "Not relevant|Weak lead|Hot lead|Very big potential",
  "email": "...",
  "companyName": "...",
  "options": [ /* quick-reply button labels OR empty array */ ]
}

Flow:
1) If no messages yet → "Welcome to IntelliBrain, The worlds most qualified talents!. + talent question" (options: [...])
2) If talent chosen → "Continue conversation naturally. When are you looking to hire?" (options: [...])
3) If timeline chosen → "Continue conversation naturally. + get company name?" (options: [...])
4) If company name given → "Continue conversation naturally. + get email" (optins: [...])
5) If email given → "Continue conversation naturally. What is your estimated budget or team size for this hire?" (options: [...])
6) If budget chosen or team size → "Continue conversation naturally. compute tag and reply. Thanks! …" (options: [])

  Only share calendly link when you gather enough info.
;
`

@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor() {
    const config = {
      apiKey: process.env.OPENAI_API_KEY,
    };
    this.openai = new OpenAI(config);
  }

  /** 
   * Send the full chat history and the latest user message to the LLM.
   * Expect a JSON response with: { reply, tag, email?, companyName? } 
   */
  async analyzeLead(chat: ChatEntry[]): Promise<AiResult> {
    // System prompt
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt.trim() },
      ...chat.map(e => ({
        role: e.from === 'user' ? 'user' : 'assistant',
        content: e.text,
      })),
    ] as OpenAI.ChatCompletionMessageParam[];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages,
      temperature: 0
    });

    const raw = response.choices[0].message.content.trim();

    this.logger.debug(`LLM raw output: ${raw}`);

    try {
      const jsonMatch = raw.match(/\{[\s\S]*?\}/);
      const result = JSON.parse(jsonMatch[0]) as AiResult;
      return {
        reply: result.reply || 'Sorry, I didn’t quite get that. Could you clarify?',
        tag: result.tag || 'Not relevant',
        email: result.email || '',
        companyName: result.companyName || '',
        options: result.options || [],
      };
    } catch (e) {
      this.logger.error('Failed to parse LLM output as JSON', e);
    
      return {
        reply: raw,
        tag: 'Not relevant',
        email: '',
        companyName: '',
        options: [],
      };
    }
    
  }
}
