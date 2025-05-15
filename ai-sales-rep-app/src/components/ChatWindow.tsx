import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { fetchChatHistory, sendMessage, Message as ChatMessage } from '../services/api';
import { InputBox } from './InputBox';
import { MessageBubble } from './MessageBubble';

const ChatWindow = ({ conversationId }: { conversationId: string }) => {
  const isNew = conversationId === 'new';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>(
    () => isNew ? (localStorage.removeItem('sessionId'), undefined) : conversationId || localStorage.getItem('sessionId') || undefined
  );
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [options, setOptions] = useState<string[]>([]);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (isNew) {
        const res = await sendMessage('__start__', undefined);
        setSessionId(res.sessionId);
        localStorage.setItem('sessionId', res.sessionId);
        setMessages([{ from: 'bot', text: res.reply }]);
        setOptions(res.options || []);
      } else if (sessionId) {
        const hist = await fetchChatHistory(sessionId);
        setMessages(hist);
      }
      setLoadingHistory(false);
    })();
  }, [isNew]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, options]);

  const send = async (text: string) => {
    // Remove old options immediately on manual send
    setOptions([]);
  
    // Append user's message
    setMessages(prev => [...prev, { from: 'user', text }]);
    setLoading(true);
  
    // Send to backend and await response
    const res = await sendMessage(text, sessionId);
  
    // Append bot's response
    setMessages(prev => [...prev, { from: 'bot', text: res.reply }]);
  
    // Set new options (if any)
    setOptions(res.options || []);
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      overflow="hidden"
    >
      {/* Messages and Options */}
      <Box flexGrow={1} overflow="auto" p={1}>
        {loadingHistory ? (
          <Typography>Loading…</Typography>
        ) : (
          <>
            {messages.map((m, i) => (
              <MessageBubble key={i} from={m.from} text={m.text} />
            ))}

            {options.length > 0 && (
              <Box display="flex" flexWrap="wrap" gap={1} p={1}>
                {options.map(opt => (
                  <Button
                    key={opt}
                    variant="outlined"
                    size="small"
                    onClick={() => { send(opt); setOptions([]); }}
                  >
                    {opt}
                  </Button>
                ))}
              </Box>
            )}
            {loading && <CircularProgress size={20} />}
            <div ref={chatEnd} />
          </>
        )}
      </Box>

      {/* Input Box (Always at bottom) */}
      <Box px={1} py={1} borderTop="1px solid #eee">
        <InputBox onSend={send} />
      </Box>
    </Box>
  );
};

export default ChatWindow;
