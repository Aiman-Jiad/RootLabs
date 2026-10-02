import { BookOpen, Code2, ShieldCheck, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { roadmapItems } from "@/data/roadmap";
import { cyberTrackableItems } from "@/lib/cyberTree";
import { useCyberProgressStore } from "@/store/cyberProgress";
import { useProgressStore } from "@/store/progress";

const programmingTopicIds = new Set([
  "java-basics",
  "java-input-output",
  "java-conditionals",
  "java-loops",
]);

export function ProgressOverview() {
  const completedRoadmapItems = useProgressStore(
    (state) => state.completedItems,
  );

  const completedCyberItems = useCyberProgressStore(
    (state) => state.completed,
  );

  const trackableRoadmapItems = roadmapItems.filter(
    (item) => item.type === "topic" || item.type === "subtopic",
  );

  const completedRoadmapCount = trackableRoadmapItems.filter((item) =>
    completedRoadmapItems.includes(item.id),
  ).length;

  const roadmapProgress =
    trackableRoadmapItems.length > 0
      ? Math.round(
          (completedRoadmapCount / trackableRoadmapItems.length) * 100,
        )
      : 0;

  const programmingItems = trackableRoadmapItems.filter((item) =>
    programmingTopicIds.has(item.id),
  );

  const completedProgrammingCount = programmingItems.filter((item) =>
    completedRoadmapItems.includes(item.id),
  ).length;

  const programmingProgress =
    programmingItems.length > 0
      ? Math.round(
          (completedProgrammingCount / programmingItems.length) * 100,
        )
      : 0;

  const completedCyberCount = cyberTrackableItems.filter(
    (item) => completedCyberItems[item.id],
  ).length;

  const cybersecurityProgress =
    cyberTrackableItems.length > 0
      ? Math.round(
          (completedCyberCount / cyberTrackableItems.length) * 100,
        )
      : 0;

  const areas = [
    {
      label: "B.Tech Roadmap",
      value: roadmapProgress,
      icon: BookOpen,
      description: `${completedRoadmapCount} of ${trackableRoadmapItems.length} topics completed`,
    },
    {
      label: "Programming",
      value: programmingProgress,
      icon: Code2,
      description: `${completedProgrammingCount} of ${programmingItems.length} topics completed`,
    },
    {
      label: "Cybersecurity",
      value: cybersecurityProgress,
      icon: ShieldCheck,
      description: `${completedCyberCount} of ${cyberTrackableItems.length} topics completed`,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Learning Progress</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Your current progress across RootLabs.
          </p>
        </div>

        <TrendingUp className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-6">
        {areas.map((area) => {
          const Icon = area.icon;

          return (
            <div key={area.label} className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">{area.label}</p>

                    <p className="truncate text-xs text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                </div>

                <span className="text-sm font-medium tabular-nums">
                  {area.value}%
                </span>
              </div>

              <Progress value={area.value} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
