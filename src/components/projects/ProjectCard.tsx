import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock3, Code2, PlayCircle } from "lucide-react";
import type { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProjectProgressStore } from "@/store/projectProgress";

interface ProjectCardProps {
  project: Project;
}

const difficultyLabels: Record<Project["difficulty"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const statusLabels = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
} as const;

export function ProjectCard({ project }: ProjectCardProps) {
  const status = useProjectProgressStore((state) =>
    state.getStatus(project.id),
  );

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block"
    >
      <Card className="h-full transition-colors group-hover:border-foreground/20">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  {difficultyLabels[project.difficulty]}
                </Badge>

                <Badge variant="outline">
                  <Clock3 className="mr-1 h-3 w-3" />
                  {project.estimatedHours}h
                </Badge>

                <Badge
                  variant={
                    status === "completed"
                      ? "default"
                      : status === "in_progress"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {status === "completed" && (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  )}

                  {status === "in_progress" && (
                    <PlayCircle className="mr-1 h-3 w-3" />
                  )}

                  {statusLabels[status]}
                </Badge>
              </div>

              <h3 className="font-semibold tracking-tight">
                {project.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
            </div>

            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" />
              Technologies
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Badge key={technology} variant="outline">
                  {technology}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Skills you'll practice
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
