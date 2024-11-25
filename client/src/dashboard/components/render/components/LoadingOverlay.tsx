import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const LoadingOverlay: React.FC = () => (
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1
  }}>
    <CircularProgress />
  </Box>
);