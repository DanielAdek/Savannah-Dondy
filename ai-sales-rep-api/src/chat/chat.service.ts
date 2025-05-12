import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AiService, AiResult } from '../ai/ai.service';
import { LeadService } from '../lead/lead.service';
import { ChatEntry } from '../lead/lead.schema';

const CALENDLY_URL = 'https://calendly.com/kanhasoft/demo';

@Injectable()
export class ChatService {
  constructor(
    private readonly aiService: AiService,
    private readonly leadService: LeadService,
  ) {}

  /**
   * Main orchestration: process incoming user message, update lead,
   * call AI for reply+tag, persist, and return response.
   */
  async processMessage(
    sessionId: string | undefined,
    userText: string,
  ): Promise<{
    sessionId: string;
    reply: string;
    tag: AiResult['tag'];
    calendlyLink?: string;
  }> {
    // 1. Initialize session
    if (!sessionId) {
      sessionId = uuid();
      await this.leadService.createSession(sessionId);
    }

    // 2. Append user message
    const userEntry: ChatEntry = { from: 'user', text: userText, timestamp: new Date() };
    await this.leadService.upsertLead(sessionId, userEntry, 'Weak lead');

    // 3. Load full history
    const leadRecord = await this.leadService.findBySessionId(sessionId);
    const history = leadRecord.chatHistory;

    // 4. Call AI
    const aiResult: AiResult = await this.aiService.analyzeLead(history);

    // 5. Append bot reply, update tag/email/company
    const botEntry: ChatEntry = { from: 'bot', text: aiResult.reply, timestamp: new Date() };
    const updated = await this.leadService.upsertLead(
      sessionId,
      botEntry,
      aiResult.tag,
      aiResult.email,
      aiResult.companyName,
    );

    // 6. Append Calendly link if hot
    let replyWithLink = aiResult.reply;
    if (['Hot lead', 'Very big potential'].includes(aiResult.tag)) {
      replyWithLink += `\n\nYou can book a demo here: ${CALENDLY_URL}`;
    }

    return {
      sessionId,
      reply: replyWithLink,
      tag: aiResult.tag,
      calendlyLink: aiResult.tag !== 'Not relevant' && aiResult.tag !== 'Weak lead'
        ? CALENDLY_URL
        : undefined,
    };
  }

  /** Fetch historic chat entries for a session */
  async getHistory(sessionId: string) {
    const lead = await this.leadService.findBySessionId(sessionId);
    return lead?.chatHistory || [];
  }
}
