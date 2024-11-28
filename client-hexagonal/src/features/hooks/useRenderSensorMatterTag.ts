import { useQueries } from "@tanstack/react-query";
import { createAxiosSensorRepository } from "../../lib/Sensor/repository/AxiosSensorRepository";
import { createSensorService } from "../../lib/Sensor/application/SensorService";
import { useDeviceStore } from "../../hooks/useDeviceStore";
import { useEffect } from "react";
import { useSdkStore } from "../../hooks/useSdkStore";
import { Mattertag } from "../../lib/Sdk/domain/Sdk";
import { useSensorStore } from "../../hooks/useSensorStore";
import { SensorTag } from "../../lib/Sensor/domain/Sensor";

const repository = createAxiosSensorRepository();
const service = createSensorService(repository);

export const useRenderSensorMatterTag = () => {
  const devices = useDeviceStore((state) => state.devices);
  const sdk = useSdkStore((state) => state.sdk);
  const { setSensors, sensors } = useSensorStore((state) => state);

  const response = useQueries({
    queries: devices.map((device) => ({
      queryKey: ["sensor", device.id],
      queryFn: () => service.find({ idDevice: device.id }),
    })),
  });

  useEffect(() => {
    const render = async () => {
      if (!sdk) return;
      if (!response || response.some((res) => res.isLoading || res.isError)) return;
      

      const fetchedSensors = response
        .flatMap((res) => res.data)
        .filter((sensor) => sensor !== undefined);

      if (!fetchedSensors || fetchedSensors.length === 0) return;

      // Crear nuevos tags solo si no existen en el estado global
      const newSensorTags = await Promise.all(
        fetchedSensors.map(async (sensor): Promise<SensorTag> => {          
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

          const [id] = await sdk.Tag.add(tag);
          return { ...sensor, matterportId: id };
        })
      );

      const validNewTags = newSensorTags.filter(
        (tag) => tag && !sensors.some((s) => s.id === tag.id)
      );
      
      if (validNewTags.length > 0) {
        setSensors([...sensors, ...validNewTags]);
      }
    };

    render();
  }, [sdk, response, setSensors, sensors]);
};
