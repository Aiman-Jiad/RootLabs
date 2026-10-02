import { useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  GraduationCap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { loadRoadmap } from "@/lib/roadmapLoader";
import { useProgressStore } from "@/store/progress";
import { cn } from "@/lib/utils";
import type { RoadmapItem } from "@/types/roadmap";

interface RoadmapNodeProps {
  item: RoadmapItem;
  items: RoadmapItem[];
  level: number;
}

function getChildren(
  items: RoadmapItem[],
  parentId: string,
): RoadmapItem[] {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.order - b.order);
}

function RoadmapNode({
  item,
  items,
  level,
}: RoadmapNodeProps) {
  const children = getChildren(items, item.id);
  const hasChildren = children.length > 0;

  const [expanded, setExpanded] = useState(level < 2);

  const completedItems = useProgressStore(
    (state) => state.completedItems,
  );
  const toggleItem = useProgressStore(
    (state) => state.toggleItem,
  );

  const isCompleted = completedItems.includes(item.id);

  const Icon =
    item.type === "semester"
      ? GraduationCap
      : BookOpen;

  const isTrackable =
    item.type === "topic" || item.type === "subtopic";

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-3 transition-colors",
          hasChildren && "hover:bg-accent",
          isCompleted && "opacity-60",
        )}
        style={{
          paddingLeft: `${level * 24 + 12}px`,
        }}
      >
        <button
          type="button"
          onClick={() =>
            hasChildren && setExpanded((value) => !value)
          }
          disabled={!hasChildren}
          className="flex h-5 w-5 shrink-0 items-center justify-center"
          aria-label={
            expanded
              ? `Collapse ${item.title}`
              : `Expand ${item.title}`
          }
        >
          {hasChildren &&
            (expanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ))}
        </button>

        {isTrackable ? (
          <button
            type="button"
            onClick={() => toggleItem(item.id)}
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
              isCompleted
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background hover:bg-accent",
            )}
            aria-label={
              isCompleted
                ? `Mark ${item.title} as incomplete`
                : `Mark ${item.title} as complete`
            }
          >
            {isCompleted && (
              <Check className="h-3.5 w-3.5" />
            )}
          </button>
        ) : (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
            <Icon className="h-4 w-4" />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm font-medium",
              isCompleted && "line-through",
            )}
          >
            {item.title}
          </p>

          {item.description && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>

        {item.difficulty && (
          <Badge
            variant="outline"
            className="hidden sm:inline-flex"
          >
            {item.difficulty}
          </Badge>
        )}

        {item.estimatedMinutes && (
          <span className="hidden items-center gap-1 text-xs text-muted-foreground md:flex">
            <Clock3 className="h-3.5 w-3.5" />
            {item.estimatedMinutes} min
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <div>
          {children.map((child) => (
            <RoadmapNode
              key={child.id}
              item={child}
              items={items}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function RoadmapTree() {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const completedItems = useProgressStore(
    (state) => state.completedItems,
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchRoadmap() {
      try {
        setLoading(true);
        setError(null);

        const data = await loadRoadmap();

        if (!cancelled) {
          setItems(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load roadmap.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRoadmap();

    return () => {
      cancelled = true;
    };
  }, []);

  const rootItems = items
    .filter((item) => item.parentId === null)
    .sort((a, b) => a.order - b.order);

  const trackableItems = items.filter(
    (item) =>
      item.type === "topic" || item.type === "subtopic",
  );

  const completedCount = trackableItems.filter((item) =>
    completedItems.includes(item.id),
  ).length;

  const progress =
    trackableItems.length === 0
      ? 0
      : Math.round(
          (completedCount / trackableItems.length) * 100,
        );

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Loading your roadmap...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm font-medium">
            Could not load the roadmap
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                Semester 1 Progress
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {completedCount} of {trackableItems.length} topics completed
              </p>
            </div>

            <span className="text-lg font-semibold tabular-nums">
              {progress}%
            </span>
          </div>

          <Progress value={progress} className="mt-4" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          {rootItems.map((item) => (
            <RoadmapNode
              key={item.id}
              item={item}
              items={items}
              level={0}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
