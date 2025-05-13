import axios from 'axios';

const backend = "http://localhost:8080";

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
  const response = await axios.post<ChatResponse>(backend + '/chat', { message, sessionId });
  return response.data;
};


export const fetchChatHistory = async (sessionId: string): Promise<Message[]> => {
  const res = await axios.get<{ history: Message[] }>(`${backend}/chat/history/${sessionId}`);
  return res.data.history;
};