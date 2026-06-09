"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Cpu, Network, CheckCircle, HelpCircle } from "lucide-react";
import { GithubIcon } from "@/app/components/Icons";
import { Project, projects } from "@/data/projects";
import { motion } from "framer-motion";

export default function ProjectCaseStudyClient({ project }: { project: Project }) {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 flex flex-col font-mono">
      {/* MINIMAL HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border-custom h-[56px] flex items-center">
        <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-xs tracking-wider font-semibold hover:text-accent transition-editorial flex items-center gap-2">
            <ArrowLeft size={14} /> BACK TO INDEX
          </Link>
          <div className="text-[11px] text-muted uppercase tracking-[0.15em] font-medium hidden sm:block">
            {project.title} / CASE STUDY
          </div>
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-editorial"
              title="GitHub Repository"
            >
              <GithubIcon size={18} />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-editorial"
                title="Live Demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-5xl mx-auto px-6 pt-28 pb-24 w-full flex flex-col gap-12">
        {/* HERO HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col gap-4 border-b border-border-custom pb-10"
        >
          <div className="text-xs text-accent font-semibold tracking-widest uppercase">
            PROJECT CASE STUDY · {project.year}
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-foreground">
            {project.title}
          </h1>
          <p className="text-lg text-muted max-w-3xl font-light leading-relaxed mt-2">
            {project.summary}
          </p>
        </motion.div>

        {/* INTERACTIVE/VISUAL MOCKUP FOR SCREENSHOT SECTION */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="w-full border border-border-custom bg-[#0E0E0E] text-[#E0DDD8] overflow-hidden flex flex-col font-mono text-xs rounded-none shadow-sm"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-custom/20 bg-[#161616]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E74C3C]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F39C12]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
              <span className="ml-2 text-[10px] text-muted tracking-wider uppercase font-semibold">
                SYSTEM CORE VISUALIZATION // {project.slug}.sys
              </span>
            </div>
            <span className="text-[10px] text-accent font-bold px-2 py-0.5 border border-accent/20 bg-accent/5">
              ACTIVE
            </span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6 select-none min-h-[260px] justify-center">
            {project.slug === "hospital-qms" ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-border-custom/20 bg-[#181818] p-3 flex flex-col justify-between">
                    <span className="text-[10px] text-muted">TRIAGE UNIT A</span>
                    <span className="text-2xl font-serif text-[#0E0E0E] text-white font-bold mt-2">P-104</span>
                    <span className="text-[9px] text-[#2ECC71] mt-1">&gt; Called to Room 4</span>
                  </div>
                  <div className="border border-border-custom/20 bg-[#181818] p-3 flex flex-col justify-between">
                    <span className="text-[10px] text-muted">WAITING LOGS</span>
                    <span className="text-2xl font-serif text-[#0E0E0E] text-white font-bold mt-2">14 Min</span>
                    <span className="text-[9px] text-muted mt-1">&gt; Est. Avg Wait</span>
                  </div>
                  <div className="border border-border-custom/20 bg-[#181818] p-3 flex flex-col justify-between">
                    <span className="text-[10px] text-muted">SERVER WORKERS</span>
                    <span className="text-2xl font-serif text-accent font-bold mt-2">100%</span>
                    <span className="text-[9px] text-accent mt-1">&gt; Socket Sync Active</span>
                  </div>
                </div>

                <div className="border border-border-custom/20 bg-[#181818] p-4 text-[10px] text-muted">
                  <div className="flex justify-between text-[#E0DDD8] font-bold border-b border-border-custom/10 pb-1.5 mb-1.5">
                    <span>TOKEN ID</span>
                    <span>DEPARTMENT</span>
                    <span>ROOM</span>
                    <span>STATUS</span>
                  </div>
                  <div className="flex justify-between py-1 text-[#2ECC71]">
                    <span>P-104</span>
                    <span>CARDIOLOGY</span>
                    <span>ROOM 4</span>
                    <span>IN CONSULTATION</span>
                  </div>
                  <div className="flex justify-between py-1 text-[#F39C12]">
                    <span>P-105</span>
                    <span>PEDIATRICS</span>
                    <span>ROOM 2</span>
                    <span>SUMMONED (15s)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>P-106</span>
                    <span>GENERAL MEDICINE</span>
                    <span>--</span>
                    <span>WAITING (5m ago)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>P-107</span>
                    <span>ORTHOPEDICS</span>
                    <span>--</span>
                    <span>WAITING (12m ago)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="border border-border-custom/20 bg-[#181818] p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col justify-between">
                    <span className="text-[10px] text-muted">COURIER GPS SEARCH</span>
                    <div className="font-serif text-xl text-white font-bold mt-2">10.0 km Radius</div>
                    <span className="text-[9px] text-accent mt-1">&gt; PostGIS Spatial Indexed</span>
                  </div>
                  <div className="flex items-center justify-center border border-border-custom/10 p-2 bg-[#0E0E0E] aspect-video w-36 h-20 text-[8px] text-muted text-center">
                    [ Leaflet / OSM ]
                    <br />
                    2 active pickups
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] text-muted">
                  <div className="border border-border-custom/20 bg-[#181818] p-3">
                    <div className="text-white font-bold mb-1">PROXIMITY RADAR</div>
                    <div>• Bistro 21 (Donor) &rarr; Hope Shelter (NGO) [2.4 km]</div>
                    <div className="text-[#2ECC71] mt-1">✓ Match found in 42s</div>
                  </div>
                  <div className="border border-border-custom/20 bg-[#181818] p-3">
                    <div className="text-white font-bold mb-1">LEASE LEADERBOARD</div>
                    <div>• Driver #081: Harvest Lease [14m left]</div>
                    <div className="text-[#F39C12] mt-1">! Lease expires in 5m</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* LEFT COLUMN: NARRATIVE (2/3 width) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="md:col-span-2 flex flex-col gap-10 text-[14px] leading-[1.8] text-foreground/90 font-light"
          >
            {/* OVERVIEW */}
            <section className="flex flex-col gap-3">
              <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
                <Cpu size={18} className="text-accent" /> Overview
              </h2>
              <p>{project.caseStudy.overview}</p>
            </section>

            {/* PROBLEM */}
            <section className="flex flex-col gap-3">
              <h2 className="font-serif text-2xl font-bold text-foreground">The Problem</h2>
              <p>{project.caseStudy.problem}</p>
            </section>

            {/* RESEARCH */}
            <section className="flex flex-col gap-3">
              <h2 className="font-serif text-2xl font-bold text-foreground">User Research & Insights</h2>
              <p>{project.caseStudy.research}</p>
            </section>

            {/* ARCHITECTURE */}
            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
                <Network size={18} className="text-accent" /> System Architecture
              </h2>
              <p>{project.caseStudy.architecture}</p>

              {/* ARCHITECTURE ASCII DIAGRAM */}
              <div className="bg-background dark:bg-[#1A1A17] border border-border-custom p-4 font-mono text-[11px] leading-relaxed text-muted overflow-x-auto select-all">
                {project.slug === "hospital-qms" ? (
                  <pre>{`[Patient Check-in] ──> [Reception API] ──> [PostgreSQL Table]
                                                   │
                                          (Trigger Notification)
                                                   │
                                                   ▼
[ LOBBY SCREEN ] <── [WebSockets] <── [Supabase Realtime]`}</pre>
                ) : (
                  <pre>{`[Restaurant Donor] ──> [Prisma API] ──> [PostgreSQL Coordinate Index]
                                                      │
                                           (Spatial Match Bounding Box)
                                                      │
                                                      ▼
[ Volunteer Map ] <── [SSE Broadcast] <── [Logistics Dispatcher]`}</pre>
                )}
              </div>
            </section>

            {/* SOLUTION */}
            <section className="flex flex-col gap-3">
              <h2 className="font-serif text-2xl font-bold text-foreground">The Solution</h2>
              <p>{project.caseStudy.solution}</p>
            </section>

            {/* CHALLENGES */}
            <section className="flex flex-col gap-3">
              <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
                <HelpCircle size={18} className="text-accent" /> Challenges & Mitigations
              </h2>
              <p>{project.caseStudy.challenges}</p>
            </section>

            {/* RESULTS */}
            <section className="flex flex-col gap-3">
              <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
                <CheckCircle size={18} className="text-accent" /> Key Metrics & Results
              </h2>
              <p>{project.caseStudy.results}</p>
            </section>

            {/* LESSONS LEARNED */}
            <section className="flex flex-col gap-3">
              <h2 className="font-serif text-2xl font-bold text-foreground">Lessons Learned</h2>
              <p>{project.caseStudy.lessonsLearned}</p>
            </section>
          </motion.div>

          {/* RIGHT COLUMN: SPECS & SIDEBAR (1/3 width, sticky) */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-8 md:sticky md:top-24 border-l border-border-custom pl-0 md:pl-6 md:col-span-1"
          >
            {/* METRICS */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-wider text-muted font-bold">Project Impact</div>
              <div className="flex flex-col gap-4">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col border-b border-border-custom/50 pb-2">
                    <span className="text-3xl font-serif font-bold text-foreground">{metric.value}</span>
                    <span className="text-[11px] text-muted uppercase mt-0.5 tracking-wider">{metric.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* TECH STACK */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-3">
              <div className="text-xs uppercase tracking-wider text-muted font-bold">Technologies Used</div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] bg-border-custom/30 text-foreground px-2.5 py-1 border border-border-custom/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ACTION LINKS */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-2 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-foreground text-[12px] py-3 bg-foreground text-background transition-all hover:bg-background hover:text-foreground font-semibold"
              >
                <GithubIcon size={14} /> VIEW REPOSITORY
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-border-custom text-[12px] py-3 bg-transparent text-foreground transition-all hover:bg-border-custom/30 font-semibold"
                >
                  <ExternalLink size={14} /> LIVE DEMO
                </a>
              )}
            </motion.div>
          </motion.aside>
        </div>

        {/* BOTTOM NAVIGATION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="border-t border-border-custom pt-12 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <Link href="/" className="text-xs text-muted hover:text-accent font-semibold transition-editorial flex items-center gap-2">
            <ArrowLeft size={14} /> RETURN TO MAIN INDEX
          </Link>
          
          <div className="flex gap-4">
            {projects.map((p) => (
              p.slug !== project.slug && (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="text-xs text-accent font-semibold border-b border-accent/25 hover:border-accent pb-0.5 transition-editorial"
                >
                  NEXT CASE STUDY: {p.title} &rarr;
                </Link>
              )
            ))}
          </div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border-custom py-6 mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted">
          <div>© 2026 Meet Mehta. All rights reserved.</div>
          <div>ADANI UNIVERSITY B.TECH CSE(AI-ML)</div>
        </div>
      </footer>
    </div>
  );
}
