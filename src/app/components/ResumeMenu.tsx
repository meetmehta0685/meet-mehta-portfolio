"use client";

import { useEffect, useRef, useState } from "react";
import { resumes } from "@/data/profile";

export default function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open]);

  return (
    <div ref={root} className="menu">
      <button type="button" className="button button-accent button-small" aria-expanded={open} aria-controls="resume-menu" onClick={() => setOpen(!open)}>
        Résumé
      </button>
      <div id="resume-menu" className="t-menu" data-open={open} inert={!open}>
        {resumes.map((resume) => (
          <a key={resume.href} href={resume.href} download={resume.file} onClick={() => setOpen(false)}>
            {resume.label}
            <span>PDF</span>
          </a>
        ))}
      </div>
    </div>
  );
}
