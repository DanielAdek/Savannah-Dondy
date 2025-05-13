import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const talents = [
  { name: 'Fullstack Dev', skill: 'React / Node.js / MongoDB' },
  { name: 'AI Engineer', skill: 'Python / GPT APIs' },
  { name: 'DevOps Expert', skill: 'AWS / Docker / CI-CD' },
];

const TalentsSection = () => (
  <Box py={8} px={4} bgcolor="#f0f8ff">
    <Typography variant="h4" textAlign="center" gutterBottom>
      Meet Our Talents
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      {talents.map((t, i) => (
        <Grid key={i}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">{t.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t.skill}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default TalentsSection;
