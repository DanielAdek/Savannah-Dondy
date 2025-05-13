import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AiModule } from './ai/ai.module';
import { ChatModule } from './chat/chat.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AiModule,
    ChatModule,
    LeadModule,
  ],
})
export class AppModule {}
