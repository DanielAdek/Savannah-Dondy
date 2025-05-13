import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import LandingPage from './pages/LandingPage';
// import theme from './theme';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <LandingPage />
      </Container>
    </ThemeProvider>
  );
}

export default App;
