import { useQueries } from "@tanstack/react-query";
import { useSensorStore } from "../../hooks/useSensorStore";
import { createAxiosDataSensorRepository } from "../../lib/DataSensor/repository/AxiosDataSensorRepository";
import { createDataSensorService } from "../../lib/DataSensor/application/DataSensorService";
import { useEffect } from "react";
import { useSdkStore } from "../../hooks/useSdkStore";

const repository = createAxiosDataSensorRepository();
const service = createDataSensorService(repository);

// TODO: useQuery don't cant update the sensors of the store
export const useUpdateSensorMatterTag = () => {
  const sensors = useSensorStore((state) => state.sensors);
  const sdk = useSdkStore((state) => state.sdk);

  const response = useQueries({
    queries: Object.values(sensors).map((sensor) => ({
      queryKey: ["data-sensor", sensor.id],
      queryFn: () => {
        return service.find({ sensorId: sensor.id, getLatestQuantity: 1 });
      },
      refetchInterval: 1000,
    })),
  });

  useEffect(() => {
    if (!sdk) return;
    if (!response || response.some((res) => res.isLoading || res.isError))
      return;
    const fetchedDataSensors = response
      .flatMap((res) => res.data)
      .filter((sensor) => sensor !== undefined);
    if (!fetchedDataSensors || fetchedDataSensors.length === 0) return;

    fetchedDataSensors.forEach((dataSensor) => {
      const tag = sensors[dataSensor.idSensor];
      if (!tag || !tag.matterportId) return;
      sdk.Tag.editBillboard(tag.matterportId, {
        label: tag.title + dataSensor.variable,
        description: `
          ${tag.description}
          Value: ${dataSensor.value} ${dataSensor.unit}
        `,
      });
    });
  }, [response, sensors, sdk]);
};
