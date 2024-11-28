import { useQueries } from "@tanstack/react-query";
import { createAxiosSensorRepository } from "../../lib/Sensor/repository/AxiosSensorRepository";
import { createSensorService } from "../../lib/Sensor/application/SensorService";
import { useDeviceStore } from "../../hooks/useDeviceStore";
import { useEffect } from "react";
import { useSdkStore } from "../../hooks/useSdkStore";
import { Mattertag } from "../../lib/Sdk/domain/Sdk";
import { SensorTag } from "../../lib/Sensor/domain/Sensor";
import { useSensorStore } from "../../hooks/useSensorStore";

const repository = createAxiosSensorRepository();
const service = createSensorService(repository);
export const useRenderSensorMatterTag = () => {
  const devices = useDeviceStore((state) => state.devices);
  const sdk = useSdkStore((state) => state.sdk);
  const setSensors = useSensorStore((state) => state.setSensors);

  const response = useQueries({
    queries: devices.map((device) => {
      return {
        queryKey: ["sensor", device.id],
        queryFn: () => service.find({ idDevice: device.id }),
      };
    }),
  });

  useEffect(() => {
    const render = async () => {
      if (!sdk) return;
      if (!response) return;
      const sensors = response.flatMap((res) => res.data);
      if (!sensors || sensors.length <= 0) return;
      const sensorTags: SensorTag[] = [];
      for (const sensor of sensors) {
        if (!sensor) return;
        const tag: Mattertag.MattertagDescriptor = {
          label: sensor.title,
          anchorPosition: {
            x: sensor.place[0],
            y: sensor.place[1],
            z: sensor.place[2],
          },
          description: sensor.description,
          stemVector: {
            x: sensor.vector[0],
            y: sensor.vector[1],
            z: sensor.vector[2],
          },
        };
        const [id] = await sdk.Mattertag.add(tag);
        sensorTags.push({ ...sensor, matterportId: id });
      }
      setSensors(sensorTags);
    };
    render();
  }, [response, sdk, setSensors]);
};
