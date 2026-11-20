import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { certifications, education, internship, resumes, skillGroups } from "@/data/profile";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="about">
      <header className="page-head">
        <h1 className="page-title">About</h1>
        <p className="page-desc">
          I&apos;m Meet. I study Computer Science and Engineering at Adani University in Ahmedabad, specialising in Artificial Intelligence and
          Machine Learning, from 2023 to 2027. I build full-stack products around real operational work: food redistribution, interview
          preparation, IELTS practice, and clinical operations. I also build smaller systems in Go, like a reverse proxy and an encrypted
          clipboard sync tool.
        </p>
      </header>

      <div className="portraits">
        <figure>
          <Image src="/me/booth.jpg" alt="Meet Mehta smiling in a restaurant booth" width={1800} height={2400} sizes="(max-width: 640px) 46vw, 340px" preload />
        </figure>
        <figure>
          <Image src="/me/evening.jpg" alt="Meet Mehta outdoors in the evening, in a white shirt" width={768} height={1024} sizes="(max-width: 640px) 46vw, 340px" />
        </figure>
      </div>

      <section className="text-module" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="text-heading">Experience</h2>
        <p className="entry">
          <strong>{internship.role}</strong>
          <span>{internship.company} · {internship.where} · {internship.when}</span>
        </p>
        <ul className="notes">
          {internship.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="text-module" aria-labelledby="education-heading">
        <h2 id="education-heading" className="text-heading">Education</h2>
        <p className="entry">
          <strong>{education.degree}</strong>
          <span>{education.school} · {education.years} · CGPA {education.cgpa}</span>
        </p>
      </section>

      <section className="text-module" aria-labelledby="certs-heading">
        <h2 id="certs-heading" className="text-heading">Certifications</h2>
        {certifications.map((cert) => (
          <p key={cert.title} className="entry">
            <a href={cert.url} target="_blank" rel="noopener noreferrer"><strong>{cert.title} ↗</strong></a>
            <span>{cert.date}</span>
          </p>
        ))}
      </section>

      <section className="text-module" aria-labelledby="stack-heading">
        <h2 id="stack-heading" className="text-heading">Stack</h2>
        {skillGroups.map((group) => (
          <p key={group.label} className="entry">
            <strong>{group.label}</strong>
            <span>{group.skills.join(", ")}</span>
          </p>
        ))}
      </section>

      <section className="text-module" aria-labelledby="resume-heading">
        <h2 id="resume-heading" className="text-heading">Résumé</h2>
        <p className="actions">
          {resumes.map((resume) => (
            <a key={resume.href} className="button" href={resume.href} download={resume.file}>{resume.label}</a>
          ))}
        </p>
        <p className="closing">
          <Link href="/contact">If you have a role in mind, write to me.</Link>
        </p>
      </section>

      <a href="#top" className="back-to-top">↑ Back to Top</a>
    </article>
  );
}
