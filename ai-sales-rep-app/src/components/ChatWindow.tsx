import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { fetchChatHistory, sendMessage, Message as ChatMessage } from '../services/api';
import { InputBox } from './InputBox';
import { MessageBubble } from './MessageBubble';

export const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>(() => {
    return localStorage.getItem('sessionId') || undefined;
  });
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load chat history on initial render
  useEffect(() => {
    const loadHistory = async () => {
      if (!sessionId) {
        setLoadingHistory(false);
        return;
      }
      try {
        const history = await fetchChatHistory(sessionId);
        setMessages(history);
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
      setLoadingHistory(false);
    };
    loadHistory();
  }, [sessionId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string) => {
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setLoading(true);
    try {
      const res = await sendMessage(text, sessionId);
      if (!sessionId) {
        setSessionId(res.sessionId);
        localStorage.setItem('sessionId', res.sessionId);
      }
      setMessages((prev) => [...prev, { from: 'user', text }, { from: 'bot', text: res.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Something went wrong. Please try again.' },
      ]);
    }
    setLoading(false);
  };

  return (
    <Box
      width="100%"
      maxWidth="600px"
      mx="auto"
      my={5}
      p={3}
      bgcolor="#fafafa"
      borderRadius={4}
      boxShadow={3}
      display="flex"
      flexDirection="column"
      minHeight="80vh"
    >
      <Typography variant="h5" mb={2}>
        AI Sales Assistant
      </Typography>

      <Box flexGrow={1} overflow="auto">
        {loadingHistory ? (
          <Typography>Loading chat history...</Typography>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble key={idx} text={msg.text} from={msg.from} />
          ))
        )}
        {loading && (
          <Box display="flex" justifyContent="flex-start" mt={1} ml={1}>
            <CircularProgress size={20} />
          </Box>
        )}
        <div ref={chatEndRef} />
      </Box>

      <InputBox onSend={send} />
    </Box>
  );
};
