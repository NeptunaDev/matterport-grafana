import { Paper, Typography, Box } from '@mui/material';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  color?: string;
}

const MetricCard = ({ label, value, unit, color = 'success.light' }: MetricCardProps) => {
  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: color,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      <Box>
        <Typography variant="h4" component="span">
          {value}
        </Typography>
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ ml: 0.5 }}
        >
          {unit}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MetricCard;