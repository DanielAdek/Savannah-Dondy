import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Lead, LeadDocument } from './lead.schema';
import { ChatEntry } from './lead.schema';

@Injectable()
export class LeadService {
  constructor(
    @InjectModel(Lead.name) private leadModel: Model<LeadDocument>,
  ) {}

  async findBySessionId(sessionId: string) {
    return this.leadModel.findOne({ sessionId });
  }

  async createSession(sessionId: string) {
    return this.leadModel.create({ sessionId });
  }

  async upsertLead(
    sessionId: string,
    entry: ChatEntry,
    tag: Lead['tag'],
    email?: string,
    companyName?: string,
  ) {
    const update: any = {
      $push: { chatHistory: entry },
      tag,
    };
    if (email) update.email = email;
    if (companyName) update.companyName = companyName;

    return this.leadModel.findOneAndUpdate(
      { sessionId },
      update,
      { upsert: true, new: true },
    );
  }
}
