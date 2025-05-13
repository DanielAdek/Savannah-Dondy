import { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatIcon from '@mui/icons-material/Chat'; // new icon
import ChatWindow from './ChatWindow';
import ChatHistory from './ChatHistory';

type Conversation = {
  id: string;
  lastMessage: string;
  timestamp: string;
  userName: string;
};

const mockConversations: Conversation[] = [
  {
    id: '1',
    lastMessage: 'Can we schedule a call tomorrow?',
    timestamp: '2025-05-13 10:32 AM',
    userName: 'Daniel',
  },
  {
    id: '2',
    lastMessage: 'We’re looking to hire two backend devs.',
    timestamp: '2025-05-12 4:45 PM',
    userName: 'Jenna',
  },
];

const ChatBox = ({ onClose }: { onClose: () => void }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isNewChat, setIsNewChat] = useState<boolean>(false); // new state

  const handleBack = () => {
    setSelectedConversationId(null);
    setIsNewChat(false);
  };

  const handleNewChat = () => {
    setIsNewChat(true);
    setSelectedConversationId('new'); // placeholder ID for new chats
  };

  return (
    <Box
      position="fixed"
      bottom={90}
      right={20}
      width={360}
      height={550}
      bgcolor="white"
      borderRadius={2}
      boxShadow={5}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      zIndex={1001}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor="primary.main"
        color="white"
      >
        <Box display="flex" alignItems="center">
          {(selectedConversationId || isNewChat) && (
            <IconButton size="small" onClick={handleBack} sx={{ color: 'white', mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="body1">
            {(selectedConversationId || isNewChat) ? 'AI Assistant' : 'Chat History'}
          </Typography>
        </Box>
        {!(selectedConversationId || isNewChat) ? (
          <IconButton size="small" onClick={handleNewChat} sx={{ color: 'white' }}>
            <ChatIcon />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Content */}
      <Box flexGrow={1} overflow="auto">
        {(selectedConversationId || isNewChat) ? (
          <ChatWindow conversationId={selectedConversationId || 'new'} onClose={function (): void {
            throw new Error('Function not implemented.');
          } } />
        ) : (
          <ChatHistory
            conversations={mockConversations}
            onSelect={(id) => {
              setSelectedConversationId(id);
              setIsNewChat(false);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ChatBox;
