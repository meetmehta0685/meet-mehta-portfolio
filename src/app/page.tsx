import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Chevron from "./components/Chevron";
import CopyButton from "./components/CopyButton";
import RevealObserver from "./components/RevealObserver";
import Showcase from "./components/Showcase";
import { homeOf, projects } from "@/data/projects";
import { certifications, contact, education, internship, resumes, skillGroups } from "@/data/profile";

const line = (i: number) => ({ "--i": i }) as CSSProperties;

function TextLink({ href, children, download, external }: { href: string; children: ReactNode; download?: string; external?: boolean }) {
  return (
    <a href={href} className="text-link t-learn" download={download} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      <Chevron />
    </a>
  );
}

function Intro() {
  return (
    <div className="intro t-stagger t-load">
      <p className="intro-byline t-stagger-line">
        <Image src="/me/booth.jpg" alt="" width={1800} height={2400} sizes="40px" className="intro-avatar" preload />
        <span>
          <strong>Meet Mehta</strong>
          <span>Full-stack developer, {contact.city}</span>
        </span>
      </p>
      <h1 className="t-stagger-line" style={line(1)}>Software for work that has to move.</h1>
      <p className="intro-lead t-stagger-line" style={line(2)}>
        Four live products and two Go systems, built end to end. Open any tile to see how it works.
      </p>
      <p className="intro-actions t-stagger-line" style={line(3)}>
        <a href={`mailto:${contact.email}`} className="button button-accent">Email me</a>
        <CopyButton value={contact.email} label="email address" idle="Copy email" className="button button-quiet" />
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main id="top">
        <Showcase intro={<Intro />} />

        <section id="record" className="record" aria-labelledby="record-heading">
          <div className="record-about t-stagger" data-reveal>
            <h2 id="record-heading" className="section-heading t-stagger-line">About and record</h2>
            <p className="t-stagger-line" style={line(1)}>
              I&apos;m Meet. I study Computer Science and Engineering at Adani University in Ahmedabad, specialising in Artificial
              Intelligence and Machine Learning. I build full-stack products around real operational work: food redistribution,
              interview preparation, IELTS practice, and clinical operations. I also build smaller systems in Go, like a reverse
              proxy and an encrypted clipboard sync tool.
            </p>
            <p className="t-stagger-line" style={line(2)}>
              Right now I&apos;m strengthening my full-stack foundations and deciding what to build next.{" "}
              <a href="#contact" className="inline-link">If you have a role in mind, write to me.</a>
            </p>
          </div>

          <div className="record-panel">
            <div className="record-group t-stagger" data-reveal>
              <h3 className="t-stagger-line">Experience</h3>
              <div className="record-row t-stagger-line" style={line(1)}>
                <span><strong>{internship.role}</strong>, {internship.company}</span>
                <span className="record-value">{internship.when}, {internship.where}</span>
              </div>
              <ul className="record-notes">
                {internship.notes.map((note, i) => (
                  <li key={note} className="t-stagger-line" style={line(i + 2)}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="record-group t-stagger" data-reveal>
              <h3 className="t-stagger-line">Education</h3>
              <div className="record-row t-stagger-line" style={line(1)}>
                <span><strong>{education.degree}</strong>, {education.school}</span>
                <span className="record-value">{education.years}</span>
              </div>
              <div className="record-row t-stagger-line" style={line(2)}>
                <span>Cumulative grade point average</span>
                <span className="record-value">{education.cgpa}</span>
              </div>
            </div>

            <div className="record-group t-stagger" data-reveal>
              <h3 className="t-stagger-line">Certifications</h3>
              {certifications.map((cert, i) => (
                <a key={cert.title} href={cert.url} target="_blank" rel="noopener noreferrer" className="record-row record-link t-learn t-stagger-line" style={line(i + 1)}>
                  <span>{cert.title}<Chevron /></span>
                  <span className="record-value">{cert.date}</span>
                </a>
              ))}
            </div>

            <div className="record-group t-stagger" data-reveal>
              <h3 className="t-stagger-line">Stack</h3>
              {skillGroups.map((group, i) => (
                <div key={group.label} className="stack-group t-stagger-line" style={line(i + 1)}>
                  <h4>{group.label}</h4>
                  <ul className="chips">
                    {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-heading">
          <div className="contact-card t-stagger" data-reveal>
            <h2 id="contact-heading" className="t-stagger-line">Have a role or project in mind?</h2>
            <p className="t-stagger-line" style={line(1)}>Email is the fastest way to reach me. I usually respond within 24 hours.</p>
            <a href={`mailto:${contact.email}`} className="contact-email t-stagger-line" style={line(2)}>{contact.email}</a>
            <p className="contact-actions t-stagger-line" style={line(3)}>
              <CopyButton value={contact.email} label="email address" idle="Copy email" className="button button-light" />
              <a href={`tel:${contact.phoneHref}`} className="button button-outline">{contact.phone}</a>
              <CopyButton value={contact.phoneHref} label="phone number" idle="Copy number" className="button button-outline" />
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-columns">
          <div>
            <p>Elsewhere</p>
            <TextLink href={contact.github} external>GitHub</TextLink>
            <TextLink href={contact.linkedin} external>LinkedIn</TextLink>
          </div>
          <div>
            <p>Résumés</p>
            {resumes.map((resume) => (
              <TextLink key={resume.href} href={resume.href} download={resume.file}>{resume.label}</TextLink>
            ))}
          </div>
          <div>
            <p>Projects</p>
            {projects.map((project) => (
              <a key={project.slug} href={homeOf(project)} target="_blank" rel="noopener noreferrer">{project.name}</a>
            ))}
          </div>
          <div>
            <p>Contact</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            <span>{contact.city}</span>
          </div>
        </div>
        <p className="wordmark footer-wordmark" aria-hidden="true">Meet Mehta</p>
        <p className="footer-legal">© 2026 Meet Mehta. Set in Geist.</p>
      </footer>

      <RevealObserver />
    </>
  );
}
