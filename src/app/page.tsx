import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Chevron from "./components/Chevron";
import CopyButton from "./components/CopyButton";
import LoopVideo from "./components/LoopVideo";
import RevealObserver from "./components/RevealObserver";
import WorkLedger from "./components/WorkLedger";
import { projects, shotsOf, domainOf, type Project } from "@/data/projects";
import { certifications, contact, education, internship, resumes, skillGroups } from "@/data/profile";

const frictions = ["Offers expire.", "Queues pile up.", "Handoffs go missing."];

const line = (i: number) => ({ "--i": i }) as CSSProperties;

function TextLink({ href, children, download, external }: { href: string; children: ReactNode; download?: string; external?: boolean }) {
  return (
    <a
      href={href}
      className="text-link t-learn"
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Chevron />
    </a>
  );
}

function Highlight({ tone, children }: { tone: "blue" | "mint" | "sun" | "coral"; children: ReactNode }) {
  return <mark data-tone={tone}>{children}</mark>;
}

function Chapter({ project, index }: { project: Project; index: number }) {
  const shots = shotsOf(project);
  const theme = {
    "--field": project.theme.field,
    "--ink": project.theme.ink,
    "--soft": project.theme.soft,
    "--accent": project.theme.accent,
  } as CSSProperties;

  return (
    <article id={project.slug} className="chapter" data-flip={index % 2 === 1} style={theme} aria-labelledby={`${project.slug}-name`}>
      <div className="chapter-head t-stagger" data-reveal>
        <h3 id={`${project.slug}-name`} className="t-stagger-line" style={line(0)}>{project.name}</h3>
        <p className="chapter-kind t-stagger-line" style={line(1)}>{project.kind}</p>
        <p className="chapter-summary t-stagger-line" style={line(2)}>{project.summary}</p>
      </div>

      <div className="chapter-shots">
        <figure className="shot-desktop">
          <Image src={shots.desktop} alt={`${project.name} landing page on desktop`} width={2880} height={1800} sizes="(max-width: 899px) 100vw, 66vw" />
          <LoopVideo src={shots.loop} />
        </figure>
        <figure className="shot-mobile">
          <Image src={shots.mobile} alt={`${project.name} landing page on a phone`} width={1170} height={2532} sizes="(max-width: 899px) 45vw, 22vw" />
        </figure>
      </div>

      <div className="chapter-body t-stagger" data-reveal>
        <ul className="chapter-achievements">
          {project.keyAchievements.map((achievement, i) => (
            <li key={achievement} className="t-stagger-line" style={line(i)}>{achievement}</li>
          ))}
        </ul>
        <p className="chapter-stack t-stagger-line" style={line(1)}>
          <span className="visually-hidden">Built with </span>
          {project.technologies.join(", ")}
        </p>
        <p className="chapter-links t-stagger-line" style={line(2)}>
          <TextLink href={project.liveUrl} external>Visit {domainOf(project.liveUrl)}</TextLink>
          {project.githubUrl && <TextLink href={project.githubUrl} external>Read the source</TextLink>}
        </p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <main>
        <header className="hero">
          <div className="hero-intro t-stagger t-load">
            <p className="hero-sentence t-stagger-line" style={line(1)}>
              Full-stack developer. I build software for work that has to move.
            </p>
            <a href="#work" className="button t-stagger-line" style={line(2)}>See the work</a>
          </div>

          <nav className="hero-nav" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#record">Record</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="hero-name">
            <h1 className="wordmark t-load-name">Meet Mehta</h1>
          </div>

          <p className="hero-place">
            {contact.city}
            <span>{education.degree}, {education.school}</span>
          </p>

          <p className="hero-links">
            <TextLink href={contact.github} external>GitHub</TextLink>
            <TextLink href={contact.linkedin} external>LinkedIn</TextLink>
            {resumes.map((resume) => (
              <TextLink key={resume.href} href={resume.href} download={resume.file}>{resume.label}</TextLink>
            ))}
          </p>

          <figure className="hero-phone">
            <Image src={shotsOf(projects[0]).mobile} alt={`${projects[0].name} on a phone`} width={1170} height={2532} sizes="100vw" preload />
          </figure>
        </header>

        <section className="statement" aria-labelledby="statement-heading">
          <div className="staircase t-stagger" data-reveal>
            <ul aria-label="What goes wrong in operational work">
              {frictions.map((text, i) => (
                <li key={text} className="t-stagger-line" style={line(i)}>{text}</li>
              ))}
            </ul>
            <h2 id="statement-heading">
              <span className="t-stagger-line" style={line(3)}>I build the software</span>
              <span className="t-stagger-line" style={line(4)}>that keeps work moving.</span>
            </h2>
          </div>
          <div className="statement-photos">
            <figure>
              <Image src="/me/booth.jpg" alt="Meet Mehta smiling in a restaurant booth" width={1800} height={2400} sizes="(max-width: 899px) 50vw, 18vw" />
            </figure>
            <figure>
              <Image src="/me/evening.jpg" alt="Meet Mehta outdoors in the evening, in a white shirt" width={768} height={1024} sizes="(max-width: 899px) 50vw, 18vw" />
            </figure>
          </div>
          <p className="statement-note">Operational workflows are complex. I build software that makes them reliable, observable, and efficient.</p>
        </section>

        <section id="work" className="work" aria-labelledby="work-heading">
          <div className="work-intro t-stagger" data-reveal>
            <h2 id="work-heading" className="section-heading t-stagger-line">Four products, all live.</h2>
            <p className="lead t-stagger-line" style={line(1)}>Each one handles a real workflow end to end, and each is running today. Pick one to read how it works.</p>
          </div>
          <WorkLedger projects={projects} />
        </section>

        {projects.map((project, index) => (
          <Chapter key={project.slug} project={project} index={index} />
        ))}

        <section id="about" className="about" aria-labelledby="about-heading">
          <h2 id="about-heading" className="section-heading t-stagger" data-reveal>
            <span className="t-stagger-line">About</span>
          </h2>
          <div className="about-columns t-stagger" data-reveal>
            <p className="t-stagger-line">
              <strong>I&apos;m Meet.</strong> I study Computer Science and Engineering at <Highlight tone="blue">Adani University</Highlight> in Ahmedabad,
              specialising in <Highlight tone="mint">Artificial Intelligence and Machine Learning</Highlight>, from 2023 to 2027 with a CGPA of 7.48 out of 10.
              I build full-stack products around real operational work: food redistribution, interview preparation, IELTS practice, and clinical operations.
            </p>
            <p className="t-stagger-line" style={line(1)}>
              From May to July 2026 I was a <Highlight tone="sun">Full Stack Developer Intern at Appendo</Highlight> in Vadodara, where I built a placement portal
              for SVIT with Hono, Supabase, and Prisma, and shared product feedback with the Tyroo.ai team. I also hold three <Highlight tone="coral">AWS Academy</Highlight>{" "}credentials.
              Right now I&apos;m strengthening my full-stack foundations and deciding what to build next.
            </p>
            <p className="about-close t-stagger-line" style={line(2)}>
              <a href="#contact">If you have a role in mind, write to me.</a>
            </p>
          </div>
        </section>

        <section id="record" className="record" aria-labelledby="record-heading">
          <h2 id="record-heading" className="section-heading">Experience and credentials</h2>

          <div className="record-main">
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
          </div>

          <div className="record-stack t-stagger" data-reveal>
            <h3 className="t-stagger-line">Stack</h3>
            {skillGroups.map((group, i) => (
              <div key={group.label} className="stack-group t-stagger-line" style={line(i + 1)}>
                <h4>{group.label}</h4>
                <p>{group.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-heading">
          <div className="contact-top">
            <h2 id="contact-heading" className="t-stagger-line">Have a role or project in mind?</h2>
            <p className="t-stagger-line" style={line(1)}>Email is the fastest way to reach me. I usually respond within 24 hours.</p>
          </div>

          <a href={`mailto:${contact.email}`} className="contact-email">
            <span>mehtameet685@</span><span>gmail.com</span>
          </a>

          <div className="contact-foot">
            <p className="contact-phone">
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
              <CopyButton value={contact.phoneHref} label="phone number" />
            </p>
            <p className="contact-links">
              <TextLink href={contact.linkedin} external>LinkedIn</TextLink>
              <TextLink href={contact.github} external>GitHub</TextLink>
              {resumes.map((resume) => (
                <TextLink key={resume.href} href={resume.href} download={resume.file}>{resume.label}</TextLink>
              ))}
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-columns">
          <div>
            <p>Pages</p>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#record">Record</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <p>Elsewhere</p>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {resumes.map((resume) => (
              <a key={resume.href} href={resume.href} download={resume.file}>{resume.label}</a>
            ))}
          </div>
          <div>
            <p>Contact</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            <span>{contact.city}</span>
          </div>
          <div>
            <p>Projects</p>
            {projects.map((project) => (
              <a key={project.slug} href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.name}</a>
            ))}
          </div>
        </div>
        <div className="footer-sign">
          <p className="wordmark footer-wordmark" aria-hidden="true">Meet Mehta</p>
          <p className="footer-legal">© 2026 Meet Mehta. Set in Hanken Grotesk.</p>
        </div>
      </footer>

      <RevealObserver />
    </>
  );
}
