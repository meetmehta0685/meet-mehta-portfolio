"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { addressOf, projects, shotsOf, sourceFileOf, type Project } from "@/data/projects";
import Chevron from "./Chevron";
import CodeSheet from "./CodeSheet";
import LoopVideo from "./LoopVideo";

function Evidence({ project }: { project: Project }) {
  if (project.evidence === "code") {
    return (
      <figure className="sheet-code">
        <CodeSheet source={project.excerpt.source} />
        <figcaption>
          <p>{project.excerpt.caption}</p>
          <a href={sourceFileOf(project)} target="_blank" rel="noopener noreferrer" className="text-link t-learn">
            {project.excerpt.path}
            <Chevron />
          </a>
        </figcaption>
      </figure>
    );
  }
  const shots = shotsOf(project);
  return (
    <div className="sheet-shots">
      <figure className="sheet-desktop">
        <Image src={shots.desktop} alt={`${project.name} landing page on desktop`} width={2880} height={1800} sizes="(max-width: 799px) 92vw, 760px" />
        <LoopVideo src={shots.loop} />
      </figure>
      <figure className="sheet-phone">
        <Image src={shots.mobile} alt={`${project.name} landing page on a phone`} width={1170} height={2532} sizes="(max-width: 799px) 40vw, 220px" />
      </figure>
    </div>
  );
}

export default function ProjectDialog({ slug, onNavigate }: { slug: string | null; onNavigate: (slug: string | null) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  // Keeps the last project on screen while the sheet animates closed.
  const [shown, setShown] = useState(projects[0].slug);
  if (slug && slug !== shown) setShown(slug);
  const index = projects.findIndex((project) => project.slug === (slug ?? shown));
  const project = projects[index];
  const step = (by: number) => onNavigate(projects[(index + by + projects.length) % projects.length].slug);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (slug && !el.open) el.showModal();
    if (!slug && el.open) el.close();
  }, [slug]);

  const theme = {
    "--field": project.theme.field,
    "--field-ink": project.theme.ink,
    "--field-soft": project.theme.soft,
    "--field-accent": project.theme.accent,
  } as CSSProperties;

  return (
    <dialog
      ref={dialog}
      className="sheet"
      style={theme}
      aria-labelledby="sheet-title"
      onCancel={(event) => {
        event.preventDefault();
        onNavigate(null);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onNavigate(null);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
    >
      <div className="sheet-bar">
        <p className="sheet-count">{index + 1} of {projects.length}</p>
        <div className="sheet-actions">
          <button type="button" className="round-button" onClick={() => step(-1)} aria-label="Previous project">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M10 4L6 8l4 4" /></svg>
          </button>
          <button type="button" className="round-button" onClick={() => step(1)} aria-label="Next project">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 4l4 4-4 4" /></svg>
          </button>
          <button type="button" className="round-button" onClick={() => onNavigate(null)} aria-label="Close" autoFocus>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>
      </div>

      <div key={project.slug} className="sheet-content">
        <div className="sheet-stage">
          <Evidence project={project} />
        </div>

        <div className="sheet-body">
          <div className="sheet-intro">
            <h2 id="sheet-title">{project.name}</h2>
            <p className="sheet-kind">{project.kind}</p>
            <p className="sheet-summary">{project.summary}</p>
            <p className="sheet-links">
              {project.evidence === "live" && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-accent">
                  Visit {addressOf(project)}
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button button-quiet">
                  Read the source
                </a>
              )}
            </p>
          </div>
          <div className="sheet-detail">
            <h3>What I built</h3>
            <ul className="sheet-achievements">
              {project.keyAchievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
            </ul>
            <h3>Built with</h3>
            <ul className="chips">
              {project.technologies.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </dialog>
  );
}
