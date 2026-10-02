import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 rounded-md font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="RootLabs home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Terminal className="h-4 w-4" />
      </span>

      {!compact && (
        <span className="text-lg">
          Root<span className="text-muted-foreground">Labs</span>
        </span>
      )}
    </Link>
  );
}
