"use client";

import type { FormEvent } from "react";

// The site has no server to send mail from, so the form composes the message
// and hands it to the visitor's own email app.
export default function ContactForm({ to }: { to: string }) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${from}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        <span>Name <abbr title="required">*</abbr></span>
        <input name="name" type="text" placeholder="Your Name" autoComplete="name" required />
      </label>
      <label>
        <span>Email Address <abbr title="required">*</abbr></span>
        <input name="email" type="email" placeholder="Your Email Address" autoComplete="email" required />
      </label>
      <label>
        <span>Message <abbr title="required">*</abbr></span>
        <textarea name="message" rows={6} placeholder="Your Message" required />
      </label>
      <div className="form-foot">
        <button type="submit" className="button">send</button>
        <p className="form-note">Sending opens your email app with the message ready to send.</p>
      </div>
    </form>
  );
}
