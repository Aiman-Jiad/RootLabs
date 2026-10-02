import {
  BookOpen,
  FolderKanban,
  Map,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Explore Roadmap",
    description: "See what to learn next",
    href: "/roadmap",
    icon: Map,
  },
  {
    title: "Browse Resources",
    description: "Find learning material",
    href: "/resources",
    icon: BookOpen,
  },
  {
    title: "Build a Project",
    description: "Apply what you've learned",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Learn Cybersecurity",
    description: "Start security fundamentals",
    href: "/cybersecurity",
    icon: ShieldCheck,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Jump straight into your next task.
        </p>
      </CardHeader>

      <CardContent className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              to={action.href}
              className="group flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium group-hover:underline">
                  {action.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
