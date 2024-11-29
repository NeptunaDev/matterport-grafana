import { create } from "zustand";
import { Plant } from "../lib/Plant/domain/Plant";

interface PlantStore {
  plants: Plant[];
  plantSelected: Plant | null;
  setPlants: (plants: Plant[]) => void;
  setPlantSelected: (plant: Plant) => void;
}

export const usePlantStore = create<PlantStore>((set) => ({
  plants: [],
  plantSelected: null,
  setPlants: (plants) => set({ plants }),
  setPlantSelected: (plant) => set({ plantSelected: plant }),
}));
