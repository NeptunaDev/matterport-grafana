import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "../features/counter/plantSlice";

export const store = configureStore({
  reducer: {
    plant: plantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
