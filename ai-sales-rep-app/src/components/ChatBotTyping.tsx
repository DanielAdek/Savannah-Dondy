import { Box, Typography } from "@mui/material";

// Bot typing animation
export const BotTypingIndicator = () => (
  <Box display="flex" flexDirection="column" alignItems="flex-start" px={1} mt={1}>
    <Box
      display="flex"
      gap={0.5}
      sx={{ animation: 'pulse 1.5s infinite ease-in-out' }}
    >
      {[0, 1, 2].map(i => (
        <Box
          key={i}
          width={8}
          height={8}
          borderRadius="50%"
          bgcolor="#ccc"
          sx={{
            animation: `typingBounce 1s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </Box>
    <Typography variant="caption" color="textSecondary" mt={0.5}>
      Bot is typing…
    </Typography>
    <style>
      {`
        @keyframes typingBounce {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.4;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}
    </style>
  </Box>
);