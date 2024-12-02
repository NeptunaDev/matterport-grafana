import { create } from "zustand";
import { SensorTag } from "../lib/Sensor/domain/Sensor";

interface SensorStore {
  sensors: { [key: string]: SensorTag };
  setSensors: (sensors: { [key: string]: SensorTag }) => void;
  setInitialStore: () => void;
}

export const useSensorStore = create<SensorStore>((set) => ({
  sensors: {},
  setSensors: (sensors) => set({ sensors }),
  setInitialStore: () => set({ sensors: {} }),
}));
