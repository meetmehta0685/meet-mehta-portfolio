export interface Project {
  slug: string;
  title: string;
  year: string;
  summary: string;
  problemSolved: string;
  keyAchievements: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  terminalSubtitle?: string;
  terminalMetrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "ieltsprep-ai",
    title: "Ieltsprep-ai",
    year: "2026",
    summary: "Built and deployed a full-stack AI IELTS preparation platform covering all four IELTS modules – speaking, writing, reading, and listening.",
    problemSolved: "IELTS preparation platforms are either expensive or lack instant, line-by-line grading and speech pronunciation feedback, making self-study inefficient.",
    keyAchievements: [
      "Built and deployed a full-stack AI IELTS preparation platform covering all four IELTS modules – speaking, writing, reading, and listening – with instant feedback mapped to official grading criteria.",
      "Integrated Groq Whisper for real-time speech transcription and pronunciation analysis, and OpenRouter LLMs for line-by-line writing feedback, grammar correction, and vocabulary suggestions.",
      "Implemented user authentication and a personal analytics dashboard tracking band-score progression, task completion, and feedback history across practice sessions."
    ],
    technologies: ["Node.js", "Express", "Next.js", "OpenRouter", "Groq Whisper"],
    metrics: [
      { label: "Speech Latency", value: "<1.2s" },
      { label: "AI Grading Accuracy", value: "94%" },
      { label: "Modules Covered", value: "4 Modules" }
    ],
    githubUrl: "https://github.com/meetmehta0685/ielts-platform",
    liveUrl: "https://ieltsprep-ai.vercel.app",
    terminalSubtitle: "Speech & LLM Inference Pipeline",
    terminalMetrics: [
      { label: "Active Practice Logs", value: "128" },
      { label: "Response Latency", value: "<1.2s" }
    ]
  },
  {
    slug: "hospital-qms",
    title: "Hospital Queue Management System",
    year: "2026",
    summary: "Real-time clinical waitlist queue with instant state sync and role-based views.",
    problemSolved: "Traditional clinic waiting lists rely on physical logs and manual updates, leading to crowded waiting rooms, patient anxiety, and receptionist burnout due to status inquiries.",
    keyAchievements: [
      "Designed and deployed a serverless state synchronization engine that broadcasts queue adjustments instantly.",
      "Built multi-perspective dashboards optimized for receptionist operations, doctor consultations, and public display boards.",
      "Incorporated client-side dynamic prescription printing and triage slip generation using pdf-lib."
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "pdf-lib"],
    metrics: [
      { label: "Sync Latency", value: "<50ms" },
      { label: "Active Capacity", value: "42 Patients" },
      { label: "Wait-Time Reduction", value: "35%" }
    ],
    githubUrl: "https://github.com/meetmehta0685/AurumQMS",
    liveUrl: "https://aurum-qms.vercel.app",
    terminalSubtitle: "Realtime State Synchronization",
    terminalMetrics: [
      { label: "Active Patients", value: "42" },
      { label: "Refresh", value: "50ms" }
    ]
  },
  {
    slug: "harvest-relay",
    title: "Harvest Relay — Food Redistribution",
    year: "2025",
    summary: "Surplus food logistics network powered by geographic proximity matching.",
    problemSolved: "Commercial kitchens discard surplus edible food daily, while local shelter networks remain undersupplied, primarily due to coordinate and transit communication lag.",
    keyAchievements: [
      "Engineered a geographic proximity matching query system to link donors and volunteers within a 10km radius.",
      "Developed secure, JWT-authenticated workflows for donors, volunteer drivers, and charity administrators.",
      "Integrated live maps with Leaflet and OpenStreetMap for routing coordination without expensive API costs."
    ],
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Leaflet", "JWT"],
    metrics: [
      { label: "NGO Node Limit", value: "18+ Centers" },
      { label: "Pickup Match Time", value: "<3 mins" },
      { label: "Food Redistributed", value: "450+ kg" }
    ],
    githubUrl: "https://github.com/meetmehta0685/food-ngo",
    liveUrl: "https://food-ngo-beta.vercel.app",
    terminalSubtitle: "Geolocation Proximity Engine",
    terminalMetrics: [
      { label: "NGO Nodes", value: "18" },
      { label: "Active Donors", value: "8" }
    ]
  }
];

