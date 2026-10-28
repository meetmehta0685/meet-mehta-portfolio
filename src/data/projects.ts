// Each project's colours come from its own live interface, so its chapter
// on the portfolio reads as a continuation of the product.
export interface ProjectTheme {
  field: string;
  ink: string;
  soft: string;
  accent: string;
}

interface ProjectBase {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  keyAchievements: string[];
  technologies: string[];
  theme: ProjectTheme;
}

// A live project is shown through captures of its running site. A code
// project has no site to capture, so it is shown through a verbatim excerpt
// of its public source.
export interface LiveProject extends ProjectBase {
  evidence: "live";
  liveUrl: string;
  githubUrl?: string;
}

export interface CodeProject extends ProjectBase {
  evidence: "code";
  githubUrl: string;
  excerpt: { path: string; source: string; caption: string };
}

export type Project = LiveProject | CodeProject;

export const homeOf = (project: Project) => (project.evidence === "live" ? project.liveUrl : project.githubUrl);

export const addressOf = (project: Project) => {
  const url = new URL(homeOf(project));
  return project.evidence === "live" ? url.host : `${url.host}${url.pathname}`;
};

export const sourceFileOf = (project: CodeProject) => `${project.githubUrl}/blob/HEAD/${project.excerpt.path}`;

export const shotsOf = (project: LiveProject) => ({
  desktop: `/work/${project.slug}-desktop.jpg`,
  mobile: `/work/${project.slug}-mobile.jpg`,
  loop: `/work/${project.slug}.webm`,
});

