import { projects, type CodeProject, type LiveProject, type Project } from "./projects";
import { certifications, education, internship } from "./profile";

// The front page is one shelf of tiles. A tile either opens a project or
// states one fact about Meet; the shelf filter reads `shelf` and nothing else.
export type Shelf = "products" | "systems" | "me";

export type Tile =
  | { id: string; shelf: "products"; kind: "screen"; view: "desktop" | "phone"; project: LiveProject }
  | { id: string; shelf: "systems"; kind: "code"; project: CodeProject }
  | { id: string; shelf: "me"; kind: "portrait"; src: string; alt: string; width: number; height: number }
  | { id: string; shelf: "me"; kind: "fact"; figure: string; title: string; lines: string[] };

export type Filter = "all" | Shelf;

export const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "products", label: "Products" },
  { id: "systems", label: "Systems" },
  { id: "me", label: "About" },
];

const bySlug = (slug: string) => projects.find((project) => project.slug === slug)!;
const live = (slug: string) => bySlug(slug) as LiveProject;
const code = (slug: string) => bySlug(slug) as CodeProject;

const screen = (slug: string, view: "desktop" | "phone"): Tile => ({ id: `${slug}-${view}`, shelf: "products", kind: "screen", view, project: live(slug) });
const source = (slug: string): Tile => ({ id: `${slug}-code`, shelf: "systems", kind: "code", project: code(slug) });

export const tiles: Tile[] = [
  screen("preproom", "desktop"),
  screen("harvest-relay", "phone"),
  source("go-reverse-proxy"),
  { id: "portrait-booth", shelf: "me", kind: "portrait", src: "/me/booth.jpg", alt: "Meet Mehta smiling in a restaurant booth", width: 1800, height: 2400 },
  screen("ieltsprep-ai", "desktop"),
  { id: "fact-internship", shelf: "me", kind: "fact", figure: "Appendo", title: internship.role, lines: [`${internship.when}, ${internship.where}`, "Built a placement portal for SVIT with Hono, Supabase, and Prisma."] },
  screen("aurum-qms", "phone"),
  screen("harvest-relay", "desktop"),
  source("clipsync"),
  screen("preproom", "phone"),
  { id: "fact-education", shelf: "me", kind: "fact", figure: education.cgpa, title: `${education.degree}, ${education.school}`, lines: [`${education.years}, cumulative grade point average`] },
  screen("aurum-qms", "desktop"),
  { id: "portrait-evening", shelf: "me", kind: "portrait", src: "/me/evening.jpg", alt: "Meet Mehta outdoors in the evening, in a white shirt", width: 768, height: 1024 },
  screen("ieltsprep-ai", "phone"),
  { id: "fact-aws", shelf: "me", kind: "fact", figure: "AWS ×3", title: "AWS Academy credentials", lines: certifications.map((cert) => cert.title.replace("AWS Academy ", "")) },
];

export const projectOf = (tile: Tile): Project | undefined => ("project" in tile ? tile.project : undefined);
