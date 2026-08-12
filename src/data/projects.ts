export interface Project {
  slug: string;
  title: string;
  summary: string;
  keyAchievements: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

export const projects: Project[] = [
  {
    slug: "harvest-relay",
    title: "Harvest Relay — Food Redistribution Platform",
    summary: "A role-based food-rescue workflow connecting donors, NGOs, and volunteers through matching, dispatch, and end-to-end delivery tracking.",
    keyAchievements: [
      "Engineered top-three nearest-NGO matching, a first-acceptance flow, and end-to-end delivery tracking.",
      "Built time-sensitive volunteer dispatch with expiring offers, automatic reassignment, OTP verification, GPS ingestion, and geofenced arrival automation.",
      "Implemented real-time donor and NGO tracking with map milestones, immutable handoff timelines, in-app notifications, and Ably updates backed by database retry delivery."
    ],
    technologies: ["Next.js", "Prisma", "Neon", "Auth.js", "MapLibre", "Ably"],
    githubUrl: "https://github.com/meetmehta0685/food-ngo",
    liveUrl: "https://food-ngo-beta.vercel.app"
  },
  {
    slug: "ieltsprep-ai",
    title: "IELTSPrep AI",
    summary: "A full-stack IELTS preparation platform with authenticated speaking, writing, reading, and listening workflows, session history, and module analytics.",
    keyAchievements: [
      "Integrated streamed OpenRouter LLM evaluation for essays and speaking responses with grammar, vocabulary, band-score feedback, and a personalized study planner.",
      "Built a real-time voice examiner using LiveKit and Groq Whisper transcription.",
      "Persisted submissions, session history, and analytics in Supabase."
    ],
    technologies: ["Next.js", "Express", "TypeScript", "Supabase", "OpenRouter", "Groq", "LiveKit"],
    githubUrl: "https://github.com/meetmehta0685/ielts-platform",
    liveUrl: "https://ieltsprep-ai.vercel.app"
  },
  {
    slug: "aurum-qms",
    title: "AURUM QMS — Clinical Operations Platform",
    summary: "A role-aware clinical operations platform spanning appointments, real-time queues, records, diagnostics, prescriptions, and connected care workflows.",
    keyAchievements: [
      "Built workflows for patients, doctors, admins, laboratory technicians, and pharmacy staff.",
      "Connected laboratory orders and reports, pharmacy fulfillment, and discharge workflows, including authenticated downloadable PDFs combining diagnosis, notes, lab reports, medicines, and status.",
      "Implemented shared Supabase-backed access control and operational state across clinical and hospitality workflows, including reservations, rooms, allocations, and guest requests."
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "shadcn/ui", "pdf-lib"],
    githubUrl: "https://github.com/meetmehta0685/AurumQMS",
    liveUrl: "https://aurum-qms.vercel.app"
  }
];
