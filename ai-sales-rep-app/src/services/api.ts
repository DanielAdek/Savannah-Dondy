import axios from 'axios';

export interface ChatResponse {
  reply: string;
  leadTag?: string;
  calendlyLink?: string;
  sessionId: string;
}

export interface Message {
  text: string;
  from: 'user' | 'bot';
}

export const sendMessage = async (message: string, sessionId?: string): Promise<ChatResponse> => {
  const response = await axios.post<ChatResponse>('/api/chat', { message, sessionId });
  return response.data;
};


export const fetchChatHistory = async (sessionId: string): Promise<Message[]> => {
  const res = await axios.get<{ history: Message[] }>(`/api/chat/history/${sessionId}`);
  return res.data.history;
};