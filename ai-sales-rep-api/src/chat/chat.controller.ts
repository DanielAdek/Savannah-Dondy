import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  public async chat(@Body() body: { sessionId?: string; message: string, userId: string }) {
    const { sessionId, message, userId } = body;
    return this.chatService.processMessage(sessionId, message, userId);
  }

  @Get('history/:sessionId')
  public async history(@Param('sessionId') sessionId: string) {
    return { history: await this.chatService.getHistory(sessionId) };
  }

  @Get('histories/:userId')
  public async histories(@Param('userId') userId: string) {
    return { histories: await this.chatService.getHistories(userId) };
  }
}
