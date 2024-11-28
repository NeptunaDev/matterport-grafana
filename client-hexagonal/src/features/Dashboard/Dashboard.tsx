import { Stack } from "@mui/material";
import { MatterportView } from "./components/MatterportView";
import { createAxiosIframeGrafanaRepository } from "../../lib/IframeGrafana/repository/AxiosIframeGrafanaRepository";
import { createIframeGrafanaService } from "../../lib/IframeGrafana/application/IframeGrafanaService";
import { useQuery } from "@tanstack/react-query";
import { usePlantStore } from "../../hooks/usePlantStore";
import { useFindDevices } from "../hooks/useFindDevice";
import { useRenderSensorMatterTag } from "../hooks/useRenderSensorMatterTag";

const repository = createAxiosIframeGrafanaRepository();
const service = createIframeGrafanaService(repository);
export function Dashboard() {
  const plantSelected = usePlantStore((state) => state.plantSelected);
  useFindDevices();
  useRenderSensorMatterTag();
  
  const { data: iframes } = useQuery({
    queryKey: ["iframe-grafanas", plantSelected?.id],
    queryFn: () =>
      service.find({
        ...(plantSelected && { idPlant: plantSelected.id }),
      }),
  });

  return (
    <Stack gap={2} height={"calc(100vh - 88px - 16px)"}>
      <Stack direction={"row"} gap={2} flex={2.5}>
        <Stack gap={2} flex={1}>
          {iframes &&
            iframes.slice(0, 3).map((iframe) => (
              <Stack key={iframe.id} height={"100%"}>
                <iframe
                  src={iframe.url}
                  width={"100%"}
                  height={"100%"}
                ></iframe>
              </Stack>
            ))}
        </Stack>
        <Stack flex={2.5}>
          <MatterportView />
        </Stack>
      </Stack>
      <Stack direction={"row"} justifyContent={"flex-end"} gap={2} flex={1}>
        {iframes &&
          iframes.slice(3).map((iframe) => (
            <Stack key={iframe.id}>
              <iframe src={iframe.url} width={"100%"} height={"100%"}></iframe>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
}
