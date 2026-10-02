import { supabase } from "@/lib/supabase";

export async function getTracks() {
  const { data, error } = await supabase
    .from("tracks")
    .select("id, name, description")
    .order("name");

  if (error) {
    throw new Error(`Failed to load tracks: ${error.message}`);
  }

  return data;
}

export async function getSemesters(trackId: string) {
  const { data, error } = await supabase
    .from("semesters")
    .select("id, track_id, semester_number, name, description")
    .eq("track_id", trackId)
    .order("semester_number");

  if (error) {
    throw new Error(`Failed to load semesters: ${error.message}`);
  }

  return data;
}

export async function getSubjects(semesterId: string) {
  const { data, error } = await supabase
    .from("subjects")
    .select("id, semester_id, name, description, display_order")
    .eq("semester_id", semesterId)
    .order("display_order");

  if (error) {
    throw new Error(`Failed to load subjects: ${error.message}`);
  }

  return data;
}

export async function getTopics(subjectId: string) {
  const { data, error } = await supabase
    .from("topics")
    .select(
      "id, subject_id, parent_id, name, description, difficulty, estimated_minutes, display_order",
    )
    .eq("subject_id", subjectId)
    .order("display_order");

  if (error) {
    throw new Error(`Failed to load topics: ${error.message}`);
  }

  return data;
}
