import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SDKInstance } from "../../types/matterport";

export interface SdkState {
  sdk: SDKInstance | null;
}

const initialState: SdkState = {
  sdk: null,
};

export const sdkSlice = createSlice({
  name: "sdk",
  initialState,
  reducers: {
    setSdk: (state, action: PayloadAction<SDKInstance>) => {
      state.sdk = action.payload;
    },
  },
});

export const { setSdk } = sdkSlice.actions;

export default sdkSlice.reducer;
