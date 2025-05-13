import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return <AppBar position="static" color="primary">
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6">IntelliBrain</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => alert('Please click the chat icon at the bottom right!')}
      >
        Book a Call
      </Button>
    </Toolbar>
  </AppBar>
};

export default Navbar;
