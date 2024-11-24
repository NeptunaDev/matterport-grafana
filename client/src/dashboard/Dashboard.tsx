import { Grid, Paper, Box, Typography } from "@mui/material";
import MatterportViewer from "./components/render/Render3D";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plant } from "./interfaces";

const Dashboard = () => {
  const { plantName } = useParams<{ plantName: string }>();
  const [currentPlant, setCurrentPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await fetch("http://localhost:8000/plant");
        const plants: Plant[] = await response.json();
        const plant = plants.find(
          (p) => p.name.toLowerCase() === plantName?.toLowerCase()
        );
        if (plant) {
          setCurrentPlant(plant);
        }
      } catch (error) {
        console.error("Error fetching plant:", error);
      }
    };

    if (plantName) {
      fetchPlant();
    }
  }, [plantName]);

  return (
    <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={12} md={6}>
        {/* Extruder Motor Frequency Chart */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Extruder Motor Frequency
          </Typography>
          <Box sx={{ height: 200 }}>{/* Chart component will go here */}</Box>
        </Paper>

        {/* Motor Velocity Chart */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            PE16/PE30/PE28 Motor Velocity
          </Typography>
          <Box sx={{ height: 200 }}>{/* Chart component will go here */}</Box>
        </Paper>

        {/* Temperature Gauges */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {["29_Extruder", "16_Extruder", "30_Extruder"].map((name) => (
            <Grid item xs={4} key={name}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="subtitle1" gutterBottom>
                  {name} Temperature
                </Typography>
                <Box sx={{ height: 120 }}>
                  {/* Gauge component will go here */}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={6}>
        {/* Matterport Viewer */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ height: 400, mb: 10 }}>
            {currentPlant && (
              <MatterportViewer
                modelId={currentPlant.matterportSid}
                applicationKey="9dgydths42wyhyangsu855bca"
              />
            )}
          </Box>
        </Paper>

        {/* Status Indicators */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            PE 30 Extruder Status
          </Typography>
          <Grid container spacing={1}>
            {Array(5)
              .fill("ONLINE")
              .map((status, index) => (
                <Grid item xs={2.4} key={index}>
                  <Box
                    sx={{
                      bgcolor: "success.main",
                      color: "white",
                      p: 1,
                      textAlign: "center",
                      borderRadius: 1,
                    }}
                  >
                    {status}
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Paper>

        {/* Velocity Metrics */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {[
            { label: "16_Extruder Velocity", value: "7.71", unit: "ft/ms" },
            { label: "29_Extruder Velocity", value: "12.1", unit: "ft/ms" },
            { label: "30_Extruder Velocity", value: "11.5", unit: "ft/ms" },
          ].map((metric) => (
            <Grid item xs={4} key={metric.label}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "success.light",
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
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
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Current Metrics */}
        <Grid container spacing={2}>
          {[
            { label: "30_Capstan Current", value: "11.2", unit: "Amps" },
            { label: "30_Takeup Current", value: "19.9", unit: "Amps" },
          ].map((metric) => (
            <Grid item xs={6} key={metric.label}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
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
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
