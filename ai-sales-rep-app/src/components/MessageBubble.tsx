import React from "react";
import { Box, Typography } from '@mui/material';

interface MessageProps {
  text: string;
  from: 'user' | 'bot';
}

export const MessageBubble = ({ text, from }: MessageProps) => {
  const isUser = from === 'user';
  return (
    <Box
      display="flex"
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      my={1}
    >
      <Box
        px={2}
        py={1}
        maxWidth="75%"
        bgcolor={isUser ? 'primary.main' : '#e3f2fd'}
        color={isUser ? 'white' : 'black'}
        borderRadius={4}
        sx={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  );
};
