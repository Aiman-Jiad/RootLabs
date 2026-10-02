import { ExternalLink } from "lucide-react";
import type { Resource } from "@/types/resource";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ResourceCardProps {
  resource: Resource;
}

const typeLabels: Record<Resource["type"], string> = {
  video: "Video",
  article: "Article",
  documentation: "Documentation",
  course: "Course",
  practice: "Practice",
  lab: "Lab",
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="transition-colors hover:border-foreground/20">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {typeLabels[resource.type]}
              </Badge>

              {resource.difficulty && (
                <Badge variant="outline">
                  {resource.difficulty}
                </Badge>
              )}

              {resource.free && (
                <Badge variant="outline">Free</Badge>
              )}
            </div>

            <h3 className="font-semibold tracking-tight">
              {resource.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {resource.description}
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              {resource.provider}
            </p>
          </div>

          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${resource.title}`}
            className="shrink-0 rounded-md border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
