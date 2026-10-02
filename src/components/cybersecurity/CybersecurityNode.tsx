import {
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Folder,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CyberTreeNode } from "@/lib/cyberTree";
import { useCyberProgressStore } from "@/store/cyberProgress";

interface CybersecurityNodeProps {
  item: CyberTreeNode;
  level: number;
}

const difficultyVariant = {
  beginner: "secondary",
  intermediate: "default",
  advanced: "outline",
} as const;

export function CybersecurityNode({
  item,
  level,
}: CybersecurityNodeProps) {
  const [expanded, setExpanded] = useState(level < 1);

  const { isCompleted, toggleCompleted } = useCyberProgressStore();

  const completed = isCompleted(item.id);
  const hasChildren = item.children.length > 0;
  const isTrackable =
    item.type === "topic" || item.type === "subtopic";

  const completedChildren = item.children.filter((child) =>
    isCompleted(child.id),
  ).length;

  const childProgress =
    item.children.length > 0
      ? Math.round(
          (completedChildren / item.children.length) * 100,
        )
      : 0;

  return (
    <div>
      <div
        className={cn(
          "group flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors",
          "hover:bg-accent/60",
          completed && "bg-accent/40",
        )}
        style={{ paddingLeft: `${12 + level * 24}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="h-7 w-7 shrink-0" />
        )}

        {isTrackable ? (
          <button
            type="button"
            onClick={() => toggleCompleted(item.id)}
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
              completed
                ? "border-foreground bg-foreground text-background"
                : "border-muted-foreground/40 hover:border-foreground",
            )}
            aria-label={
              completed
                ? `Mark ${item.title} incomplete`
                : `Mark ${item.title} complete`
            }
          >
            {completed && <Check className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center">
            {item.type === "domain" ? (
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Folder className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => hasChildren && setExpanded((value) => !value)}
          className={cn(
            "min-w-0 flex-1 text-left",
            hasChildren && "cursor-pointer",
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "text-sm font-medium",
                completed && "text-muted-foreground line-through",
              )}
            >
              {item.title}
            </span>

            {item.difficulty && (
              <Badge variant={difficultyVariant[item.difficulty]}>
                {item.difficulty}
              </Badge>
            )}

            {item.estimatedMinutes && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock3 className="h-3 w-3" />
                {item.estimatedMinutes} min
              </span>
            )}
          </div>

          {item.description && (
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {item.description}
            </p>
          )}
        </button>

        {hasChildren && (
          <span className="hidden shrink-0 text-xs tabular-nums text-muted-foreground sm:block">
            {completedChildren}/{item.children.length}
            {item.type === "domain" && ` · ${childProgress}%`}
          </span>
        )}
      </div>

      {expanded && hasChildren && (
        <div>
          {item.children.map((child) => (
            <CybersecurityNode
              key={child.id}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
