import { create } from "zustand";

interface ProgressState {
  completedItems: string[];
  toggleItem: (itemId: string) => void;
  isCompleted: (itemId: string) => boolean;
}

const STORAGE_KEY = "rootlabs-progress";

function readProgress(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is string => typeof item === "string",
    );
  } catch {
    return [];
  }
}

function saveProgress(items: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Could not persist progress:", error);
  }
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedItems: readProgress(),

  toggleItem: (itemId) => {
    const current = get().completedItems;

    const updated = current.includes(itemId)
      ? current.filter((id) => id !== itemId)
      : [...current, itemId];

    saveProgress(updated);
    set({ completedItems: updated });
  },

  isCompleted: (itemId) => {
    return get().completedItems.includes(itemId);
  },
}));
