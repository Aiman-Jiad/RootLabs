import { Map } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { RoadmapTree } from "@/components/roadmap/RoadmapTree";

export default function Roadmap() {
  return (
    <div>
      <PageHeader
        title="Learning Roadmap"
        description="Follow your personalized path from fundamentals to advanced technical skills."
        actions={
          <div className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground">
            <Map className="h-4 w-4" />
            Semester 1
          </div>
        }
      />

      <RoadmapTree />
    </div>
  );
}
