export type ProjectDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

export type ProjectStatus =
  | "not_started"
  | "in_progress"
  | "completed";

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  estimatedHours: number;
  technologies: string[];
  skills: string[];
  topicIds: string[];
  githubUrl?: string;
  demoUrl?: string;
  status?: ProjectStatus;
}
