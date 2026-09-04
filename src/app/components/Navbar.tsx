"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { sound } from "./SoundEffects";

interface NavbarProps {
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
}

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar({ theme = "light", onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
    sound.click();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200 ${
        isScrolled
          ? "border-border-custom bg-background/95 backdrop-blur-md"
          : "border-transparent bg-background/80"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-bold tracking-[-0.02em] text-foreground transition-colors hover:text-accent"
          onClick={() => sound.click()}
        >
          Meet Mehta
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-[14px] font-medium text-muted-foreground"
              onClick={() => sound.click()}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleTheme?.()}
            className="icon-button"
            aria-label={theme === "light" ? "Use dark theme" : "Use light theme"}
            title={theme === "light" ? "Use dark theme" : "Use light theme"}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          <a href="/resume.pdf" download className="header-resume button-secondary" onClick={() => sound.click()}>
            Résumé
          </a>

          <details className="mobile-menu-button relative">
            <summary className="icon-button" aria-label="Toggle navigation">
              <Menu size={19} />
            </summary>
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="fixed inset-x-0 top-[72px] border-y border-border-custom bg-background px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.12)] sm:px-8">
              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMobileMenu} className="flex min-h-12 items-center rounded-lg px-3 text-base font-semibold text-foreground transition-colors hover:bg-border-custom/35 hover:text-accent">
                    {item.label}
                  </Link>
                ))}
                <a href="/resume.pdf" download onClick={closeMobileMenu} className="col-span-2 mt-1 flex min-h-12 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-semibold text-background">
                  Download résumé
                </a>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
