import { useSensorStore } from "../../hooks/useSensorStore";

export const useUpdateSensorMatterTag = () => {
  const sensors = useSensorStore((state) => state.sensors);
  console.log(sensors);
};
