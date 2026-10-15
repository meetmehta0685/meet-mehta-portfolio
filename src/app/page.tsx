"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Award, Copy, FileText, Mail, MapPin, Phone } from "lucide-react";
import ProjectDrawer from "./components/ProjectDrawer";
import { projects, type Project } from "@/data/projects";
import { sound } from "./components/SoundEffects";
import { useToast } from "./components/Toast";
import { GithubIcon, LinkedinIcon } from "./components/Icons";

const skillGroups = [
  { label: "Languages", skills: ["TypeScript", "JavaScript", "Python", "C"] },
  { label: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
  { label: "Backend & data", skills: ["Node.js", "Express.js", "Hono", "FastAPI", "REST APIs", "PostgreSQL", "Supabase", "Neon", "Prisma", "MongoDB"] },
  { label: "AI, realtime & tools", skills: ["Groq", "OpenRouter", "Whisper", "LiveKit", "Ably", "AWS", "Docker", "Git", "GitHub", "Vercel"] },
];

const certifications = [
  { title: "AWS Academy Cloud Architecting", date: "Apr 2026", url: "https://www.credly.com/go/xSoxYcJe" },
  { title: "AWS Academy Cloud Foundations", date: "Nov 2025", url: "https://www.credly.com/go/oZ1FM0T3" },
  { title: "AWS Academy Machine Learning Foundations", date: "Nov 2025", url: "https://www.credly.com/go/zSWYqx4B" },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { showToast } = useToast();

  const openProject = (project: Project) => {
    sound.click();
    setSelectedProject(project);
  };

  const copyContact = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    sound.pop();
    showToast(`${label} copied`);
  };

  return (
    <main className="folio-page">
      <section className="folio-sheet" aria-labelledby="folio-title">
        <div className="folio-paper" aria-hidden="true" />

        <figure className="folio-portrait">
          <Image
            src="/plates/portrait-mehta.jpg"
            alt="Meet Mehta"
            fill
            priority
            unoptimized
            sizes="(max-width: 767px) 100vw, 44vw"
            className="folio-portrait-image"
          />
        </figure>

        <header className="folio-header">
          <a href="#top" className="identity-name">Meet Mehta</a>
          <span className="identity-role">Full-stack developer</span>
          <span className="identity-location">Ahmedabad, India</span>
          <nav className="folio-nav" aria-label="Primary navigation">
            <a href="#about"><span>01</span> About</a>
            <a href="#work"><span>02</span> Work</a>
            <a href="#capabilities"><span>03</span> Stack</a>
            <a href="#contact"><span>04</span> Contact</a>
          </nav>
        </header>

        <div className="folio-tab" aria-hidden="true">01</div>

        <div id="top" className="folio-hero-copy">
          <h1 id="folio-title">
            <span className="headline-line headline-line-1">Hello</span>
            <span className="headline-line headline-line-2">I am</span>
            <span className="headline-line headline-line-3">Meet</span>
          </h1>
          <p className="folio-summary">
            Operational workflows are complex.<br />
            I build software that makes them reliable, observable, and efficient.
          </p>
        </div>

        <div className="folio-register" id="work">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className="folio-project-row"
              onClick={() => openProject(project)}
              aria-label={`Open details for ${project.title}`}
            >
              <span className="folio-project-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="folio-project-title">{project.title}</span>
              <svg className="folio-project-arrow" viewBox="0 0 48 20" fill="none" aria-hidden="true">
                <path d="M1 10H45M36 2L45 10L36 18" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          ))}
        </div>

        <span className="registration-mark registration-top-left" aria-hidden="true" />
        <span className="registration-mark registration-mid-left" aria-hidden="true" />
        <span className="registration-mark registration-bottom-left" aria-hidden="true" />
        <span className="registration-mark registration-mid-right" aria-hidden="true" />
        <span className="registration-mark registration-bottom-right" aria-hidden="true" />
      </section>

      <section id="about" className="folio-section about-section">
        <div className="folio-section-label">About</div>
        <div className="folio-section-body about-layout">
          <h2>A builder between interface and infrastructure.</h2>
          <div className="about-copy">
            <p>I study Computer Science and Engineering at Adani University, with a specialization in Artificial Intelligence and Machine Learning. I build full-stack products around real operational work, including food redistribution, interview preparation, and clinical operations.</p>
            <p>During my full-stack internship at Appendo Consulting and Services, I built a placement portal for SVIT with Hono, Supabase, and Prisma, and shared product feedback with the Tyroo.ai team. Right now I&apos;m strengthening my full-stack foundations and deciding what to build next.</p>
          </div>
          <dl className="about-facts">
            <div><dt>Location</dt><dd><MapPin size={16} aria-hidden="true" /> Ahmedabad, India</dd></div>
            <div><dt>Degree</dt><dd>B.Tech CSE, AI &amp; ML</dd></div>
            <div><dt>Study</dt><dd>2023 to 2027</dd></div>
            <div><dt>CGPA</dt><dd>7.48 / 10</dd></div>
          </dl>
        </div>
      </section>

      <section className="folio-section project-section" aria-labelledby="project-heading">
        <div className="folio-section-label">Selected work</div>
        <div className="folio-section-body">
          <h2 id="project-heading">Four systems built around work that has to move.</h2>
          <div className="project-plates">
            {projects.map((project, index) => (
              <article className="project-plate" key={project.slug}>
                <div className="project-plate-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="project-plate-main">
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-actions">
                    <button type="button" onClick={() => openProject(project)}>Inspect project <ArrowUpRight size={16} aria-hidden="true" /></button>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={() => sound.click()}>Open live site <ArrowUpRight size={16} aria-hidden="true" /></a>
                  </div>
                </div>
                <ul className="project-evidence" aria-label={`${project.title} key features`}>
                  {project.keyAchievements.slice(0, 2).map((achievement) => <li key={achievement}>{achievement}</li>)}
                </ul>
                <p className="project-stack">{project.technologies.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="folio-section capabilities-section">
        <div className="folio-section-label">Stack</div>
        <div className="folio-section-body">
          <h2>Tools selected for the job, not the label.</h2>
          <div className="capability-register">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3>{group.label}</h3>
                <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="folio-section experience-section">
        <div className="folio-section-label">Experience</div>
        <div className="folio-section-body experience-layout">
          <div>
            <h2>Work and credentials.</h2>
            <article className="experience-entry">
              <div className="experience-date">May to Jul 2026 · Vadodara</div>
              <h3>Appendo Consulting and Services</h3>
              <p className="experience-role">Full Stack Developer Intern</p>
              <ul>
                <li>Built a placement portal for SVIT with student dashboards, a placement-drive calendar, and analytics modules using Hono, Supabase, and Prisma.</li>
                <li>Translated product requirements and prototypes into responsive desktop and mobile workflows for placement management and mock interviews.</li>
                <li>Worked with product and engineering to refine reusable, accessible interface patterns across student-facing screens.</li>
                <li>Shared product feedback with the Tyroo.ai team during feature development.</li>
              </ul>
            </article>
          </div>
          <div className="certification-register">
            <h3>Certifications</h3>
            {certifications.map((cert) => (
              <a key={cert.title} href={cert.url} target="_blank" rel="noopener noreferrer" onClick={() => sound.click()}>
                <Award size={18} aria-hidden="true" />
                <span><strong>{cert.title}</strong><small>AWS Academy · {cert.date}</small></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-sheet">
        <div className="contact-index">05</div>
        <div>
          <h2>Have a role or project in mind?</h2>
          <p>Email is the fastest way to reach me. I usually respond within 24 hours.</p>
        </div>
        <div className="contact-register">
          <a href="mailto:mehtameet685@gmail.com"><Mail size={18} aria-hidden="true" /> mehtameet685@gmail.com <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button type="button" onClick={() => copyContact("+918320907038", "Phone number")}><Phone size={18} aria-hidden="true" /> +91 83209 07038 <Copy size={15} aria-hidden="true" /></button>
          <a href="https://linkedin.com/in/meet-mehta685" target="_blank" rel="noopener noreferrer"><LinkedinIcon size={18} /> LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href="https://github.com/meetmehta0685" target="_blank" rel="noopener noreferrer"><GithubIcon size={18} /> GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href="/resume.pdf" download><FileText size={18} aria-hidden="true" /> Download résumé <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </section>

      <footer className="folio-footer">
        <span>© 2026 Meet Mehta</span>
      </footer>

      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
