import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

type Conversation = {
  id: string;
  lastMessage: string;
  timestamp: string;
  userName: string;
};

type Props = {
  conversations: Conversation[];
  onSelect: (id: string) => void;
};

const ChatHistory = ({ conversations, onSelect }: Props) => (
  <Box p={2}>
    <List>
      {conversations.map((conv) => (
        <ListItem key={conv.id} onClick={() => onSelect(conv.id)}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={conv.userName}
            secondary={
              <>
                <Typography variant="body2" noWrap>
                  {conv.lastMessage}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {conv.timestamp}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default ChatHistory;
