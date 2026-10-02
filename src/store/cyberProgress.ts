import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CyberProgressState {
  completed: Record<string, boolean>;
  toggleCompleted: (id: string) => void;
  isCompleted: (id: string) => boolean;
}

export const useCyberProgressStore = create<CyberProgressState>()(
  persist(
    (set, get) => ({
      completed: {},

      toggleCompleted: (id) =>
        set((state) => {
          const next = { ...state.completed };

          if (next[id]) {
            delete next[id];
          } else {
            next[id] = true;
          }

          return { completed: next };
        }),

      isCompleted: (id) => Boolean(get().completed[id]),
    }),
    {
      name: "rootlabs-cyber-progress-v1",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completed: state.completed,
      }),
    },
  ),
);
