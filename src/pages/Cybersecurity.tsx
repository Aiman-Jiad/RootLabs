import { ShieldCheck } from "lucide-react";

import { CybersecurityNode } from "@/components/cybersecurity/CybersecurityNode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/layout/PageHeader";
import { cyberTrackableItems, cyberTree } from "@/lib/cyberTree";
import { useCyberProgressStore } from "@/store/cyberProgress";

export default function Cybersecurity() {
  const completed = useCyberProgressStore((state) => state.completed);

  const completedCount = cyberTrackableItems.filter(
    (item) => completed[item.id],
  ).length;

  const totalCount = cyberTrackableItems.length;

  const progress =
    totalCount > 0
      ? Math.round((completedCount / totalCount) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cybersecurity"
        description="Build practical cybersecurity knowledge from foundations to security engineering."
      />

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <CardTitle>Cybersecurity Roadmap</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  {completedCount} of {totalCount} topics completed
                </p>
              </div>
            </div>

            <span className="text-lg font-semibold tabular-nums">
              {progress}%
            </span>
          </div>

          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-3">
          {cyberTree.map((item) => (
            <CybersecurityNode
              key={item.id}
              item={item}
              level={0}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
