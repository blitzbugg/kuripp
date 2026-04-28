import { create } from "zustand";
import { storageService } from "../services/storageService";

export const useUserStore = create((set, get) => ({
  settings: {
    name: "User",
    theme: "dark",
  },
  isLoading: true,

  fetchSettings: async () => {
    const settings = await storageService.loadSettings();
    if (settings && !Array.isArray(settings)) {
      set({ settings: { ...get().settings, ...settings }, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  updateSettings: async (updates) => {
    const newSettings = { ...get().settings, ...updates };
    set({ settings: newSettings });
    await storageService.saveSettings(newSettings);
  },
}));
