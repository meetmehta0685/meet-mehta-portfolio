import ProjectCover from "./components/ProjectCover";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <p className="home-intro">
        Full-stack developer in Ahmedabad. I build software for work that has to move.
        <span>Four live products and two Go systems with public source.</span>
      </p>
      <h1 className="visually-hidden">Work</h1>
      <ul className="covers">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <ProjectCover project={project} eager={i < 2} />
          </li>
        ))}
      </ul>
    </>
  );
}
