import { createSlice } from "@reduxjs/toolkit";
import { Plant } from "../../dashboard/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export interface PlantState {
  plants: Plant[];
  plantSelected: Plant | null;
}

const initialState: PlantState = {
  plants: [],
  plantSelected: null,
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    setPlant: (state, action: PayloadAction<Plant[]>) => {
      state.plants = action.payload;
    },
    setPlantSelected: (state, action: PayloadAction<Plant>) => {
      state.plantSelected = action.payload;
    },
  },
});

export const { setPlant, setPlantSelected } = plantSlice.actions;

export default plantSlice.reducer;
