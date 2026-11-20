import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { certifications, education, internship, resumes, skillGroups } from "@/data/profile";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="about">
      <figure className="banner">
        <Image src="/me/evening.jpg" alt="Meet Mehta outdoors in the evening, in a white shirt" width={768} height={1024} sizes="(max-width: 1200px) 100vw, 1200px" preload />
        <Image src="/me/booth.jpg" alt="Meet Mehta smiling in a restaurant booth" width={1800} height={2400} sizes="(max-width: 1200px) 100vw, 1200px" />
      </figure>

      <div className="about-body">
        <section aria-labelledby="about-heading">
          <h1 id="about-heading" className="label-heading">About</h1>
          <p>
            I&apos;m Meet. I study Computer Science and Engineering at Adani University in Ahmedabad, specialising in Artificial
            Intelligence and Machine Learning, from 2023 to 2027. I build full-stack products around real operational work: food
            redistribution, interview preparation, IELTS practice, and clinical operations. I also build smaller systems in Go, like a
            reverse proxy and an encrypted clipboard sync tool.
          </p>
        </section>

        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="label-heading">Experience</h2>
          <p>
            <strong>{internship.role}</strong>, {internship.company} — {internship.where}, {internship.when}
          </p>
          <ul className="notes">
            {internship.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="education-heading">
          <h2 id="education-heading" className="label-heading">Education</h2>
          <p>
            <strong>{education.degree}</strong>, {education.school} — {education.years} — CGPA {education.cgpa}
          </p>
        </section>

        <section aria-labelledby="what-heading">
          <h2 id="what-heading" className="label-heading">What I use</h2>
          {skillGroups.map((group) => (
            <p key={group.label} className="dash-list">
              <strong>{group.label}:</strong> {group.skills.join(" — ")}
            </p>
          ))}
        </section>

        <section aria-labelledby="certs-heading">
          <h2 id="certs-heading" className="label-heading">Certifications</h2>
          <p className="dash-list">
            {certifications.map((cert, i) => (
              <span key={cert.title}>
                {i > 0 && " — "}
                <a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.title}</a> ({cert.date})
              </span>
            ))}
          </p>
        </section>

        <section aria-labelledby="resume-heading">
          <h2 id="resume-heading" className="label-heading">Résumé</h2>
          <p className="actions actions-start">
            {resumes.map((resume) => (
              <a key={resume.href} className="button" href={resume.href} download={resume.file}>{resume.label.toLowerCase()}</a>
            ))}
          </p>
          <p className="shout">
            <Link href="/contact">For roles and projects, get in touch!</Link>
          </p>
        </section>
      </div>
    </article>
  );
}
