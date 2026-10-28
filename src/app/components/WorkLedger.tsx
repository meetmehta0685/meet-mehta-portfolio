"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { addressOf, shotsOf, type Project } from "@/data/projects";
import CodeSheet from "./CodeSheet";

export default function WorkLedger({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="ledger">
      <ol className="ledger-rows">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <a
              href={`#${project.slug}`}
              className="ledger-row"
              data-active={index === active}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className="ledger-name">{project.name}</span>
              <span className="ledger-kind">{project.kind}</span>
              <span className="ledger-domain">{addressOf(project)}</span>
            </a>
          </li>
        ))}
      </ol>

      <div className="ledger-preview" aria-hidden="true">
        {projects.map((project, index) => (
          <figure
            key={project.slug}
            className="ledger-frame"
            data-active={index === active}
            style={{ "--field": project.theme.field, "--ink": project.theme.ink, "--soft": project.theme.soft } as CSSProperties}
          >
            {project.evidence === "live" ? (
              <Image
                src={shotsOf(project).desktop}
                alt=""
                width={2880}
                height={1800}
                sizes="(max-width: 899px) 0px, 40vw"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <CodeSheet source={project.excerpt.source} className="ledger-code" />
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
