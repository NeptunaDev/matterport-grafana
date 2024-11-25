import {
  Grid,
  Paper,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import MatterportViewer from "./components/render/Render3D";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plant } from "./interfaces";
import { styled } from "@mui/material/styles";

const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.common.white,
}));

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  unit: string;
}

const GaugeChart = ({ value, max, label, unit }: GaugeChartProps) => {
  const theme = useTheme();
  const percentage = (value / max) * 100;

  return (
    <Box sx={{ position: "relative", width: "100%", height: 200 }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <path
          d="M 10 90 A 40 40 0 1 1 90 90"
          fill="none"
          stroke={theme.palette.grey[800]}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d={`M 10 90 A 40 40 0 ${percentage > 50 ? 1 : 0} 1 ${
            10 + 80 * (percentage / 100)
          } ${90 - Math.sin((percentage / 100) * Math.PI) * 80}`}
          fill="none"
          stroke={theme.palette.info.main}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <text
          x="50"
          y="65"
          textAnchor="middle"
          fill={theme.palette.info.main}
          style={{ fontSize: "16px", fontWeight: "bold" }}
        >
          {value}
        </text>
        <text
          x="50"
          y="80"
          textAnchor="middle"
          fill={theme.palette.grey[400]}
          style={{ fontSize: "12px" }}
        >
          {unit}
        </text>
      </svg>
      <Typography
        variant="body2"
        sx={{ textAlign: "center", mt: 1, color: "grey.300" }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2dd4bf",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
  },
});

const Dashboard = () => {
  const { plantName } = useParams<{ plantName: string }>();
  const [currentPlant, setCurrentPlant] = useState<Plant | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await fetch("/api/plant");
        const plants: Plant[] = await response.json();
        const plant = plants.find(
          (p) => p.name.toLowerCase() === plantName?.toLowerCase()
        );
        if (plant) {
          setCurrentPlant(plant);
        } else {
          // If plant is not found, navigate to the first available plant
          if (plants.length > 0) {
            navigate(`/plant/${plants[0].name}`);
          }
        }
      } catch (error) {
        console.error("Error fetching plant:", error);
      }
    };

    fetchPlant();
  }, [plantName, navigate]); // Add navigate to dependencies

  // Key prop added to force remount of MatterportViewer
  const viewerKey = currentPlant?.matterportSid || "default";

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: "background.default", p: 3, minHeight: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <DarkPaper>
              <Typography variant="h6" gutterBottom>
                Temperatura
              </Typography>
              <Grid container spacing={2}>
                {["29_Extruder", "16_Extruder"].map((name) => (
                  <Grid item xs={6} key={name}>
                    <GaugeChart
                      value={76.3}
                      max={100}
                      label={`${name} Temperature`}
                      unit="%"
                    />
                  </Grid>
                ))}
              </Grid>
            </DarkPaper>

            {/* Caudal Section */}
            <DarkPaper>
              <Typography variant="h6" gutterBottom>
                Caudal
              </Typography>
              <Grid container spacing={2}>
                {["29_Extruder", "16_Extruder"].map((name) => (
                  <Grid item xs={6} key={name}>
                    <GaugeChart
                      value={76.3}
                      max={100}
                      label={`${name} Temperature`}
                      unit="%"
                    />
                  </Grid>
                ))}
              </Grid>
            </DarkPaper>
          </Grid>
          {/* Right Column - Increased width */}
          <Grid item xs={12} md={8}>
            <DarkPaper>
              <Box
                sx={{
                  height: 600,
                  width: "100%",
                  "& iframe": {
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                {currentPlant && (
                  <MatterportViewer
                    key={viewerKey}
                    modelId={currentPlant.matterportSid}
                    applicationKey="9dgydths42wyhyangsu855bca"
                  />
                )}
              </Box>
            </DarkPaper>
            {/* Current Metrics */}
            <Grid container spacing={2}>
              {[
                { label: "30_Capstan Current", value: "11.2", unit: "Amps" },
                { label: "30_Takeup Current", value: "19.9", unit: "Amps" },
              ].map((metric) => (
                <Grid item xs={6} key={metric.label}>
                  <MetricCard>
                    <Typography variant="subtitle2" sx={{ color: "grey.400" }}>
                      {metric.label}
                    </Typography>
                    <Typography variant="h4">
                      {metric.value}
                      <Typography
                        component="span"
                        variant="subtitle1"
                        sx={{ ml: 0.5 }}
                      >
                        {metric.unit}
                      </Typography>
                    </Typography>
                  </MetricCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
