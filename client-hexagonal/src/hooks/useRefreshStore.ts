import { create } from 'zustand';

interface RefreshStore {
  refreshTimestamp: number;
  refreshAll: () => void;
}

export const useRefreshStore = create<RefreshStore>((set) => ({
  refreshTimestamp: 0,
  refreshAll: () => set((state) => ({ refreshTimestamp: state.refreshTimestamp + 1 })),
}));