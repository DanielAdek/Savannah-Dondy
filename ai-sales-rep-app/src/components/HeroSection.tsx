import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => (
  <Box
    sx={{
      minHeight: '80vh',
      backgroundColor: '#F7F9FB',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: 3,
    }}
  >
    <Typography variant="h3" color="primary" gutterBottom>
      Empowering Startups with World-Class Software Teams
    </Typography>
    <Typography variant="h6" color="text.secondary" mb={4}>
      Hire vetted developers, engineers, and architects on demand.
    </Typography>
    <Button variant="contained" color="secondary" size="large">
      Get Started
    </Button>
  </Box>
);

export default HeroSection;
