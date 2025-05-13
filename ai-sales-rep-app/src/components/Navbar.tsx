import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => (
  <AppBar position="static" color="primary">
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6">IntelliBrain</Typography>
      <Button
        variant="contained"
        color="secondary"
        href="https://calendly.com/yourcompany/call"
      >
        Book a Call
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
