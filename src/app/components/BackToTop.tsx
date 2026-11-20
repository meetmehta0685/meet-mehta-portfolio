"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#top" className="to-top" data-shown={shown} tabIndex={shown ? 0 : -1} aria-hidden={!shown}>
      <span className="visually-hidden">Back to top</span>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </a>
  );
}
