import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

interface Props {
  onSend: (msg: string) => void;
}

export const InputBox = ({ onSend }: Props) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage('');
  };

  return (
    <Box display="flex" gap={1} mt={2}>
      <TextField
        fullWidth
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};
