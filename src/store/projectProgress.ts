import { create } from "zustand";

export type ProjectStatus =
  | "not_started"
  | "in_progress"
  | "completed";

interface ProjectProgressState {
  statuses: Record<string, ProjectStatus>;
  setStatus: (projectId: string, status: ProjectStatus) => void;
  getStatus: (projectId: string) => ProjectStatus;
}

const STORAGE_KEY = "rootlabs-project-progress";

function readStatuses(): Record<string, ProjectStatus> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {};
    }

    const parsed: unknown = JSON.parse(stored);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([, value]) =>
          value === "not_started" ||
          value === "in_progress" ||
          value === "completed",
      ),
    );
  } catch {
    return {};
  }
}

function saveStatuses(statuses: Record<string, ProjectStatus>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch (error) {
    console.warn("Could not persist project progress:", error);
  }
}

export const useProjectProgressStore = create<ProjectProgressState>(
  (set, get) => ({
    statuses: readStatuses(),

    setStatus: (projectId, status) => {
      const updated = {
        ...get().statuses,
        [projectId]: status,
      };

      saveStatuses(updated);
      set({ statuses: updated });
    },

    getStatus: (projectId) => {
      return get().statuses[projectId] ?? "not_started";
    },
  }),
);
