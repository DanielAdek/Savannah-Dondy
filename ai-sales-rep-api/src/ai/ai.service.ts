import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatEntry } from '../lead/lead.schema';

export interface AiResult {
  reply: string;
  tag: 'Not relevant' | 'Weak lead' | 'Hot lead' | 'Very big potential';
  email?: string;
  companyName?: string;
}

@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor() {
    // const config = {
    //   apiKey: process.env.OPENAI_API_KEY,
    // };
    this.openai = new OpenAI();
  }

  /** 
   * Send the full chat history and the latest user message to the LLM.
   * Expect a JSON response with: { reply, tag, email?, companyName? } 
   */
  async analyzeLead(chat: ChatEntry[]): Promise<AiResult> {
    // System prompt
    const messages = [
      {
        role: 'system',
        content: `
              You are a sales AI assistant for a software development company. Always respond ONLY with a strict JSON object that includes:
              {"reply": "...", "tag": "...", "email": "...", "companyName": "..."}


              Rules: 
              1. Read the conversation and generate the next bot reply.
              2. Ask qualifying questions
              3. Evaluates lead quality.
              4. Decide the lead tag: Not relevant, Weak lead, Hot lead, or Very big potential.
              5. If you detect user's email or company name, extract them.
              
              Example response:
              {"reply": "Thanks! Could you share your project timeline?", "tag": "Hot lead", "email": "", "companyName": ""}
              `,
      },
      ...chat.map(entry => ({
        role: entry.from === 'user' ? 'user' : 'assistant',
        content: entry.text,
      })),
    ] as OpenAI.ChatCompletionMessageParam[];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });

    const content = response.choices[0].message.content.trim();
    this.logger.debug(`LLM raw output: ${content}`);

    try {
      const jsonMatch = content.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      const result = JSON.parse(jsonMatch[0]) as AiResult;
      return result;
    } catch (e) {
      this.logger.error('Failed to parse LLM output as JSON', e);
      return {
        reply: chat.slice(-1)[0].text,
        tag: 'Weak lead',
      };
    }
    
  }
}
