import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">IntelliBrain</Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate('/leads')}
          >
            Admin View
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert('Please click the chat icon at the bottom right!')}
          >
            Book a Call
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
