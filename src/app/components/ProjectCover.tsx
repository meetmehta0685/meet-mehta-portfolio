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
    <Link href={`/work/${project.slug}`} className="cover">
      <div className="cover-media" style={themeVars(project)}>
        {project.evidence === "live" ? (
          <>
            <Image
              src={shotsOf(project).desktop}
              alt=""
              width={2880}
              height={1800}
              sizes="(max-width: 640px) 90vw, 45vw"
              className="cover-desktop"
              preload={eager}
            />
            <Image
              src={shotsOf(project).mobile}
              alt=""
              width={1170}
              height={2532}
              sizes="(max-width: 640px) 22vw, 11vw"
              className="cover-phone"
            />
          </>
        ) : (
          <CodeSheet source={project.excerpt.source} className="cover-code" />
        )}
      </div>
      <div className="cover-details">
        <h2 className="cover-title">{project.name}</h2>
        <p className="cover-kind">{project.kind}</p>
      </div>
    </Link>
  );
}
