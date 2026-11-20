import Image from "next/image";
import ProjectCover from "./components/ProjectCover";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <section className="masthead" aria-labelledby="masthead-heading">
        <Image src="/me/booth.jpg" alt="" fill sizes="100vw" className="masthead-photo" preload />
        <div className="masthead-text">
          <h1 id="masthead-heading">
            Hi! I&apos;m Meet Mehta.
            <br />
            I&apos;m a full-stack developer based in Ahmedabad.
          </h1>
          <p>Scroll down to see my work!</p>
        </div>
        <a href="#work" className="masthead-arrow">
          <span className="visually-hidden">Skip to the work</span>
          <svg viewBox="0 0 48 24" width="48" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 2l22 20L46 2" />
          </svg>
        </a>
      </section>

      <section id="work" className="work" aria-label="Work">
        <ul className="covers">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ProjectCover project={project} eager={i < 3} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
