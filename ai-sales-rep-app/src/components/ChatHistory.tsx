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
import { History } from '../services/api';


type Props = {
  conversations?: History[] | [];
  onSelect: (id?: string) => void;
};

const ChatHistory = ({ conversations, onSelect }: Props) => (
  <Box>
    <List>
      {conversations && conversations.map((conv) => (
        <ListItem key={conv?.sessionId} onClick={() => onSelect(conv?.sessionId)}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={conv?.chatHistory?.[conv.chatHistory.length - 1]?.from}
            secondary={
              <>
                <Typography variant="body2" noWrap>
                  {conv?.chatHistory?.[conv.chatHistory.length - 1]?.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(conv?.chatHistory?.[conv.chatHistory.length - 1]?.timestamp!).toDateString()}
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
