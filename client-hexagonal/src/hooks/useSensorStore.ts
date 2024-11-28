import { create } from "zustand";
import { SensorTag } from "../lib/Sensor/domain/Sensor";

interface SensorStore {
  sensors: SensorTag[];
  setSensors: (sensors: SensorTag[]) => void;
}

export const useSensorStore = create<SensorStore>((set) => ({
  sensors: [],
  setSensors: (sensors) => set({ sensors }),
}));
