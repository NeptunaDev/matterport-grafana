import { Box, Typography } from '@mui/material';

interface StatusIndicatorProps {
  status: 'ONLINE' | 'OFFLINE';
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const bgColor = status === 'ONLINE' ? 'success.main' : 'error.main';

  return (
    <Box
      sx={{
        bgcolor: bgColor,
        color: 'white',
        p: 1,
        textAlign: 'center',
        borderRadius: 1,
        transition: 'background-color 0.3s',
      }}
    >
      <Typography variant="body2" fontWeight="medium">
        {status}
      </Typography>
    </Box>
  );
};

export default StatusIndicator;