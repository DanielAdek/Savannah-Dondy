import React from "react";
import { useState } from 'react';
import { Box, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from './ChatBox';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        position="fixed"
        bottom={20}
        right={20}
        zIndex={1000}
      >
        <Fab color="secondary" onClick={() => setOpen(!open)}>
          <ChatIcon />
        </Fab>
      </Box>
      {open && <ChatBox onClose={() => setOpen(false)} />}
    </>
  );
};

export default ChatWidget;
