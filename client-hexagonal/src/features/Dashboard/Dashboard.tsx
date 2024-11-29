import { Stack } from "@mui/material";
import { MatterportView } from "./components/MatterportView";
import { createAxiosIframeGrafanaRepository } from "../../lib/IframeGrafana/repository/AxiosIframeGrafanaRepository";
import { createIframeGrafanaService } from "../../lib/IframeGrafana/application/IframeGrafanaService";
import { useQuery } from "@tanstack/react-query";
import { usePlantStore } from "../../hooks/usePlantStore";
import { useFindDevices } from "../hooks/useFindDevice";
import { useRenderSensorMatterTag } from "../hooks/useRenderSensorMatterTag";
import { useUpdateSensorMatterTag } from "../hooks/useUpdateSensorMatterTag";
import { DynamicChart } from "./components/DynamicChart";

const repository = createAxiosIframeGrafanaRepository();
const service = createIframeGrafanaService(repository);
export function Dashboard() {
  const plantSelectedId = usePlantStore((state) => state.plantSelected?.id);

  useFindDevices();
  useRenderSensorMatterTag();
  useUpdateSensorMatterTag();

  const { data: iframes } = useQuery({
    queryKey: ["iframe-grafanas", plantSelectedId],
    queryFn: () =>
      service.find({
        ...(plantSelectedId && { idPlant: plantSelectedId }),
      }),
    enabled: !!plantSelectedId,
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
        <DynamicChart />
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
