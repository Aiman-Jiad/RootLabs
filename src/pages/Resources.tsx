import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { resources } from "@/data/resources";
import type { Resource } from "@/types/resource";
import { EmptyState } from "@/components/ui/empty-state";

const resourceTypes: Array<"all" | Resource["type"]> = [
  "all",
  "video",
  "article",
  "documentation",
  "course",
  "practice",
  "lab",
];

const difficulties: Array<
  "all" | NonNullable<Resource["difficulty"]>
> = [
  "all",
  "beginner",
  "intermediate",
  "advanced",
];

export default function Resources() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"all" | Resource["type"]>("all");
  const [difficulty, setDifficulty] = useState<
    "all" | NonNullable<Resource["difficulty"]>
  >("all");

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesSearch =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.provider.toLowerCase().includes(query);

      const matchesType =
        type === "all" || resource.type === type;

      const matchesDifficulty =
        difficulty === "all" ||
        resource.difficulty === difficulty;

      return matchesSearch && matchesType && matchesDifficulty;
    });
  }, [search, type, difficulty]);

  return (
    <div>
      <PageHeader
        title="Resources"
        description="Find learning material, documentation, practice platforms and hands-on resources."
      />

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search resources..."
            className="h-10 w-full rounded-md border bg-background pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </div>

          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value as typeof type)
            }
            className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          >
            {resourceTypes.map((item) => (
              <option key={item} value={item}>
                {item === "all"
                  ? "All types"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value as typeof difficulty)
            }
            className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          >
            {difficulties.map((item) => (
              <option key={item} value={item}>
                {item === "all"
                  ? "All difficulties"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>

          <span className="text-xs text-muted-foreground sm:ml-auto">
            {filteredResources.length} resource
            {filteredResources.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No resources found"
          description="Try changing your search or filters."
        />
      )}
    </div>
  );
}
