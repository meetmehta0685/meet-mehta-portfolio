import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import CopyButton from "../components/CopyButton";
import { contact, resumes } from "@/data/profile";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <article className="contact">
      <header className="page-head">
        <h1 className="page-title">Say hello!</h1>
        <p className="page-desc">Have a role or project in mind? Email is the fastest way to reach me. I usually respond within 24 hours.</p>
      </header>

      <ContactForm to={contact.email} />

      <section className="contact-direct" aria-label="Other ways to reach me">
        <p>
          <a href={`mailto:${contact.email}`} className="contact-email">{contact.email}</a>
        </p>
        <p>
          <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          <CopyButton value={contact.phoneHref} label="phone number" />
        </p>
        <p className="contact-links">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">github</a>
          {resumes.map((resume) => (
            <a key={resume.href} href={resume.href} download={resume.file}>{resume.label.toLowerCase()}</a>
          ))}
        </p>
      </section>
    </article>
  );
}
