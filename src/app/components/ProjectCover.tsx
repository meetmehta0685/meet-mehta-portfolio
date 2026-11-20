import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { shotsOf, type Project } from "@/data/projects";
import CodeSheet from "./CodeSheet";

export const themeVars = (project: Project) =>
  ({
    "--p-field": project.theme.field,
    "--p-ink": project.theme.ink,
    "--p-soft": project.theme.soft,
    "--p-accent": project.theme.accent,
  }) as CSSProperties;

export default function ProjectCover({ project, eager }: { project: Project; eager?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className="cover" style={themeVars(project)}>
      {project.evidence === "live" ? (
        <Image
          src={shotsOf(project).desktop}
          alt=""
          width={2880}
          height={1800}
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 34vw"
          className="cover-image"
          preload={eager}
        />
      ) : (
        <CodeSheet source={project.excerpt.source} className="cover-code" />
      )}
      <span className="cover-details">
        <span className="cover-title">{project.name}</span>
        <span className="cover-kind">{project.kind}</span>
      </span>
    </Link>
  );
}
