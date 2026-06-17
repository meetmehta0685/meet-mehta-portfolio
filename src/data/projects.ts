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
  caseStudy: {
    overview: string;
    problem: string;
    research: string;
    architecture: string;
    solution: string;
    challenges: string;
    results: string;
    lessonsLearned: string;
  };
}

export const projects: Project[] = [
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
    caseStudy: {
      overview: "The Hospital Queue Management System is a real-time, event-driven clinic orchestration platform. It replaces outdated physical whiteboards and tokens with a highly synchronized web system that keeps patients, receptionist staff, and consulting doctors in lockstep regarding appointment sequences and wait estimates.",
      problem: "Medium-scale clinics and emergency triages frequently experience chaotic lobby bottlenecks. Physical clipboards and static displays fail to update when doctors run behind or emergency triage changes priority. Patients are left with zero status visibility, and receptionist staff are constantly interrupted by questions about estimated wait times.",
      research: "After spending a day shadowing medical receptionists, we realized that manual coordination was their primary workflow obstacle. Patient anxiety peaked when they could not visualize their position in the queue. Thus, our system needed to fulfill two design criteria: one-tap triage overrides for staff, and an auto-updating, high-visibility lobby display that needs no manual user refresh.",
      architecture: "The application relies on PostgreSQL row triggers on Supabase. Whenever a patient status or sequence number changes in the database, Supabase broadcasts a JSON patch via WebSockets to all connected clients. The frontend runs a lightweight client-side state machine that recalculates estimated wait times dynamically based on average consultation durations per department.",
      solution: "We developed a distraction-free, Swiss-inspired user interface. Receptionists use a high-throughput dashboard to quickly drag-and-drop patient slots. Doctors view a minimal heads-up display showcasing the current patient, patient history notes, and a 'Next Patient' summon button. The public lobby operates on a high-contrast, large-font dashboard designed for legibility from 15 meters away.",
      challenges: "WebSockets can disconnect on hospital Wi-Fi when clients roam between access points. If a public display tablet drops offline, displaying stale queue data is unacceptable. We built an active client heartbeat monitor: if the server connection fails to ping for more than 5 seconds, the UI gracefully displays a clear offline indicator and automatically attempts back-off reconnection.",
      results: "Implemented as a prototype pilot in a local specialty clinic, the platform successfully coordinated peak queues of 40+ concurrent patients. It achieved a 35% reduction in average wait times through automated sequence optimizations and completely eliminated verbal wait-time inquiries at the front desk.",
      lessonsLearned: "Real-time state synchronization requires single-source-of-truth validation at the database level. Implementing optimistic client-side updates is excellent for speed, but the database must enforce transaction ordering to prevent two doctors from claiming the same patient slot under high network load."
    }
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
    caseStudy: {
      overview: "Harvest Relay is a logistics mapping and resource redistribution platform designed to bridge the gap between food surplus (restaurants, catering halls) and food insecurity (non-profits, shelters). It optimizes the volunteer courier pipeline using proximity algorithms to ensure food reaches kitchens before spoilage.",
      problem: "Traditional food banks are equipped for non-perishable canned goods, but fail to capture fresh restaurant surplus. Because fresh food spoils within hours, a decentralized, instant dispatcher is required to match donor kitchens with nearby volunteers who can transport meals immediately.",
      research: "We surveyed 12 local food donors and volunteers. Donors explained that any process taking more than 30 seconds to log food would prevent them from participating. Volunteers required clear turn-by-turn coordinate paths without switching apps. This led to a design strategy focused on quick-log widgets and nested responsive map cards.",
      architecture: "The backend uses Prisma ORM on PostgreSQL, utilizing geographic bounding box queries (latitude/longitude comparisons) to identify nearby NGOs. When a restaurant posts surplus food, a Server-Sent Event (SSE) loop broadcasts the notification to active volunteers within a 10km radius. Volunteer locations are tracked and updated via browser geolocation.",
      solution: "A mobile-first dashboard divided into clean, focused tabs. Donors have a single-screen form with pre-sets for meal quantities. Volunteers receive route overlays directly on Leaflet maps. Administrators get an overview panel tracking successful deliveries, volunteer times, and aggregate weight metrics.",
      challenges: "Volunteer drop-outs can leave food sitting indefinitely. If a volunteer accepts a pickup request but gets delayed or closes the app, the food might spoil. We implemented a database lease mechanism: when a driver accepts a pickup, they obtain a 20-minute lease. If their coordinates do not update towards the destination within that frame, the lease expires and the pickup is re-broadcasted.",
      results: "During the initial test weeks, the application successfully coordinated the redistribution of over 450kg of hot, nutritious meals. The average dispatch-to-delivery loop completed in 32 minutes, well within food safety regulations.",
      lessonsLearned: "Spatial logistics demand heavy database optimizations. Standard lat/lng index lookups cause queries to slow down exponentially as row counts grow. We learned to pre-cluster active nodes into grid coordinates, reducing the database search space before running fine-grained distance calculations."
    }
  }
];
