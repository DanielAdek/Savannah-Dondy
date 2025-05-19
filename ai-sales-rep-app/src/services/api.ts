import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_URL || "https://intellibran-api.onrender.com";

export interface ChatResponse {
  reply: string;
  leadTag?: string;
  calendlyLink?: string;
  sessionId: string;
  options?: string[];
}

export interface Message {
  text: string;
  from: 'user' | 'bot';
  id?: string;
  timestamp?: Date;
}

export type History = {
  id: string;
  sessionId: string;
  tag: string;
  email: string;
  companyName: string;
  chatHistory: Message[];
}

export const sendMessage = async (message: string, sessionId?: string, userId?: string): Promise<ChatResponse> => {
  const response = await axios.post<ChatResponse>(backend + '/chat', { message, sessionId, userId });
  return response.data;
};


export const fetchChatHistory = async (sessionId: string): Promise<Message[]> => {
  const res = await axios.get<{ history: Message[] }>(`${backend}/chat/history/${sessionId}`);
  return res.data.history;
};

export const fetchChatHistories = async (userId: string): Promise<History[]> => {
  const res = await axios.get<{ histories: History[] }>(`${backend}/chat/histories/${userId}`);
  return res.data.histories;
}