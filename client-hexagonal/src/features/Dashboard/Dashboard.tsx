import { Stack, Typography } from "@mui/material";
import { MatterportView } from "./components/MatterportView";
import { createAxiosIframeGrafanaRepository } from "../../lib/IframeGrafana/repository/AxiosIframeGrafanaRepository";
import { createIframeGrafanaService } from "../../lib/IframeGrafana/application/IframeGrafanaService";
import { useQuery } from "@tanstack/react-query";
import { usePlantStore } from "../../hooks/usePlantStore";
import { useFindDevices } from "../hooks/useFindDevice";
import { useRenderSensorMatterTag } from "../hooks/useRenderSensorMatterTag";
import {
  useLastUpdateStore,
  useUpdateSensorMatterTag,
} from "../hooks/useUpdateSensorMatterTag";
import { DynamicChart } from "./components/DynamicChart";
import { useState, useEffect, useCallback } from "react";
import { IframeGrafana } from "../../lib/IframeGrafana/domain/IframeGrafana";
import { useRefreshStore } from "../../hooks/useRefreshStore";

const repository = createAxiosIframeGrafanaRepository();
const service = createIframeGrafanaService(repository);

const REFRESH_INTERVAL = 120000;

const LastUpdateDisplay = () => {
  const lastUpdate = useLastUpdateStore((state) => state.lastUpdate);
  if (!lastUpdate) return null;

  return (
    <Typography
      variant="caption"
      sx={{
        padding: "4px 8px",
        borderRadius: 1,
        zIndex: 1000,
        mb: "5px",
      }}
    >
      Última actualización: {lastUpdate}
    </Typography>
  );
};

export function Dashboard() {
  const plantSelectedId = usePlantStore((state) => state.plantSelected?.id);
  const refreshTimestamp = useRefreshStore((state) => state.refreshTimestamp);
  const [refreshKeys, setRefreshKeys] = useState<Record<string, number>>({});
  const [forceUpdate, setForceUpdate] = useState(0);

  useFindDevices();
  useRenderSensorMatterTag();
  useUpdateSensorMatterTag();

  const updateRefreshKeys = useCallback(() => {
    setRefreshKeys((prev) => {
      const newKeys = { ...prev };
      Object.keys(newKeys).forEach((key) => {
        newKeys[key] = (newKeys[key] || 0) + 1;
      });
      return newKeys;
    });
    setForceUpdate((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateRefreshKeys, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [updateRefreshKeys]);

  const { data: iframes, refetch } = useQuery({
    queryKey: ["iframe-grafanas", plantSelectedId, forceUpdate],
    queryFn: () =>
      service.find({
        ...(plantSelectedId && { idPlant: plantSelectedId }),
      }),
    enabled: !!plantSelectedId,
    refetchInterval: REFRESH_INTERVAL,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (forceUpdate > 0) {
      refetch();
    }
  }, [forceUpdate, refetch]);

  const getUniqueUrl = useCallback(
    (url: string, iframeId: string) => {
      const autoRefreshTimestamp = refreshKeys[iframeId] || 0;
      const manualRefreshTimestamp = refreshTimestamp;
      const timestamp = Date.now();
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}ts=${timestamp}&auto=${autoRefreshTimestamp}&manual=${manualRefreshTimestamp}`;
    },
    [refreshKeys, refreshTimestamp]
  );

  const renderIframe = useCallback(
    (iframe: IframeGrafana) => (
      <Stack position="relative" width="100%" height="100%">
        <iframe
          key={`${iframe.id}-${
            refreshKeys[iframe.id] || 0
          }-${refreshTimestamp}-${forceUpdate}`}
          src={getUniqueUrl(iframe.url, iframe.id)}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title={`grafana-${iframe.id}`}
        />
      </Stack>
    ),
    [refreshKeys, refreshTimestamp, forceUpdate, getUniqueUrl]
  );

  return (
    <Stack gap={2} height={"calc(100vh - 88px - 16px)"}>
      <LastUpdateDisplay />
      <Stack direction={"row"} gap={2} flex={2.5}>
        <Stack gap={2} flex={1}>
          {iframes &&
            iframes.slice(0, 3).map((iframe) => (
              <Stack
                key={`container-${iframe.id}-${
                  refreshKeys[iframe.id] || 0
                }-${forceUpdate}`}
                height={"100%"}
              >
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
          iframes
            .slice(3)
            .map((iframe) => (
              <Stack
                key={`container-${iframe.id}-${
                  refreshKeys[iframe.id] || 0
                }-${forceUpdate}`}
              >
                {renderIframe(iframe)}
              </Stack>
            ))}
      </Stack>
    </Stack>
  );
}
