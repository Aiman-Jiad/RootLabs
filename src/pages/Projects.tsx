import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [technology, setTechnology] = useState("all");

  const technologies = useMemo(
    () =>
      Array.from(
        new Set(projects.flatMap((project) => project.technologies)),
      ).sort(),
    [],
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.skills.some((skill) =>
          skill.toLowerCase().includes(query),
        ) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(query),
        );

      const matchesDifficulty =
        difficulty === "all" || project.difficulty === difficulty;

      const matchesTechnology =
        technology === "all" ||
        project.technologies.includes(technology);

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesTechnology
      );
    });
  }, [search, difficulty, technology]);

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Build practical projects that turn what you learn into real skills."
      />

      <div className="mb-6 rounded-lg border bg-card p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects, skills, or technologies..."
              className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>

          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter by difficulty"
          >
            <option value="all">All difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={technology}
            onChange={(event) => setTechnology(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter by technology"
          >
            <option value="all">All technologies</option>

            {technologies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {filteredProjects.length} project
            {filteredProjects.length === 1 ? "" : "s"}
          </span>

          {(search ||
            difficulty !== "all" ||
            technology !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setDifficulty("all");
                setTechnology("all");
              }}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects found"
          description="Try changing your search or filters."
        />
      )}
    </div>
  );
}
