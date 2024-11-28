import { create } from "zustand";
import { Device } from "../lib/Device/domain/Device";

interface DeviceStore {
  devices: Device[];
  setDevices: (devices: Device[]) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [],
  setDevices: (devices) => set({ devices }),
}));
