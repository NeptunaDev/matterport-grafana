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
import { useState, useEffect } from 'react';
import { IframeGrafana } from "../../lib/IframeGrafana/domain/IframeGrafana";

const repository = createAxiosIframeGrafanaRepository();
const service = createIframeGrafanaService(repository);

const REFRESH_INTERVAL = 20000;

export function Dashboard() {
  const plantSelectedId = usePlantStore((state) => state.plantSelected?.id);
  const [refreshKey, setRefreshKey] = useState(0);

  useFindDevices();
  useRenderSensorMatterTag();
  useUpdateSensorMatterTag();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const { data: iframes } = useQuery({
    queryKey: ["iframe-grafanas", plantSelectedId],
    queryFn: () =>
      service.find({
        ...(plantSelectedId && { idPlant: plantSelectedId }),
      }),
    enabled: !!plantSelectedId,
    refetchInterval: REFRESH_INTERVAL,
    refetchIntervalInBackground: true,
  });

  const getUniqueUrl = (url: string) => {
    const timestamp = refreshKey; 
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}ts=${timestamp}`;
  };

  const renderIframe = (iframe: IframeGrafana) => (
    <iframe
      key={`${iframe.id}-${refreshKey}`}
      src={getUniqueUrl(iframe.url)}
      width="100%"
      height="100%"
      style={{ border: 'none' }}
    />
  );

  return (
    <Stack gap={2} height={"calc(100vh - 88px - 16px)"}>
      <Stack direction={"row"} gap={2} flex={2.5}>
        <Stack gap={2} flex={1}>
          {iframes &&
            iframes.slice(0, 3).map((iframe) => (
              <Stack key={`container-${iframe.id}-${refreshKey}`} height={"100%"}>
                {renderIframe(iframe)}
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
            <Stack key={`container-${iframe.id}-${refreshKey}`}>
              {renderIframe(iframe)}
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
}