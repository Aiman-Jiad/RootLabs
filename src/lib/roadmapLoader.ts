import {
  getSemesters,
  getSubjects,
  getTopics,
  getTracks,
} from "@/lib/roadmapApi";
import type { RoadmapItem } from "@/types/roadmap";

export async function loadRoadmap(): Promise<RoadmapItem[]> {
  const tracks = await getTracks();

  if (tracks.length === 0) {
    return [];
  }

  const track = tracks[0];
  const semesters = await getSemesters(track.id);

  const items: RoadmapItem[] = [];

  for (const semester of semesters) {
    items.push({
      id: semester.id,
      parentId: null,
      type: "semester",
      title: semester.name,
      description: semester.description ?? undefined,
      order: semester.semester_number,
    });

    const subjects = await getSubjects(semester.id);

    for (const subject of subjects) {
      items.push({
        id: subject.id,
        parentId: semester.id,
        type: "subject",
        title: subject.name,
        description: subject.description ?? undefined,
        order: subject.display_order,
      });

      const topics = await getTopics(subject.id);

      for (const topic of topics) {
        items.push({
          id: topic.id,
          parentId: topic.parent_id,
          type: topic.parent_id ? "subtopic" : "topic",
          title: topic.name,
          description: topic.description ?? undefined,
          difficulty: topic.difficulty ?? undefined,
          estimatedMinutes: topic.estimated_minutes ?? undefined,
          order: topic.display_order,
        });
      }
    }
  }

  return items;
}
