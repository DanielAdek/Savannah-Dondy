import React from "react";
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box bgcolor="primary.main" color="white" py={4} textAlign="center">
    <Typography variant="body2">
      © {new Date().getFullYear()} DevCompany. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
