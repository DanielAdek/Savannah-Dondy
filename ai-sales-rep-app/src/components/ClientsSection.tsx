import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import google from "../assets/google.png";
import stripe from "../assets/stripe.webp";
import amazon from "../assets/amazon.png";
import tesla from "../assets/tesla.png";

const ClientsSection = () => (
  <Box py={8} px={4} textAlign="center">
    <Typography variant="h4" gutterBottom>
      Trusted by Clients Worldwide
    </Typography>
    <Grid container spacing={4} justifyContent="center" mt={2}>
      {[google, stripe, tesla, amazon].map((client, idx) => (
        <Grid key={idx}>
          <img src={client} width={250} height={100}/>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ClientsSection;
