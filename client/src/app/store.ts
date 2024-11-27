import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "../features/plant/plantSlice";
import sdkReducer from "../features/sdk/sdkSlice";

export const store = configureStore({
  reducer: {
    plant: plantReducer,
    sdk: sdkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