export const projects: Project[] = [
  {
    slug: "preproom",
    name: "PrepRoom",
    kind: "AI mock interview platform",
    summary: "An adaptive mock-interview platform that builds five-question sessions around a candidate's resume, target role, interview track, experience level, prior answers, and submitted code.",
    keyAchievements: [
      "Integrated Groq-powered evaluation and Whisper transcription for tailored interview feedback.",
      "Added Monaco coding, LiveKit rooms, Neon and Prisma data storage, and owner-only PDF reports."
    ],
    technologies: ["Next.js", "TypeScript", "Groq", "LiveKit", "Prisma", "Neon", "Auth.js"],
    githubUrl: "https://github.com/meetmehta0685/PrepRoom",
    evidence: "live",
    liveUrl: "https://prepwithpeers.vercel.app",
    theme: { field: "#dfe5fc", ink: "#10142a", soft: "#3d4566", accent: "#2243d6" }
  },
  {
    slug: "harvest-relay",
    name: "Harvest Relay",
    kind: "Food redistribution platform",
    summary: "A role-based food-rescue workflow connecting donors, NGOs, and volunteers through matching, dispatch, and end-to-end delivery tracking.",
    keyAchievements: [
      "Engineered top-three nearest-NGO matching, a first-acceptance flow, and end-to-end delivery tracking.",
      "Built time-sensitive volunteer dispatch with expiring offers, automatic reassignment, OTP verification, GPS ingestion, and geofenced arrival automation.",
      "Implemented real-time donor and NGO tracking with map milestones, immutable handoff timelines, in-app notifications, and Ably updates backed by database retry delivery."
    ],
    technologies: ["Next.js", "Prisma", "Neon", "Auth.js", "MapLibre", "Ably"],
    githubUrl: "https://github.com/meetmehta0685/food-ngo",
    evidence: "live",
    liveUrl: "https://food-ngo-beta.vercel.app",
    theme: { field: "#2a130e", ink: "#f2f2f0", soft: "#d6bfb2", accent: "#ff6b5a" }
  },
  {
    slug: "ieltsprep-ai",
    name: "IELTS Prep",
    kind: "IELTS preparation platform",
    summary: "Timed practice for all four IELTS papers and a full mock exam, with every answer marked by AI against the official band descriptors, a mentor chat, a study planner, and a live voice examiner.",
    keyAchievements: [
      "Built timed Listening, Reading, Writing, and Speaking practice and a full mock exam that ends in a consolidated Test Report Form, with official band conversion and saved attempt history.",
      "Routed marking, mentor chat, and study plans through a provider chain of three Groq models and then OpenRouter under one deadline, streaming results over Server-Sent Events, and filtered Whisper silence hallucinations out of spoken answers.",
      "Ran the three-part speaking interview as a LiveKit Agents worker, and scoped every learner's data with Supabase Auth, Google sign-in, and Row Level Security."
    ],
    technologies: ["Next.js", "Express", "TypeScript", "Supabase", "Groq", "OpenRouter", "LiveKit"],
    githubUrl: "https://github.com/meetmehta0685/ielts-platform",
    evidence: "live",
    liveUrl: "https://ieltsprep-ai.vercel.app",
    theme: { field: "#f3f3f5", ink: "#0c0c12", soft: "#62626d", accent: "#3452ff" }
  },
  {
    slug: "aurum-qms",
    name: "AURUM QMS",
    kind: "Clinical operations platform",
    summary: "A role-aware clinical operations platform spanning appointments, real-time queues, records, diagnostics, prescriptions, and connected care workflows.",
    keyAchievements: [
      "Built workflows for patients, doctors, admins, laboratory technicians, and pharmacy staff.",
      "Connected laboratory orders and reports, pharmacy fulfillment, and discharge workflows, including authenticated downloadable PDFs combining diagnosis, notes, lab reports, medicines, and status.",
      "Implemented shared Supabase-backed access control and operational state across clinical and hospitality workflows, including reservations, rooms, allocations, and guest requests."
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "shadcn/ui", "pdf-lib"],
    githubUrl: "https://github.com/meetmehta0685/AurumQMS",
    evidence: "live",
    liveUrl: "https://aurum-qms.vercel.app",
    theme: { field: "#c4ead9", ink: "#0d2219", soft: "#2f5144", accent: "#0f7a58" }
  },
  {
    slug: "go-reverse-proxy",
    name: "Go Reverse Proxy",
    kind: "HTTP reverse proxy in Go",
    summary: "A standard-library HTTP reverse proxy with configurable upstream timeouts, connection pooling, graceful shutdown, rate limiting, a circuit breaker, and Prometheus metrics.",
    keyAchievements: [
      "Built a standard-library HTTP reverse proxy with configurable upstream timeouts, connection pooling, graceful shutdown, and request-ID-based JSON logs.",
      "Added a process-local fixed-window rate limiter, a half-open circuit breaker, and health and Prometheus metrics endpoints; covered forwarding and failure paths with race-tested Go tests."
    ],
    technologies: ["Go", "net/http", "Prometheus"],
    evidence: "code",
    githubUrl: "https://github.com/meetmehta0685/ReverseProxy",
    excerpt: {
      path: "internal/proxy/circuit_breaker.go",
      source: "func (b *circuitBreaker) acquire() (breakerPermit, bool) {\n\tb.mu.Lock()\n\tdefer b.mu.Unlock()\n\n\tswitch b.state {\n\tcase circuitClosed:\n\t\treturn breakerPermit{generation: b.generation}, true\n\tcase circuitOpen:\n\t\tif b.now().Sub(b.openedAt) < b.cooldown {\n\t\t\treturn breakerPermit{}, false\n\t\t}\n\t\t// Admit exactly one probe after the cooldown. Other callers wait for\n\t\t// the probe's result instead of stampeding the recovering backend.\n\t\tb.state = circuitHalfOpen\n\t\tb.generation++\n\t\treturn breakerPermit{generation: b.generation}, true\n\tcase circuitHalfOpen:\n\t\treturn breakerPermit{}, false\n\tdefault:\n\t\treturn breakerPermit{}, false\n\t}\n}\n",
      caption: "After the cooldown, the half-open breaker admits exactly one probe. Every other request waits for that probe's result instead of stampeding the recovering backend."
    },
    theme: { field: "#08262e", ink: "#eaf6f8", soft: "#9cc3cc", accent: "#00add8" }
  },
  {
    slug: "clipsync",
    name: "ClipSync",
    kind: "End-to-end encrypted clipboard sync",
    summary: "A cross-device clipboard sync tool: a Go daemon syncs text, images, and files between laptops in about a second, with a Next.js PWA for phones and a self-hosted WebSocket relay.",
    keyAchievements: [
      "Encrypted clips end to end with XChaCha20-Poly1305 over authenticated headers and derived relay rooms and tokens with HKDF, so the relay stores only ciphertext; paired devices with a one-time QR code.",
      "Connected laptops on the same network directly over Noise IK with mDNS discovery alongside the relay, deduplicating clips across paths and ordering them with Lamport clocks so every device converges.",
      "Chunked large images into 256 KiB pieces with re-requests for lost chunks, resumed offline devices from relay sequence numbers, and covered sync with race-tested Go tests on simulated lossy networks."
    ],
    technologies: ["Go", "WebSockets", "Noise", "mDNS", "SQLite", "Next.js", "Docker"],
    evidence: "code",
    githubUrl: "https://github.com/meetmehta0685/Clipboard-Sync",
    excerpt: {
      path: "internal/protocol/lamport.go",
      source: "// Observe merges a remote timestamp so the next Tick is later than it.\nfunc (l *Lamport) Observe(remote uint64) {\n\tl.mu.Lock()\n\tdefer l.mu.Unlock()\n\tif remote > l.t {\n\t\tl.t = remote\n\t}\n}\n\n// Stamp is a total order over clips: Lamport time, then origin device ID.\ntype Stamp struct {\n\tClock  uint64\n\tOrigin string\n}\n\n// After reports whether s wins over o. The zero Stamp loses to everything.\nfunc (s Stamp) After(o Stamp) bool {\n\tif s.Clock != o.Clock {\n\t\treturn s.Clock > o.Clock\n\t}\n\treturn s.Origin > o.Origin\n}\n",
      caption: "Clips are ordered by Lamport time, then by origin device, so two devices that copy at the same moment still agree on which clip wins."
    },
    theme: { field: "#e2e8ef", ink: "#16295f", soft: "#46578f", accent: "#b8232f" }
  }
];

export const liveProjects = projects.filter((project): project is LiveProject => project.evidence === "live");
