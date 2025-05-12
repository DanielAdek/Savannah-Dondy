import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

export type LeadTag = 
  | 'Not relevant'
  | 'Weak lead'
  | 'Hot lead'
  | 'Very big potential';

@Schema()
export class ChatEntry {
  @Prop({ required: true, enum: ['user', 'bot'] })
  from: 'user' | 'bot';

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

const ChatEntrySchema = SchemaFactory.createForClass(ChatEntry);

@Schema()
export class Lead {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop()
  email?: string;

  @Prop()
  companyName?: string;

  @Prop({ default: 'Weak lead', enum: ['Not relevant','Weak lead','Hot lead','Very big potential'] })
  tag: LeadTag;

  @Prop({ type: [ChatEntrySchema], default: [] })
  chatHistory: ChatEntry[];
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
