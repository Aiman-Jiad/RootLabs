import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";

export default function Dashboard() {
  return (
    <div>
      <WelcomeHeader />

      <div className="space-y-6">
        <ProgressOverview />

        <div className="grid gap-6 lg:grid-cols-2">
          <ContinueLearning />
          <RecentActivity />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}
