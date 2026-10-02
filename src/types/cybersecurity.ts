export type CyberItemType =
  | "domain"
  | "topic"
  | "subtopic";

export type CyberDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

export interface CyberItem {
  id: string;
  parentId: string | null;
  type: CyberItemType;
  title: string;
  description?: string;
  difficulty?: CyberDifficulty;
  estimatedMinutes?: number;
  order: number;
}
