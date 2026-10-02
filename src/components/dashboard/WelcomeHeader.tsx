import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WelcomeHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <section className="mb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {greeting}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Welcome back, Aiman.
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Keep building your technical foundation. Small progress every day
            compounds into serious skills.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          Semester 1
        </Badge>
      </div>
    </section>
  );
}
