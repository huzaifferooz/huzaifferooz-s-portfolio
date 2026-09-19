// All copy lives here. Edit this file to change the site.

export const SITE = {
  name: "Huzaif Ferooz",
  role: "Software Developer",
  tagline: "Building the Future of Esports & Tech",
  // TODO: replace with your real address
  email: "hello@example.com",
  // Put a photo in /public and set e.g. "/avatar.jpg" to replace the illustrated avatar
  avatar: null as string | null,
};

export type ProjectId = "scrimmed" | "shockshield" | "roms" | "zelta";

export type Project = {
  id: ProjectId;
  title: string;
  kind: string;
  blurb: string;
  tags: string[];
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    id: "scrimmed",
    title: "Scrimmed",
    kind: "Mobile app",
    blurb:
      "A professional networking app for esports players. Build a player profile, find teammates and get found by squads.",
    tags: ["Mobile", "Networking", "Esports"],
    accent: "#8b5cff",
  },
  {
    id: "shockshield",
    title: "ShockShield",
    kind: "Hardware and IoT",
    blurb:
      "A smart home wiring safety system that detects electrical faults and isolates the affected circuit.",
    tags: ["IoT", "Embedded", "Safety"],
    accent: "#ffb020",
  },
  {
    id: "roms",
    title: "Custom Android ROMs",
    kind: "Operating systems",
    blurb:
      "Performance tuning, kernel modifications and custom OS builds for competitive gaming. Built on the Redmi Note 10S and OnePlus 7T.",
    tags: ["LineageOS", "Kernel", "Performance"],
    accent: "#22e1ff",
  },
  {
    id: "zelta",
    title: "ZELTA OG Branding",
    kind: "Video and brand design",
    blurb:
      "High-end video editing, channel logos and branding assets for ZELTA OG.",
    tags: ["Video editing", "Logo design", "Branding"],
    accent: "#ff3d9a",
  },
];

// Swap `src` for real images to replace the placeholder tiles in the ZELTA gallery
export const ZELTA_MEDIA: { label: string; src?: string }[] = [
  { label: "Channel logo" },
  { label: "Thumbnail" },
  { label: "Banner" },
  { label: "Edit timeline" },
];

export type SkillIconName = "code" | "android" | "pen" | "film";

export const SKILLS: {
  title: string;
  short: string;
  detail: string;
  icon: SkillIconName;
  color: string;
}[] = [
  {
    title: "C Programming & Software Architecture",
    short: "C & Architecture",
    detail: "Performance-minded code with clean structure behind it.",
    icon: "code",
    color: "#8b5cff",
  },
  {
    title: "Android OS / Custom ROM Development",
    short: "Android & ROMs",
    detail:
      "LineageOS builds and kernel work across the Redmi Note 10S and OnePlus 7T.",
    icon: "android",
    color: "#22e1ff",
  },
  {
    title: "UI/UX & Promotional Design",
    short: "UI/UX & Promo",
    detail: "Interfaces, thumbnails and promo assets in one consistent visual language.",
    icon: "pen",
    color: "#ff3d9a",
  },
  {
    title: "Advanced Video Editing",
    short: "Video Editing",
    detail: "Competition-level edits. First place at the Video Editing League 2025.",
    icon: "film",
    color: "#ffb020",
  },
];

export type Achievement = {
  title: string;
  body: string;
  icon: "trophy" | "gamepad" | "chip" | "layers";
  year?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "First-Place Winner: Video Editing League 2025",
    body: "Took first place in the league with a competition edit.",
    icon: "trophy",
    year: "2025",
  },
  {
    title: "Competitive BGMI Player",
    body: "Plays BGMI competitively, which shapes how I build tools for esports players.",
    icon: "gamepad",
  },
  {
    title: "Custom ROM and kernel builder",
    body: "Builds and debugs LineageOS for the Redmi Note 10S and works on kernels for the OnePlus 7T.",
    icon: "chip",
  },
  {
    title: "Software and hardware together",
    body: "Scrimmed on the app side, ShockShield on the wiring side, with the operating system in between.",
    icon: "layers",
  },
];
