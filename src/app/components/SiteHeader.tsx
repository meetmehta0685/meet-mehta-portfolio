"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/data/profile";
import { SocialIcons } from "./Icons";

const pages = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" || pathname.startsWith("/work") : pathname.startsWith(href);

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const opener = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const trigger = opener.current;
    root.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header id="top" className="site-header">
      <Link href="/" className="logo" aria-label="Meet Mehta, home">
        <Image src="/me/avatar.jpg" alt="" width={192} height={192} className="logo-mark" unoptimized preload />
        <span className="logo-name">Meet Mehta</span>
      </Link>

      <button
        ref={opener}
        type="button"
        className="hamburger"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
      >
        <span className="visually-hidden">Open menu</span>
        <i />
        <i />
        <i />
      </button>

      <div id="site-menu" className="menu" data-open={open} inert={!open} role="dialog" aria-modal="true" aria-label="Site menu">
        <button type="button" className="menu-close" onClick={() => setOpen(false)}>
          <span className="visually-hidden">Close menu</span>
          <i />
          <i />
        </button>
        <nav aria-label="Primary">
          {pages.map((page, i) => (
            <Link
              key={page.href}
              ref={i === 0 ? firstLink : undefined}
              href={page.href}
              className="menu-link"
              aria-current={isActive(pathname, page.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {page.label}
            </Link>
          ))}
        </nav>
        <SocialIcons email={contact.email} github={contact.github} linkedin={contact.linkedin} />
      </div>
    </header>
  );
}
