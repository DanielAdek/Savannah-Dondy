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
    const messages = [
      {
        role: 'system',
        content: `
              You are a sales AI representative. 
              1. Read the conversation and generate the next bot reply.
              2. Decide the lead tag: Not relevant, Weak lead, Hot lead, or Very big potential.
              3. If you detect user's email or company name, extract them.
              Return EXACTLY a JSON object:
              {"reply": "...", "tag": "...", "email":"...", "companyName":"..."}`
      },
      ...chat.map(entry => ({
        role: entry.from === 'user' ? 'user' : 'assistant',
        content: entry.text,
      })),
    ] as OpenAI.ChatCompletionMessageParam[];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.2,
    });

    const content = response.choices[0].message.content.trim();
    this.logger.debug(`LLM raw output: ${content}`);

    try {
      const result = JSON.parse(content) as AiResult;
      return result;
    } catch (e) {
      this.logger.error('Failed to parse LLM output as JSON', e);
      // Fallback: simple default
      return {
        reply: chat.slice(-1)[0].text,
        tag: 'Weak lead',
      };
    }
  }
}
