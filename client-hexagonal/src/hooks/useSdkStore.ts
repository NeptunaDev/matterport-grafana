import { create } from "zustand";
import { CommonMpSdk } from "../lib/Sdk/domain/Sdk";

interface SdkStore {
  sdk: CommonMpSdk | null;
  setSdk: (sdk: CommonMpSdk) => void;
}

export const useSdkStore = create<SdkStore>((set) => ({
  sdk: null,
  setSdk: (sdk) => set({ sdk }),
}));
