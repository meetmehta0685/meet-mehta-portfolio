import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeSheet from "../../components/CodeSheet";
import LoopVideo from "../../components/LoopVideo";
import { themeVars } from "../../components/ProjectCover";
import { addressOf, projects, shotsOf, sourceFileOf, type CodeProject, type LiveProject } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.name, description: project.summary } : {};
}

function LiveModules({ project }: { project: LiveProject }) {
  const shots = shotsOf(project);
  return (
    <>
      <figure className="module module-shot">
        <Image src={shots.desktop} alt={`${project.name} landing page on desktop`} width={2880} height={1800} sizes="(max-width: 1100px) 100vw, 1100px" preload />
        <LoopVideo src={shots.loop} />
      </figure>
      <figure className="module module-field" style={themeVars(project)}>
        <Image src={shots.mobile} alt={`${project.name} landing page on a phone`} width={1170} height={2532} sizes="(max-width: 640px) 60vw, 300px" className="module-phone" />
      </figure>
    </>
  );
}

function CodeModules({ project }: { project: CodeProject }) {
  return (
    <figure className="module module-field module-code" style={themeVars(project)}>
      <CodeSheet source={project.excerpt.source} />
      <figcaption>
        <p>{project.excerpt.caption}</p>
        <a href={sourceFileOf(project)} target="_blank" rel="noopener noreferrer">{project.excerpt.path} ↗</a>
      </figcaption>
    </figure>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="project">
      <header className="page-head">
        <h1 className="page-title">{project.name}</h1>
        <p className="page-kind">{project.kind}</p>
        <p className="page-desc">{project.summary}</p>
      </header>

      <div className="modules">
        {project.evidence === "live" ? <LiveModules project={project} /> : <CodeModules project={project} />}
      </div>

      <section className="text-module" aria-labelledby="built-heading">
        <h2 id="built-heading" className="text-heading">What I built</h2>
        <ul className="notes">
          {project.keyAchievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
        <p className="stack">
          <span className="visually-hidden">Built with </span>
          {project.technologies.join("  ·  ")}
        </p>
        <p className="actions">
          {project.evidence === "live" && (
            <a className="button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit {addressOf(project)}</a>
          )}
          {project.githubUrl && (
            <a className="button" href={project.githubUrl} target="_blank" rel="noopener noreferrer">Read the source</a>
          )}
        </p>
      </section>

      <nav className="pager" aria-label="More projects">
        <Link href={`/work/${prev.slug}`}><span>Previous</span>{prev.name}</Link>
        <Link href={`/work/${next.slug}`}><span>Next</span>{next.name}</Link>
      </nav>

      <a href="#top" className="back-to-top">↑ Back to Top</a>
    </article>
  );
}
