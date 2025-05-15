import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatIcon from '@mui/icons-material/Chat'; // new icon
import ChatWindow from './ChatWindow';
import ChatHistory from './ChatHistory';
import { fetchChatHistories, History } from '../services/api';


const ChatBox = ({
  onClose,
  startNewChat,
  onStarted,
}: {
  onClose: () => void;
  startNewChat?: boolean;
  onStarted?: () => void;
}) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isNewChat, setIsNewChat] = useState<boolean>(false);
  const [histories, setHistories] = useState<History[] | []>();
  const [loading, setLoading] = useState(true);

  // Trigger new chat if `startNewChat` is passed
  useEffect(() => {
    if (startNewChat) {
      setIsNewChat(true);
      setSelectedConversationId('new');
      onStarted?.(); // reset flag in parent
    }
  }, [startNewChat]);

  useEffect(() => {
    (async () => {
      await handleFetchHistories();
      setLoading(false);
    })();
  }, []);

  const handleBack = () => {
    handleFetchHistories();
    setSelectedConversationId(null);
    setIsNewChat(false);
  };

  const handleFetchHistories = async () => {
    const hists = await fetchChatHistories();
    setHistories(hists);
  };

  const handleNewChat = () => {
    setIsNewChat(true);
    setSelectedConversationId('new');
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
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="primary.main" color="white">
        <Box display="flex" alignItems="center">
          {(selectedConversationId || isNewChat) && (
            <IconButton size="small" onClick={handleBack} sx={{ color: 'white', mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="body1">
            {(selectedConversationId || isNewChat) ? 'Danibot' : 'Chat History'}
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

      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center" p={2}>
          <CircularProgress size={30} />
          <Typography sx={{ fontSize: 12, ml: 1 }}>Chat Loading...</Typography>
        </Box>
      )}

      {!histories?.length && !selectedConversationId && !isNewChat && (
        <Box p={2}>Click the chat icon at the top right!</Box>
      )}

      {/* Chat Content */}
      <Box flexGrow={1} overflow="auto">
        {(selectedConversationId || isNewChat) ? (
          <ChatWindow conversationId={selectedConversationId || 'new'} />
        ) : (
          <ChatHistory
            conversations={histories}
            onSelect={(id) => {
              setSelectedConversationId(id!);
              setIsNewChat(false);
            }}
          />
        )}
      </Box>
    </Box>
  );
};


export default ChatBox;
