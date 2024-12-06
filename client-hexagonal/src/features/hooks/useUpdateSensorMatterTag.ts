import { useQueries } from "@tanstack/react-query";
import { useSensorStore } from "../../hooks/useSensorStore";
import { createAxiosDataSensorRepository } from "../../lib/DataSensor/repository/AxiosDataSensorRepository";
import { createDataSensorService } from "../../lib/DataSensor/application/DataSensorService";
import { useEffect, useCallback, useRef } from "react";
import { useSdkStore } from "../../hooks/useSdkStore";
import { DataSensor } from "../../lib/DataSensor/domain/DataSensor";
import { SensorTag } from "../../lib/Sensor/domain/Sensor";
import { create } from 'zustand';

const repository = createAxiosDataSensorRepository();
const service = createDataSensorService(repository);

interface MatterportTagUpdate {
 label: string;
 description: string;
}

interface LastUpdateStore {
 lastUpdate: string | null;
 setLastUpdate: (timestamp: string | null) => void;
}

export const useLastUpdateStore = create<LastUpdateStore>((set) => ({
 lastUpdate: null,
 setLastUpdate: (timestamp) => set({ lastUpdate: timestamp }),
}));

export const useUpdateSensorMatterTag = () => {
 const sensors = useSensorStore((state) => state.sensors);
 const sdk = useSdkStore((state) => state.sdk);
 const previousDataRef = useRef<DataSensor[]>([]);
 const setLastUpdate = useLastUpdateStore((state) => state.setLastUpdate);

 const updateMatterportTag = useCallback(
  (dataSensor: DataSensor) => {
    console.log("🚀 ~ useUpdateSensorMatterTag ~ dataSensor:", dataSensor.createdAt);
    
    // Convertir a fecha y restar 5 horas
    const date = new Date(dataSensor.createdAt);
    date.setHours(date.getHours() - 5);
    
    setLastUpdate(date.toLocaleString());
    
    const tag = sensors[dataSensor.idSensor];
    if (!tag?.matterportId || !sdk) return;

    const update: MatterportTagUpdate = {
      label: tag.title,
      description: `${tag.description} Value: ${dataSensor.value} ${dataSensor.unit}`,
    };

    sdk.Tag.editBillboard(tag.matterportId, update);
  },
  [sensors, sdk, setLastUpdate]
);

 const response = useQueries({
   queries: Object.values(sensors).map((sensor: SensorTag) => ({
     queryKey: ["data-sensor", sensor.id],
     queryFn: () => service.find({ sensorId: sensor.id, getLatestQuantity: 1 }),
     refetchInterval: 1000,
     staleTime: 500,
     select: (data: DataSensor[]) => {
       const prevData = previousDataRef.current.find(
         (prev) => prev.idSensor === data[0]?.idSensor
       );
       if (
         prevData &&
         prevData.value === data[0]?.value &&
         prevData.variable === data[0]?.variable
       ) {
         return null;
       }
       return data;
     },
   })),
 });

 useEffect(() => {
   if (!sdk || !response || response.some((res) => res.isLoading || res.isError)) return;

   const fetchedDataSensors = response
     .flatMap((res) => res.data)
     .filter((sensor): sensor is DataSensor => 
       sensor !== undefined && sensor !== null
     );

   if (!fetchedDataSensors || fetchedDataSensors.length === 0) return;

   previousDataRef.current = fetchedDataSensors;
   fetchedDataSensors.forEach(updateMatterportTag);
 }, [response, sdk, updateMatterportTag]);
};