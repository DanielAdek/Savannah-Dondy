import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { LeadModule } from '../lead/lead.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [LeadModule, AiModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
