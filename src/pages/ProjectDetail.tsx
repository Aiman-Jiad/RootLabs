import { Link, useParams } from "react-router-dom";
import { useProjectProgressStore } from "@/store/projectProgress";
import {
  ArrowLeft,
  Clock3,
  Code2,
  ExternalLink,
} from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
} as const;

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);
  const status = useProjectProgressStore((state) =>
    projectId ? state.getStatus(projectId) : "not_started",
  );
  const setStatus = useProjectProgressStore((state) => state.setStatus);

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="The project you're looking for doesn't exist."
      />
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {difficultyLabels[project.difficulty]}
          </Badge>

          <Badge variant="outline">
            <Clock3 className="mr-1 h-3 w-3" />
            {project.estimatedHours} hours
          </Badge>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          {project.title}
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project overview</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-7 text-muted-foreground">
                Build this project from the ground up. Focus on understanding
                the concepts behind each feature rather than only completing
                the final result.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills you'll practice</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <Badge key={technology} variant="secondary">
                    <Code2 className="mr-1 h-3 w-3" />
                    {technology}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project progress</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Track your progress on this project.
              </p>

              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => projectId && setStatus(projectId, "in_progress")}
                  className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                    status === "in_progress"
                      ? "border-foreground bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  In progress
                </button>

                <button
                  type="button"
                  onClick={() => projectId && setStatus(projectId, "completed")}
                  className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                    status === "completed"
                      ? "border-foreground bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  Completed
                </button>

                <button
                  type="button"
                  onClick={() => projectId && setStatus(projectId, "not_started")}
                  className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                    status === "not_started"
                      ? "border-foreground bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  Not started
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Difficulty
                </p>
                <p className="mt-1 text-sm">
                  {difficultyLabels[project.difficulty]}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Estimated time
                </p>
                <p className="mt-1 text-sm">
                  {project.estimatedHours} hours
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Status
                </p>
                <p className="mt-1 text-sm capitalize">
                  {status.replace("_", " ")}
                </p>
              </div>
            </CardContent>
          </Card>

          {(project.githubUrl || project.demoUrl) && (
            <Card>
              <CardHeader>
                <CardTitle>Project links</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    GitHub
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Live demo
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
