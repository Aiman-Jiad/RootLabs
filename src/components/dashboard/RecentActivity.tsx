import {
  CheckCircle2,
  Circle,
  Clock3,
  Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    title: "Completed Fizz Buzz",
    description: "LeetCode · Problem 412",
    time: "Today",
    icon: CheckCircle2,
  },
  {
    title: "Started Conditional Statements",
    description: "Java · Programming Fundamentals",
    time: "Yesterday",
    icon: Clock3,
  },
  {
    title: "Completed Add Two Integers",
    description: "LeetCode · Problem 2235",
    time: "2 days ago",
    icon: Trophy,
  },
  {
    title: "DSA Fundamentals",
    description: "Next recommended topic",
    time: "Upcoming",
    icon: Circle,
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your latest learning activity.
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="flex items-start gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {activity.title}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-muted-foreground">
                  {activity.time}
                </span>

                {index < activities.length - 1 && null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
