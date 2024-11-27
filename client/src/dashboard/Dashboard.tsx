import { Grid, Paper, Box, createTheme, ThemeProvider } from "@mui/material";
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

interface Iframe {
  url: string;
  id: string;
}

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
  const [iframes, setIframes] = useState<Iframe[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await fetch("/api/plant");
        console.log("🚀 ~ fetchPlant ~ response:", response)
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

  useEffect(() => {
    if (!currentPlant || !currentPlant?.id) return;
    const fetchGrafana = async () => {
      try {
        const response = await fetch(
          `/api/iframe-grafana?idPlant=${currentPlant?.id}`
        );
        const data = await response.json();

        setIframes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGrafana();
  }, [currentPlant?.id]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: "background.default", p: 3, minHeight: "100vh" }}>
        <Grid container spacing={2}>
          <Grid md={4}>
            {iframes.map((iframe) => (
              <iframe src={iframe.url} width="450" height="200"></iframe>
            ))}
          </Grid>
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
                    applicationKey="hnd36ckp618rdffr20yn02hed"
                  />
                )}
              </Box>
            </DarkPaper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
