import React, { useEffect } from "react";
import { useState } from 'react';
import { Box, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from './ChatBox';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [startNewChat, setStartNewChat] = useState(false);

  const handleOpen = () => {
    setStartNewChat(true);
    setOpen(true);
  };

  return (
    <>
      <Box position="fixed" bottom={20} right={20} zIndex={1000}>
        <Fab color="secondary" onClick={handleOpen}>
          <ChatIcon />
        </Fab>
      </Box>
      {open && (
        <ChatBox
          onClose={() => setOpen(false)}
          startNewChat={startNewChat}
          onStarted={() => setStartNewChat(false)}
        />
      )}
    </>
  );
};

export default ChatWidget;
