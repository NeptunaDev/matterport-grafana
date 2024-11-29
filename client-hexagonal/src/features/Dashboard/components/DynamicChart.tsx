import { Stack } from "@mui/material";
import { useSdkStore } from "../../../hooks/useSdkStore";
import { useEffect, useState } from "react";
import { useSensorStore } from "../../../hooks/useSensorStore";
import { SensorTag } from "../../../lib/Sensor/domain/Sensor";
import { createAxiosIframeGrafanaRepository } from "../../../lib/IframeGrafana/repository/AxiosIframeGrafanaRepository";
import { createIframeGrafanaService } from "../../../lib/IframeGrafana/application/IframeGrafanaService";
import { useQuery } from "@tanstack/react-query";

const repository = createAxiosIframeGrafanaRepository();
const service = createIframeGrafanaService(repository);
export function DynamicChart() {
  const sdk = useSdkStore((state) => state.sdk);
  const sensors = useSensorStore((state) => state.sensors);
  const [sensor, setSensor] = useState<SensorTag>();

  const { data } = useQuery({
    queryKey: ["iframe-grafanas", sensor?.id],
    queryFn: () => service.find({ idPlant: sensor?.id }),
    enabled: !!sensor?.id,
  });

  useEffect(() => {
    if (!sdk) return;
    sdk.Tag.openTags.subscribe((tag) => {
      const idSelected = tag.selected.values().next().value;
      if (!idSelected) return;
      const sensor = Object.values(sensors).find(
        (se) => se.matterportId === idSelected
      );
      setSensor(sensor);
    });
  }, [sdk, sensors]);

  return (
    <Stack flex={1}>
      {data && data.length > 0 && sensor && data[0].idPlant === sensor.id ? (
        <iframe src={data[0].url} width={"100%"} height={"100%"}></iframe>
      ) : (
        <div>
          aqui se pinta la grafica del sensor {sensor?.title} en el lugar
          {sensor?.place}
          {sensor?.place} {sensor?.id}
          {data?.[0]?.idPlant}
        </div>
      )}
    </Stack>
  );
}
