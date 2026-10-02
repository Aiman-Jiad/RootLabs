export type ResourceType =
  | "video"
  | "article"
  | "documentation"
  | "course"
  | "practice"
  | "lab";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  provider: string;
  topicId?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedMinutes?: number;
  free: boolean;
}
