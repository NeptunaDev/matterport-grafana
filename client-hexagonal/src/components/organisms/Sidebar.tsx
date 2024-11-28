import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { ChevronLeft, Factory } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { createAxiosPlantRepository } from "../../lib/Plant/infrastructure/AxiosPlantRepository";
import { createPlantService } from "../../lib/Plant/application/PlantService";
import { useEffect } from "react";
import { usePlantStore } from "../../hooks/usePlantStore";
import { useSdkStore } from "../../hooks/useSdkStore";
import { Plant } from "../../lib/Plant/domain/Plant";
import { useDeviceStore } from "../../hooks/useDeviceStore";
import { useSensorStore } from "../../hooks/useSensorStore";

const drawerWidth = 240;
const repository = createAxiosPlantRepository();
const service = createPlantService(repository);
interface SidebarProps {
  handleDrawerClose: () => void;
  open: boolean;
}

export function Sidebar({ handleDrawerClose, open }: SidebarProps) {
  const { data: plants } = useQuery({
    queryKey: ["plants"],
    queryFn: service.find,
  });
  const setPlantSelected = usePlantStore((state) => state.setPlantSelected);
  const setPlants = usePlantStore((state) => state.setPlants);
  const plantSelected = usePlantStore((state) => state.plantSelected);
  const setInitialStore = useSdkStore((state) => state.setInitialStore);
  const setInitialStoreDevices = useDeviceStore(
    (state) => state.setInitialStore
  );
  const setInitialStoreSensors = useSensorStore(
    (state) => state.setInitialStore
  );

  const handleChangePlant = (plant: Plant) => {
    setInitialStore();
    setInitialStoreDevices();
    setInitialStoreSensors();
    setPlantSelected(plant);
  };

  useEffect(() => {
    if (!plants || plants.length <= 0) return;
    setPlants(plants);
    setPlantSelected(plants[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plants]);

  return (
    <Stack sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Stack alignItems={"flex-end"} padding={1} justifyContent={"center"}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              "&.MuiTouchRipple-root": {
                display: "none",
                position: "relative",
              },
            }}
          >
            <ChevronLeft sx={{ color: "primary.main" }} />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          {plants &&
            plants.map((plant) => (
              <ListItem key={plant.id} disablePadding>
                <ListItemButton
                  selected={plantSelected?.id === plant.id}
                  onClick={() => handleChangePlant(plant)}
                >
                  <ListItemIcon>
                    <Factory />
                  </ListItemIcon>
                  <ListItemText primary={plant.name} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </Stack>
  );
}
