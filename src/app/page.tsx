"use client";

import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import { projects } from "@/data/projects";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  Award,
  CheckCircle,
  Mail,
  MapPin,
  FileText,
  Activity,
  Cpu,
  Phone
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/Icons";

export default function Home() {
  // Editorial fade-up animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 font-mono flex flex-col transition-editorial">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-6 pt-32 pb-24 w-full flex flex-col gap-28">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-10 border-b border-border-custom pb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Title & Description Column */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <motion.div variants={itemVariants} className="flex flex-col select-none uppercase font-sans font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter leading-[0.9]">
                <span className="text-foreground">
                  Hello.
                </span>
                <span className="text-accent">
                  I am
                </span>
                <span className="text-accent">
                  Meet
                </span>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-[15px] font-light text-muted leading-relaxed max-w-[480px] mt-2"
              >
                Full-stack developer focused on building scalable products, AI systems, and thoughtful, robust user experiences.
              </motion.p>

              {/* Status Badge */}
              <motion.div variants={itemVariants} className="flex items-center gap-2 pt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted font-bold font-mono">
                  Available for opportunities
                </span>
              </motion.div>
            </div>

            {/* Photo Column */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <motion.div 
                variants={itemVariants} 
                className="relative overflow-hidden border border-border-custom bg-border-custom/5 aspect-[4/5] flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/portrait.jpg"
                  alt="Meet Mehta Portrait"
                  className="w-full h-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = document.getElementById("portrait-fallback");
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div 
                  id="portrait-fallback" 
                  className="absolute inset-0 hidden flex-col justify-between p-6 bg-border-custom/10 font-mono text-xs select-none"
                >
                  <span className="text-muted">[ portrait.jpg ]</span>
                  <span className="font-serif text-5xl font-bold tracking-tighter text-foreground text-center self-center py-4">
                    MEET
                  </span>
                  <span className="text-muted text-right">Place photo in public/portrait.jpg</span>
                </div>
              </motion.div>
              
              {/* Compact Currently Banner below Photo */}
              <motion.div 
                variants={itemVariants}
                className="border border-border-custom p-4 bg-border-custom/10 text-[10px] flex flex-col gap-2 font-mono"
              >
                <div className="flex justify-between items-center border-b border-border-custom/40 pb-1.5 font-bold text-muted">
                  <span>CURRENT STATUS</span>
                  <span className="text-accent">• LIVE</span>
                </div>
                <div className="flex flex-col gap-1 text-foreground/90 font-light">
                  <div>• UI/UX Intern at Appendo</div>
                  <div className="flex items-center gap-1">
                    • Based in Ahmedabad, India <MapPin size={10} className="text-muted" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hero CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 text-[12px] font-semibold tracking-wide border-t border-border-custom/50 pt-6"
          >
            <a 
              href="#work" 
              className="px-6 py-3 bg-accent text-background border border-accent transition-editorial hover:bg-transparent hover:text-accent font-semibold text-center"
            >
              SEE MY WORK
            </a>
            <a 
              href="/resume.pdf" 
              download
              className="px-6 py-3 border border-border-custom hover:bg-border-custom/20 transition-editorial text-foreground font-semibold text-center flex items-center gap-2"
            >
              <FileText size={12} /> DOWNLOAD CV
            </a>
            <a 
              href="#contact" 
              className="text-muted hover:text-accent transition-editorial font-semibold px-4 py-3"
            >
              SAY HELLO &rarr;
            </a>
          </motion.div>
        </motion.section>


        {/* PERSONAL IDENTITY SECTION */}
        <section id="about" className="flex flex-col gap-6 scroll-mt-20">
          <div className="text-[10px] text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2">
            01 / IDENTITY
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* About Photo Column */}
            <div className="md:col-span-4 flex items-center justify-center">
              <div className="w-full aspect-square relative border border-border-custom bg-border-custom/5 overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about.jpg"
                  alt="Meet Mehta Standing"
                  className="w-full h-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
            </div>

            {/* Introduction Narrative */}
            <div className="md:col-span-8 flex flex-col gap-6 text-[14px] leading-[1.8] font-light text-foreground/90">
              <p>
                I am Meet Mehta, a final-year B.Tech student in AI-ML at Adani University. I focus on writing clean, readable systems and building full-stack applications that solve real-world workflows. I currently maintain a 7.48 CGPA and intern as a UI/UX design intern at Appendo Consulting and Services, translating interfaces into working components.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
                <div className="flex flex-col gap-2 border-l border-border-custom pl-4">
                  <span className="font-bold uppercase tracking-wider text-muted">CURRENT FOCUS</span>
                  <p className="text-muted/80 leading-relaxed font-light">
                    Developing a placement preparation portal for students integrated with AI, and building responsive layouts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 border-l border-border-custom pl-4">
                  <span className="font-bold uppercase tracking-wider text-muted">CORE INTERESTS</span>
                  <p className="text-muted/80 leading-relaxed font-light">
                    Swiss typographic layout grids, distributed database synchronization, and scalable AI inference backends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* PROJECTS SECTION */}
        <section id="work" className="flex flex-col gap-8 scroll-mt-20">
          <div className="text-[10px] text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2">
            02 / SELECTED CASE STUDIES
          </div>

          <div className="flex flex-col gap-16">
            {projects.map((project) => (
              <div 
                key={project.slug}
                className="group border border-border-custom bg-border-custom/5 hover:border-accent hover:bg-border-custom/10 transition-all duration-300 flex flex-col gap-6 p-6 sm:p-8"
              >
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-border-custom/40 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-accent font-semibold tracking-wider uppercase font-mono">
                      CASE STUDY {project.year}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground transition-editorial group-hover:text-accent">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs text-muted font-normal bg-border-custom/30 border border-border-custom/50 px-2 py-0.5 self-start sm:self-auto uppercase tracking-widest font-mono">
                    {project.year}
                  </span>
                </div>

                <div className="flex flex-col gap-4 text-xs font-light">
                  <div className="flex flex-col gap-3 font-light text-foreground/90 leading-relaxed text-[13px]">
                    <p>
                      <strong className="font-semibold block text-xs uppercase tracking-wider text-muted mb-0.5">THE PROBLEM</strong>
                      {project.problemSolved}
                    </p>
                    <p>
                      <strong className="font-semibold block text-xs uppercase tracking-wider text-muted mb-0.5">KEY ACHIEVEMENT</strong>
                      {project.keyAchievements[0]}
                    </p>
                  </div>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-custom/40">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-border-custom/30 text-foreground px-2 py-0.5 text-[10px] border border-border-custom/50 font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Actions */}
                  <div className="flex items-center gap-4 pt-3 text-[11px] font-semibold tracking-wider">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline flex items-center gap-1 border border-accent/20 bg-accent/5 px-4 py-2 hover:bg-accent hover:text-background transition-all"
                      >
                        LIVE SITE <ArrowUpRight size={12} />
                      </a>
                    )}
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground transition-editorial flex items-center gap-1 px-2 py-2"
                    >
                      <GithubIcon size={12} /> REPOSITORY
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* SKILLS SECTION */}
        <section className="flex flex-col gap-6">
          <div className="text-[10px] text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2">
            03 / CAPABILITIES
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Frontend */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold tracking-wider text-muted uppercase">FRONTEND</span>
              <div className="flex flex-col gap-1.5 font-light text-xs text-foreground/80">
                <span className="border-l-2 border-border-custom pl-2 py-0.5">React</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">Next.js</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">TypeScript</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">Tailwind CSS</span>
              </div>
            </div>

            {/* Backend */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold tracking-wider text-muted uppercase">BACKEND</span>
              <div className="flex flex-col gap-1.5 font-light text-xs text-foreground/80">
                <span className="border-l-2 border-border-custom pl-2 py-0.5">Node.js</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">FastAPI</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">PostgreSQL</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">REST APIs</span>
              </div>
            </div>

            {/* AI / ML */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold tracking-wider text-muted uppercase">AI / INTELLIGENCE</span>
              <div className="flex flex-col gap-1.5 font-light text-xs text-foreground/80">
                <span className="border-l-2 border-border-custom pl-2 py-0.5">Python</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">LangChain</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">RAG Pipelines</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">OpenAI APIs</span>
              </div>
            </div>

            {/* Tools */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold tracking-wider text-muted uppercase">INFRASTRUCTURE</span>
              <div className="flex flex-col gap-1.5 font-light text-xs text-foreground/80">
                <span className="border-l-2 border-border-custom pl-2 py-0.5">Docker</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">Git / GitHub</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">AWS Services</span>
                <span className="border-l-2 border-border-custom pl-2 py-0.5">Linux Server</span>
              </div>
            </div>
          </div>
        </section>


        {/* WORK EXPERIENCE SECTION */}
        <section id="experience" className="flex flex-col gap-6 scroll-mt-20">
          <div className="text-[10px] text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2">
            04 / EXPERIENCE TIMELINE
          </div>

          <div className="relative pl-6 flex flex-col gap-8">
            {/* Timeline Bullet Dot */}
            <div className="absolute left-[3px] top-[14px] w-[7px] h-[7px] rounded-full border border-foreground bg-background" />
            
            <div className="flex flex-col gap-1">
              <div className="text-[11px] text-muted font-normal flex justify-between items-center sm:w-full">
                <span>MAY 2026 – PRESENT</span>
                <span className="text-[10px] uppercase font-mono tracking-wider flex items-center gap-1 text-right"><MapPin size={10} /> Vadodara, Gujarat</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground leading-snug">
                Appendo Consulting and Service
              </h3>
              <div className="text-[10px] font-mono tracking-[0.08em] text-accent uppercase mb-2">
                UI/UX Intern
              </div>
              <ul className="text-[13px] leading-relaxed text-foreground/85 font-light list-disc list-outside pl-4 flex flex-col gap-2 font-mono">
                <li>Designing and developing intuitive user interfaces and seamless user experiences for a new, interactive mock interview platform.</li>
                <li>Creating wireframes, interactive prototypes, and responsive layouts to ensure accessibility and consistent design across multiple devices.</li>
                <li>Building Tyroo Placement OS, a full-stack placement management platform, developing student dashboards, drive calendar, and placement analytics using Hono, Supabase, and Prisma.</li>
              </ul>
            </div>
          </div>
        </section>


        {/* CERTIFICATIONS SECTION */}
        <section className="flex flex-col gap-6">
          <div className="text-[10px] text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2">
            05 / CERTIFICATIONS
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cert 1 */}
            <div className="border border-border-custom p-4 bg-border-custom/5 flex items-start gap-3">
              <Award className="text-accent flex-shrink-0 mt-0.5" size={16} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground font-mono">AWS Academy Cloud Foundations</span>
                <span className="text-[10px] text-muted uppercase mt-0.5">AWS Academy · Nov 2025</span>
              </div>
            </div>

            {/* Cert 2 */}
            <div className="border border-border-custom p-4 bg-border-custom/5 flex items-start gap-3">
              <Award className="text-accent flex-shrink-0 mt-0.5" size={16} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground font-mono">AWS Academy ML Foundations</span>
                <span className="text-[10px] text-muted uppercase mt-0.5">AWS Academy · Nov 2025</span>
              </div>
            </div>

            {/* Cert 3 */}
            <div className="border border-border-custom p-4 bg-border-custom/5 flex items-start gap-3">
              <Award className="text-accent flex-shrink-0 mt-0.5" size={16} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground font-mono">Prompt Engineering Basics</span>
                <span className="text-[10px] text-muted uppercase mt-0.5">IBM Skills Network · Jan 2026</span>
              </div>
            </div>

            {/* Cert 4 */}
            <div className="border border-border-custom p-4 bg-border-custom/5 flex items-start gap-3">
              <Award className="text-accent flex-shrink-0 mt-0.5" size={16} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground font-mono">Yuva AI for All Scheme</span>
                <span className="text-[10px] text-muted uppercase mt-0.5">IndiaAI & NASSCOM · Jan 2026</span>
              </div>
            </div>
          </div>
        </section>


        {/* SYSTEM STATUS SECTION */}
        <section className="flex flex-col gap-6">
          <div className="text-[10px] text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2">
            06 / CURRENT STATUS
          </div>

          <div className="border border-border-custom bg-[#0E0E0E] text-[#E0DDD8] p-6 font-mono text-xs flex flex-col gap-4 rounded-none">
            <div className="flex justify-between items-center border-b border-border-custom/25 pb-3">
              <div className="flex items-center gap-2">
                <Activity size={12} className="text-accent animate-pulse" />
                <span className="font-bold tracking-wider text-[10px] text-muted uppercase">SYSTEM STATUS BOARD</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-[#2ECC71] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2ECC71]" /> ONLINE
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 font-light text-muted">
              <div className="flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-accent">AVAILABILITY</span>
                <span className="text-[#E0DDD8] font-medium flex items-center gap-1">
                  ● Available for Opportunities
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-accent">LOCATION</span>
                <span className="text-[#E0DDD8] font-medium">Ahmedabad, India</span>
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <span className="font-bold uppercase tracking-wider text-[10px] text-accent">ACTIVE BUILD</span>
                <span className="text-[#E0DDD8] font-medium">
                  Placement preparation portal for students integrated with AI (building mock interview and evaluation tools)
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* CONTACT & FOOTER SECTION */}
        <section id="contact" className="border-t border-border-custom pt-12 pb-6 scroll-mt-20">
          <div className="text-[10px] text-accent tracking-widest font-bold uppercase mb-8">
            07 / CONNECT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Let&apos;s build <br /> something meaningful.
              </h2>
              <p className="text-xs leading-relaxed text-muted font-light max-w-[280px]">
                I&apos;m usually available. Email is the fastest way to reach me. I usually respond within 24 hours.
              </p>
            </div>
            
            <div className="flex flex-col text-sm leading-[2.2] border-l border-border-custom pl-6 justify-center">
              <a 
                href="mailto:mehtameet685@gmail.com" 
                className="text-foreground hover:text-accent font-semibold transition-editorial flex items-center gap-2"
              >
                <Mail size={14} className="text-muted" /> mehtameet685@gmail.com
              </a>
              <a 
                href="tel:+918320907038" 
                className="text-foreground hover:text-accent font-semibold transition-editorial flex items-center gap-2"
              >
                <Phone size={14} className="text-muted" /> +91 8320907038
              </a>
              <a 
                href="https://linkedin.com/in/meet-mehta685" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground hover:text-accent font-semibold transition-editorial flex items-center gap-2"
              >
                <LinkedinIcon size={14} className="text-muted" /> LinkedIn Profile
              </a>
              <a 
                href="https://github.com/meetmehta0685" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground hover:text-accent font-semibold transition-editorial flex items-center gap-2"
              >
                <GithubIcon size={14} className="text-muted" /> GitHub Repositories
              </a>
              <a 
                href="/resume.pdf" 
                download
                className="text-foreground hover:text-accent font-semibold transition-editorial flex items-center gap-2"
              >
                <FileText size={14} className="text-muted" /> Download Resume PDF
              </a>
            </div>
          </div>

          {/* LOWER FOOTER */}
          <div className="border-t border-border-custom/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted">
            <div>
              © 2026 Meet Mehta. All rights reserved.
            </div>
            <div className="uppercase tracking-widest font-semibold text-[10px]">
              Adani University B.Tech CSE(AI-ML)
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
