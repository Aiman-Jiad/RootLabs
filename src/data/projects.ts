import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "java-calculator",
    title: "Java Console Calculator",
    description:
      "Build a command-line calculator that accepts user input and performs basic arithmetic operations.",
    difficulty: "beginner",
    estimatedHours: 2,
    technologies: ["Java"],
    skills: [
      "Variables",
      "Scanner",
      "Conditionals",
      "Methods",
      "Arithmetic operators",
    ],
    topicIds: [
      "java-basics",
      "java-input-output",
      "java-conditionals",
    ],
  },
  {
    id: "student-grade-manager",
    title: "Student Grade Manager",
    description:
      "Create a Java application that accepts student marks, calculates grades and displays useful statistics.",
    difficulty: "beginner",
    estimatedHours: 4,
    technologies: ["Java"],
    skills: [
      "Arrays",
      "Loops",
      "Conditionals",
      "Methods",
      "Basic problem solving",
    ],
    topicIds: [
      "java-basics",
      "java-input-output",
      "java-conditionals",
      "java-loops",
    ],
  },
  {
    id: "personal-portfolio",
    title: "Personal Developer Portfolio",
    description:
      "Build a responsive personal portfolio website showcasing your skills, projects, education and contact information.",
    difficulty: "beginner",
    estimatedHours: 6,
    technologies: ["HTML", "CSS", "JavaScript"],
    skills: [
      "Web development",
      "Responsive design",
      "UI structure",
      "CSS layout",
      "Deployment",
    ],
    topicIds: [],
  },
  {
    id: "study-dashboard",
    title: "Study Progress Dashboard",
    description:
      "Build a dashboard where students can track subjects, completed topics and overall study progress.",
    difficulty: "intermediate",
    estimatedHours: 10,
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    skills: [
      "React",
      "Component design",
      "State management",
      "Data visualization",
      "UI/UX",
    ],
    topicIds: [],
  },
  {
    id: "leetcode-tracker",
    title: "LeetCode Progress Tracker",
    description:
      "Create a developer dashboard for tracking solved problems, difficulty levels, topics and personal progress.",
    difficulty: "intermediate",
    estimatedHours: 12,
    technologies: ["React", "TypeScript", "API", "SQL"],
    skills: [
      "API integration",
      "Data modeling",
      "State management",
      "SQL",
      "Dashboard design",
    ],
    topicIds: [],
  },
  {
    id: "local-ai-study-assistant",
    title: "Local AI Study Assistant",
    description:
      "Build a desktop or web-based study assistant powered by a locally running language model.",
    difficulty: "advanced",
    estimatedHours: 30,
    technologies: ["React", "TypeScript", "Ollama", "Python"],
    skills: [
      "AI integration",
      "Local LLMs",
      "API design",
      "Prompt engineering",
      "Application architecture",
    ],
    topicIds: [],
  },
];
