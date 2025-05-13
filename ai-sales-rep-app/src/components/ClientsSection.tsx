import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ClientsSection = () => (
  <Box py={8} px={4} textAlign="center">
    <Typography variant="h4" gutterBottom>
      Trusted by Clients Worldwide
    </Typography>
    <Grid container spacing={4} justifyContent="center" mt={2}>
      {/* Replace with actual logos */}
      {['Google', 'Amazon', 'Stripe', 'Tesla'].map((client, idx) => (
        <Grid key={idx}>
          <Typography variant="h6">{client}</Typography>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ClientsSection;
