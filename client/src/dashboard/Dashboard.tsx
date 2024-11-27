import { createTheme, ThemeProvider, Stack } from "@mui/material";
import MatterportViewer from "./components/render/Render3D";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plant } from "./interfaces";

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
        console.log("🚀 ~ fetchPlant ~ response:", response);
        const plants: Plant[] = await response.json();
        const plant = plants.find(
          (p) => p.name.toLowerCase() === plantName?.toLowerCase()
        );
        if (plant) {
          setCurrentPlant(plant);
        } else {
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
      <Stack gap={2} height={"100%"}>
        <Stack direction={{ md: "row", xs: "column-reverse" }} gap={2}>
          <Stack flex={1} gap={2}>
            {iframes.slice(0, 3).map((iframe) => (
              <Stack
                maxWidth={"450px"}
                minHeight={"250px"}
                width={"100%"}
                height={"100%"}
                mx={"auto"}
              >
                <iframe src={iframe.url} width="100%" height="100%"></iframe>
              </Stack>
            ))}
          </Stack>
          <Stack flex={3} minHeight={{ md: "50vh", xs: "auto" }}>
            {currentPlant && (
              <MatterportViewer
                key={viewerKey}
                modelId={currentPlant.matterportSid}
                applicationKey="hnd36ckp618rdffr20yn02hed"
              />
            )}
          </Stack>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={2}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
        >
          {iframes.slice(3).map((iframe) => (
            <Stack
              mx={{ xs: "auto", md: 0 }}
              maxWidth={"450px"}
              minHeight={"250px"}
              width={"100%"}
              height={"100%"}
            >
              <iframe src={iframe.url} width="100%" height="100%"></iframe>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default Dashboard;
