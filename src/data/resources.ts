import type { Resource } from "@/types/resource";

export const resources: Resource[] = [
  {
    id: "java-dev-guide",
    title: "Java Documentation",
    description:
      "Official Java documentation covering the language, APIs and core concepts.",
    type: "documentation",
    url: "https://docs.oracle.com/en/java/",
    provider: "Oracle",
    topicId: "java-basics",
    difficulty: "beginner",
    free: true,
  },
  {
    id: "java-learn",
    title: "Learn Java",
    description:
      "Official learning resources for getting started with Java programming.",
    type: "course",
    url: "https://dev.java/learn/",
    provider: "dev.java",
    topicId: "java-basics",
    difficulty: "beginner",
    free: true,
  },
  {
    id: "java-input-output",
    title: "Java I/O Documentation",
    description:
      "Explore Java's input and output APIs and related concepts.",
    type: "documentation",
    url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/package-summary.html",
    provider: "Oracle",
    topicId: "java-input-output",
    difficulty: "beginner",
    free: true,
  },
  {
    id: "java-conditionals",
    title: "The Java Tutorials",
    description:
      "Official Java tutorials covering language fundamentals and control flow.",
    type: "documentation",
    url: "https://dev.java/learn/",
    provider: "dev.java",
    topicId: "java-conditionals",
    difficulty: "beginner",
    free: true,
  },
  {
    id: "java-loops",
    title: "Java Language Basics",
    description:
      "Learn Java fundamentals including control flow and loops.",
    type: "documentation",
    url: "https://dev.java/learn/language-basics/",
    provider: "dev.java",
    topicId: "java-loops",
    difficulty: "beginner",
    free: true,
  },
  {
    id: "leetcode",
    title: "LeetCode",
    description:
      "Practice programming and data structures through coding problems.",
    type: "practice",
    url: "https://leetcode.com/",
    provider: "LeetCode",
    difficulty: "beginner",
    free: true,
  },
];
