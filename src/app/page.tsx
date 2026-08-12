"use client";

import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import { projects } from "@/data/projects";
import {
  ArrowUpRight,
  Award,
  Mail,
  MapPin,
  FileText,
  Activity,
  Phone
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/Icons";
import Magnetic from "./components/Magnetic";

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
    hidden: { opacity: 0, transform: "translateY(16px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  const capabilitiesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const capabilityColumnVariants = {
    hidden: { opacity: 0, transform: "translateY(16px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
      },
    },
  };

  const certsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 flex flex-col transition-editorial">
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
              <motion.div variants={itemVariants} className="flex flex-col select-none uppercase font-sans font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter leading-[0.85] text-foreground">
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
                className="text-base font-light text-foreground/80 leading-relaxed max-w-[480px] mt-1"
              >
                Full-stack developer building role-based platforms, real-time workflows, and practical AI-assisted products with modern web technologies.
              </motion.p>

              {/* Status Badge */}
              <motion.div variants={itemVariants} className="flex items-center gap-2.5 pt-1 text-[10px] font-mono tracking-wider font-semibold uppercase text-muted-foreground select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-muted font-bold font-mono">
                  Available for opportunities
                </span>
              </motion.div>
            </div>

            {/* Photo Column */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <motion.div 
                variants={itemVariants} 
                className="relative overflow-hidden border border-border-custom bg-border-custom/5 aspect-[4/5] flex items-center justify-center group shadow-sm dark:shadow-none hover:shadow-md transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/portrait.jpg"
                  alt="Meet Mehta Portrait"
                  className="w-full h-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-103 group-hover:grayscale-0"
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
                className="border border-border-custom p-5 bg-border-custom/5 text-[10.5px] flex flex-col gap-2.5 font-mono shadow-xs"
              >
                <div className="flex justify-between items-center border-b border-border-custom/40 pb-1.5 font-bold text-muted">
                  <span>CURRENT STATUS</span>
                  <span className="text-accent">• OPEN</span>
                </div>
                <div className="flex flex-col gap-1 text-foreground/90 font-light">
                  <div>• B.Tech CSE (AI &amp; ML) student</div>
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
            className="flex flex-wrap items-center gap-4 text-[12px] font-semibold tracking-wide border-t border-border-custom/50 pt-6 font-mono"
          >
            <motion.a 
              href="#work" 
              className="px-6 py-3 bg-accent text-background border border-accent transition-colors duration-250 hover:bg-transparent hover:text-accent font-semibold text-center cursor-pointer tracking-wider text-xs"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
            >
              SEE PROJECTS
            </motion.a>
            <motion.a 
              href="/resume.pdf" 
              download
              className="px-6 py-3 border border-border-custom hover:bg-border-custom/20 transition-colors duration-250 text-foreground font-semibold text-center flex items-center gap-2 cursor-pointer tracking-wider text-xs"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
            >
              <FileText size={12} /> DOWNLOAD RESUME
            </motion.a>
            <motion.a 
              href="#contact" 
              className="text-muted hover:text-accent transition-colors duration-250 font-semibold px-4 py-3 cursor-pointer tracking-wider text-xs"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
            >
              SAY HELLO &rarr;
            </motion.a>
          </motion.div>
        </motion.section>


        {/* PERSONAL IDENTITY SECTION */}
        <section id="about" className="flex flex-col gap-6 scroll-mt-20">
          <div className="text-[10px] font-mono text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2.5">
            01 / IDENTITY
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* About Photo Column */}
            <div className="md:col-span-4 flex items-center justify-center">
              <div className="w-full aspect-square relative border border-border-custom bg-border-custom/5 overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about.jpg"
                  alt="Meet Mehta Standing"
                  className="w-full h-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-103 group-hover:grayscale-0"
                />
              </div>
            </div>

            {/* Introduction Narrative */}
            <div className="md:col-span-8 flex flex-col gap-6 text-[15px] leading-relaxed font-light text-foreground/80">
              <p>
                I&apos;m Meet Mehta, a B.Tech Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at Adani University, graduating in 2027. I build full-stack products around real-world operational workflows, from food redistribution and IELTS preparation to clinical operations. During my UI/UX internship at Appendo Consulting and Service, I contributed to Tyroo Placement OS using Hono, Supabase, and Prisma.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
                <div className="flex flex-col gap-2.5 border-l-2 border-accent pl-5 py-0.5">
                  <span className="font-mono font-bold uppercase tracking-wider text-xs text-muted">CURRENT FOCUS</span>
                  <p className="text-[13px] text-foreground/70 leading-relaxed font-light font-sans">
                    I&apos;m not actively building a new product right now. I&apos;m reviewing recent work, strengthening my full-stack foundations, and exploring what to take on next.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 border-l-2 border-accent pl-5 py-0.5">
                  <span className="font-mono font-bold uppercase tracking-wider text-xs text-muted">CORE INTERESTS</span>
                  <p className="text-[13px] text-foreground/70 leading-relaxed font-light font-sans">
                    Full-stack product engineering, real-time operational workflows, and useful AI-assisted experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* PROJECTS SECTION */}
        <section id="work" className="flex flex-col gap-8 scroll-mt-20">
          <div className="text-[10px] font-mono text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2.5">
            02 / PROJECTS
          </div>

          <div className="flex flex-col gap-10">
            {projects.map((project) => (
              <motion.div 
                key={project.slug}
                className="group border border-border-custom bg-border-custom/5 hover:border-accent hover:bg-border-custom/10 transition-all duration-300 flex flex-col gap-6 p-6 sm:p-8 cursor-pointer origin-center shadow-xs hover:shadow-sm"
                whileHover={{ transform: "translateY(-4px) scale(1.01)" }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                initial={{ opacity: 0, transform: "translateY(20px)" }}
                whileInView={{ opacity: 1, transform: "translateY(0)" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-border-custom/40 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9.5px] text-accent font-semibold tracking-widest uppercase font-mono">
                      PROJECT
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-xs font-light">
                  <div className="flex flex-col gap-4 font-light text-foreground/80 leading-relaxed text-[13.5px]">
                    <div>
                      <strong className="font-mono font-bold block text-[10.5px] uppercase tracking-wider text-muted mb-1">OVERVIEW</strong>
                      {project.summary}
                    </div>
                    <div>
                      <strong className="font-mono font-bold block text-[10.5px] uppercase tracking-wider text-muted mb-1.5">KEY FEATURES</strong>
                      <ul className="list-disc list-outside pl-4 flex flex-col gap-1.5">
                        {project.keyAchievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-custom/40">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-border-custom/30 hover:bg-border-custom/50 text-foreground/80 px-2.5 py-0.5 text-[9.5px] rounded-full transition-colors duration-200 font-mono font-medium select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Actions */}
                  <div className="flex items-center gap-4 pt-3 text-[11px] font-semibold tracking-wider font-mono">
                    <Magnetic>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline flex items-center gap-1 border border-accent/20 bg-accent/5 px-4 py-2 hover:bg-accent hover:text-background transition-colors duration-300 cursor-pointer"
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 450, damping: 15 }}
                      >
                        LIVE SITE <ArrowUpRight size={12} />
                      </motion.a>
                    </Magnetic>
                    <Magnetic>
                      <motion.a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted hover:text-foreground transition-colors duration-300 flex items-center gap-1.5 px-2 py-2 cursor-pointer"
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 450, damping: 15 }}
                      >
                        <GithubIcon size={12} /> REPOSITORY
                      </motion.a>
                    </Magnetic>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* SKILLS SECTION */}
        <section className="flex flex-col gap-6">
          <div className="text-[10px] font-mono text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2.5">
            03 / CAPABILITIES
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={capabilitiesContainerVariants}
          >
            {[
              { label: "LANGUAGES", skills: ["C++", "TypeScript", "JavaScript", "Python", "Java"] },
              { label: "FRONTEND", skills: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
              { label: "BACKEND", skills: ["Node.js", "Express.js", "Hono", "FastAPI", "REST APIs"] },
              { label: "DATABASES", skills: ["PostgreSQL", "MongoDB", "Supabase", "Neon"] },
              { label: "TOOLS & CLOUD", skills: ["AWS", "Docker", "Prisma", "Git", "GitHub", "Linux / Unix", "Vercel"] }
            ].map((group) => (
              <motion.div key={group.label} variants={capabilityColumnVariants} className="flex flex-col gap-3">
                <span className="text-[10.5px] font-mono font-bold tracking-wider text-muted uppercase">{group.label}</span>
                <div className="flex flex-col gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-border-custom/60 bg-border-custom/5 hover:border-accent hover:bg-accent/5 hover:text-accent px-3 py-1.5 text-[11px] font-mono transition-all duration-200 select-none flex items-center justify-between gap-2 group rounded-none"
                    >
                      <span>{skill}</span>
                      <span className="w-1 h-1 shrink-0 rounded-full bg-border-custom group-hover:bg-accent transition-colors duration-200" />
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>


        {/* WORK EXPERIENCE SECTION */}
        <section id="experience" className="flex flex-col gap-6 scroll-mt-20">
          <div className="text-[10px] font-mono text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2.5">
            04 / EXPERIENCE TIMELINE
          </div>

          <div className="relative pl-7 flex flex-col gap-8">
            {/* Timeline Axis Line */}
            <div className="absolute left-[6px] top-[18px] bottom-0 w-[1px] bg-border-custom/60" />

            {/* Timeline Bullet Dot */}
            <motion.div 
              className="absolute left-[3px] top-[14px] w-[7px] h-[7px] rounded-full border border-foreground bg-background origin-center z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 250, damping: 10, delay: 0.15 }}
            />
            
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ opacity: 0, transform: "translateY(16px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 14 }}
            >
              <div className="text-[10px] font-mono text-muted font-normal flex justify-between items-center sm:w-full">
                <span>MAY 2026 – JUL 2026</span>
                <span className="text-[9.5px] uppercase font-mono tracking-wider flex items-center gap-1 text-right select-none"><MapPin size={10} /> Vadodara, Gujarat</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground leading-snug mt-1">
                Appendo Consulting and Service
              </h3>
              <div className="text-[10px] font-mono tracking-[0.08em] text-accent uppercase mb-2 font-semibold">
                UI/UX Intern
              </div>
              <ul className="text-[13.5px] leading-relaxed text-foreground/80 font-light list-disc list-outside pl-4 flex flex-col gap-2 font-sans">
                <li>Contributed to the full-stack development of Tyroo Placement OS, building student dashboards, a placement-drive calendar, and analytics modules with Hono, Supabase, and Prisma.</li>
                <li>Translated product requirements and prototypes into responsive desktop and mobile workflows for placement-management and mock-interview features.</li>
                <li>Collaborated across product and engineering to develop reusable workflows within implementation constraints and accessible interface requirements.</li>
              </ul>
            </motion.div>
          </div>
        </section>


        {/* CERTIFICATIONS SECTION */}
        <section className="flex flex-col gap-6">
          <div className="text-[10px] font-mono text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2.5">
            05 / CERTIFICATIONS
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={certsContainerVariants}
          >
            {[
              { title: "AWS Academy Cloud Architecting", issuer: "AWS Academy · Apr 2026", url: "https://www.credly.com/go/xSoxYcJe" },
              { title: "AWS Academy Cloud Foundations", issuer: "AWS Academy · Nov 2025", url: "https://www.credly.com/go/oZ1FM0T3" },
              { title: "AWS Academy Machine Learning Foundations", issuer: "AWS Academy · Nov 2025", url: "https://www.credly.com/go/zSWYqx4B" }
            ].map((cert) => (
              <motion.a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={capabilityColumnVariants}
                className="border border-border-custom p-5 bg-border-custom/5 hover:border-accent hover:bg-border-custom/10 transition-all duration-300 flex items-start gap-3 cursor-pointer origin-center shadow-xs hover:shadow-sm"
                whileHover={{ transform: "translateY(-3px) scale(1.01)" }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
              >
                <Award className="text-accent flex-shrink-0 mt-0.5" size={16} />
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-foreground font-sans leading-snug">{cert.title}</span>
                  <span className="text-[9.5px] text-muted-foreground font-mono uppercase mt-1">{cert.issuer}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>


        {/* SYSTEM STATUS SECTION */}
        <section className="flex flex-col gap-6">
          <div className="text-[10px] font-mono text-accent tracking-widest font-bold uppercase border-b border-border-custom pb-2.5">
            06 / CURRENT FOCUS
          </div>

          <motion.div 
            className="border border-border-custom bg-[#0C0C0C] text-[#EDEDEB] p-6 font-mono text-xs flex flex-col gap-4 rounded-none origin-center shadow-sm"
            initial={{ opacity: 0, transform: "translateY(16px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
          >
            <div className="flex justify-between items-center border-b border-border-custom/20 pb-3">
              <div className="flex items-center gap-2">
                <Activity size={12} className="text-accent animate-pulse" />
                <span className="font-bold tracking-wider text-[10px] text-muted uppercase">CURRENT FOCUS</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-[#2ECC71] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2ECC71]" /> OPEN
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 font-light text-muted">
              <div className="flex flex-col gap-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px] text-accent">AVAILABILITY</span>
                <span className="text-[#EDEDEB] font-medium flex items-center gap-1.5">
                  ● Available for Opportunities
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px] text-accent">LOCATION</span>
                <span className="text-[#EDEDEB] font-medium">Ahmedabad, India</span>
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="font-bold uppercase tracking-wider text-[10px] text-accent">RIGHT NOW</span>
                <span className="text-[#EDEDEB] font-medium leading-relaxed font-sans text-[12.5px]">
                  No active build at the moment. I&apos;m reviewing recent work and deciding what to take on next.
                </span>
              </div>
            </div>
          </motion.div>
        </section>


        {/* CONTACT & FOOTER SECTION */}
        <section id="contact" className="border-t border-border-custom pt-12 pb-6 scroll-mt-20">
          <div className="text-[10px] font-mono text-accent tracking-widest font-bold uppercase mb-8">
            07 / CONNECT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
                Let&apos;s build <br /> something meaningful.
              </h2>
              <p className="text-[13px] leading-relaxed text-foreground/75 font-light max-w-[280px] font-sans">
                I&apos;m usually available. Email is the fastest way to reach me. I usually respond within 24 hours.
              </p>
            </div>
            
            <div className="flex flex-col text-[13px] leading-[2.4] border-l border-border-custom pl-6 justify-center font-mono">
              <Magnetic>
                <motion.a 
                  href="mailto:mehtameet685@gmail.com" 
                  className="text-foreground hover:text-accent font-semibold transition-colors duration-200 flex items-center gap-2.5 cursor-pointer origin-left w-fit py-1"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Mail size={14} className="text-muted-foreground" /> mehtameet685@gmail.com
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a 
                  href="tel:+918320907038" 
                  className="text-foreground hover:text-accent font-semibold transition-colors duration-200 flex items-center gap-2.5 cursor-pointer origin-left w-fit py-1"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Phone size={14} className="text-muted-foreground" /> +91 8320907038
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a 
                  href="https://linkedin.com/in/meet-mehta685" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground hover:text-accent font-semibold transition-colors duration-200 flex items-center gap-2.5 cursor-pointer origin-left w-fit py-1"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <LinkedinIcon size={14} className="text-muted-foreground" /> LinkedIn Profile
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a 
                  href="https://github.com/meetmehta0685" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground hover:text-accent font-semibold transition-colors duration-200 flex items-center gap-2.5 cursor-pointer origin-left w-fit py-1"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <GithubIcon size={14} className="text-muted-foreground" /> GitHub Repositories
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a 
                  href="/resume.pdf" 
                  download
                  className="text-foreground hover:text-accent font-semibold transition-colors duration-200 flex items-center gap-2.5 cursor-pointer origin-left w-fit py-1"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <FileText size={14} className="text-muted-foreground" /> Download Resume PDF
                </motion.a>
              </Magnetic>
            </div>
          </div>

          {/* LOWER FOOTER */}
          <div className="border-t border-border-custom/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground font-mono">
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
