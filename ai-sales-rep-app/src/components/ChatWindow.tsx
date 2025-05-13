import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { fetchChatHistory, sendMessage, Message as ChatMessage } from '../services/api';
import { InputBox } from './InputBox';
import { MessageBubble } from './MessageBubble';

const ChatWindow = ({ onClose, conversationId }: { onClose: () => void, conversationId: string }) => {
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

  const isNew = conversationId === 'new';

  return <Box
    position="fixed"
    bottom={90}
    right={20}
    width={360}
    height={500}
    bgcolor="white"
    borderRadius={2}
    boxShadow={5}
    display="flex"
    flexDirection="column"
    overflow="hidden"
    zIndex={1001}
  >
    <Box p={2}>
    <Typography variant="body2" color="text.secondary" gutterBottom>
        {isNew ? 'Starting a new conversation...' : `Chat with user #${conversationId}`}
      </Typography>
    </Box>
    <Box p={1} flexGrow={1} overflow="auto">
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
}

export default ChatWindow;
