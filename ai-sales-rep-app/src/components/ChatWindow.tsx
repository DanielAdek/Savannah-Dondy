import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { fetchChatHistory, sendMessage, Message as ChatMessage } from '../services/api';
import { InputBox } from './InputBox';
import { MessageBubble } from './MessageBubble';

const ChatWindow = ({ conversationId }: { conversationId: string }) => {
  const isNew = conversationId === 'new';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string|undefined>(
    () => isNew ? (localStorage.removeItem('sessionId'), undefined) : conversationId || localStorage.getItem('sessionId')|| undefined
  );
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [options, setOptions] = useState<string[]>([]);
  const chatEnd = useRef<HTMLDivElement>(null);

  // on mount: init or load
  useEffect(() => {
    (async () => {
      if (isNew) {
        // trigger backend to give first prompt (talents list)
        const res = await sendMessage('__start__', undefined);
        setSessionId(res.sessionId);
        localStorage.setItem('sessionId', res.sessionId);
        setMessages([{ from:'bot', text: res.reply }]);
        setOptions(res.options||[]);
      } else if (sessionId) {
        const hist = await fetchChatHistory(sessionId);
        setMessages(hist);
      }
      setLoadingHistory(false);
    })();
  }, [isNew]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages, options]);

  // unified send
  const send = async (text: string) => {
    setMessages(prev=>[...prev,{from:'user',text}]);
    setLoading(true);
    const res = await sendMessage(text, sessionId);
    setMessages(prev=>[...prev,{from:'bot',text:res.reply}]);
    setOptions(res.options||[]);
    setLoading(false);
  };

  return (
    <Box /* container styling */>
      {/* header omitted for brevity */}
      <Box flexGrow={1} overflow="auto" p={1}>
        {loadingHistory
          ? <Typography>Loading…</Typography>
          : messages.map((m,i)=>
              <MessageBubble key={i} from={m.from} text={m.text}/>
            )
        }
        {options.length>0 && (
          <Box display="flex" flexWrap="wrap" gap={1} p={1}>
            {options.map(opt=>(
              <Button
                key={opt}
                variant="outlined" size="small"
                onClick={()=>{ send(opt); setOptions([]); }}
              >
                {opt}
              </Button>
            ))}
          </Box>
        )}
        {loading && <CircularProgress size={20}/>}
        <div ref={chatEnd}/>
      </Box>

      {/* only show free-text input when no options */}
      {options.length===0 && <InputBox onSend={send}/>}
    </Box>
  );
};

export default ChatWindow;
