export type RoadmapItemType =
  | "semester"
  | "subject"
  | "domain"
  | "topic"
  | "subtopic";

export interface RoadmapItem {
  id: string;
  parentId: string | null;
  type: RoadmapItemType;
  title: string;
  description?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedMinutes?: number;
  order: number;
}
