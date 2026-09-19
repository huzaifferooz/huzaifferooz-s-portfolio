// All copy lives here. Edit this file to change the site.
import type { IconName } from "@/components/icons";

export const SITE = {
  name: "Huzaif Ferooz",
  role: "BCA Student",
  tagline: "Learning and building software at GDC Pulwama",
  email: "huzaifibniferooz@gmail.com",
  github: "https://github.com/huzaifferooz", // set to "" to hide the link
  // Put a photo in /public and set e.g. "/avatar.jpg" to replace the illustrated avatar
  avatar: null as string | null,
};

// Text for the About section
export const ABOUT = {
  intro:
    "I'm a BCA student at Govt. Degree College Pulwama (GDC Pulwama). I'm learning to build software with C, Python and Node.js, and working on Red Pulse Kashmir, a home healthcare platform.",
};

export type Project = {
  id: string;
  title: string;
  kind: string;
  status?: string; // shows a pulsing badge, e.g. "In development"
  blurb: string;
  tags: string[];
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    id: "redpulse",
    title: "Red Pulse Kashmir",
    kind: "Healthcare platform",
    status: "In development",
    blurb:
      "A location-based emergency home healthcare platform for the Kashmir region. The product requirements document is written and the platform is being built.",
    tags: ["Healthcare", "Location-based", "Kashmir"],
    accent: "#ff3b4e",
  },
];

export const SKILLS: {
  title: string;
  short: string;
  detail: string;
  icon: IconName;
  color: string;
}[] = [
  { title: "C Programming", short: "C", detail: "Programming fundamentals, logic and problem solving.", icon: "chip", color: "#8b5cff" },
  { title: "Python", short: "Python", detail: "Scripts, small utilities and problem solving.", icon: "terminal", color: "#22e1ff" },
  { title: "Java", short: "Java", detail: "Object-oriented programming basics.", icon: "code", color: "#ffb020" },
  { title: "JavaScript", short: "JavaScript", detail: "Making web pages interactive.", icon: "braces", color: "#ffd84d" },
  { title: "Node.js", short: "Node.js", detail: "Server-side JavaScript and building backends.", icon: "server", color: "#4ade80" },
  { title: "HTML & CSS", short: "HTML & CSS", detail: "Building and styling web pages.", icon: "globe", color: "#ff3d9a" },
  { title: "SQL & DBMS", short: "SQL & DBMS", detail: "Relational databases and writing SQL queries.", icon: "database", color: "#22e1ff" },
  { title: "Git & GitHub", short: "Git & GitHub", detail: "Version control and sharing code.", icon: "branch", color: "#8b5cff" },
  { title: "Android & Custom ROMs", short: "Android ROMs", detail: "LineageOS builds and kernel work on Android devices.", icon: "android", color: "#ff3b4e" },
];

export type Achievement = {
  title: string;
  body: string;
  icon: IconName;
  year?: string;
};

// The milestones shown on the right side of the About section
export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "BCA at Govt. Degree College Pulwama",
    body: "Studying the Bachelor of Computer Applications under the NEP curriculum at the University of Kashmir.",
    icon: "cap",
  },
  {
    title: "Programming in C and Python",
    body: "Learning core programming: logic, problem solving and writing clean code.",
    icon: "terminal",
  },
  {
    title: "Database Management Systems",
    body: "Working with relational databases, SQL and database design.",
    icon: "database",
  },
  {
    title: "Digital Technology Solutions",
    body: "Studying how digital tools and technology solve practical problems.",
    icon: "globe",
  },
  {
    title: "Red Pulse Kashmir",
    body: "Building an emergency home healthcare platform for Kashmir. Currently in development.",
    icon: "pulse",
  },
];
