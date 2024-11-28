import { create } from "zustand";
import { CommonMpSdk } from "../lib/Sdk/domain/Sdk";

interface SdkStore {
  sdk: CommonMpSdk | null;
  setSdk: (sdk: CommonMpSdk) => void;
  setInitialStore: () => void;
}

export const useSdkStore = create<SdkStore>((set) => ({
  sdk: null,
  setSdk: (sdk) => set({ sdk }),
  setInitialStore: () => set({ sdk: null }),
}));
