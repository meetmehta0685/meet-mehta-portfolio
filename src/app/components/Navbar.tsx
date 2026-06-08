"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Typewriter animation state
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Meet Mehta";
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTyping = (speedMultiplier = 1) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setIsTyping(true);
    let index = 0;
    
    const type = () => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index < fullText.length) {
        const speed = (80 + Math.random() * 40) * speedMultiplier;
        timerRef.current = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };
    
    type();
  };

  useEffect(() => {
    // Initial typing sequence on mount
    timerRef.current = setTimeout(() => {
      startTyping(1.2);
    }, 400);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isTyping) {
      startTyping(0.6); // faster typing on hover
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Determine initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border-custom"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto px-6 flex items-center justify-between font-mono">
        {/* LOGO / MONOGRAM */}
        <Link
          href="/"
          className="text-sm font-bold tracking-widest hover:text-accent transition-editorial flex items-center group/logo"
          onMouseEnter={handleMouseEnter}
        >
          <span>{text}</span>
          <span className={`inline-block w-1.5 h-3.5 bg-accent ml-1 ${isTyping ? "opacity-100" : "cursor-blink"}`} />
        </Link>


        {/* NAVIGATION LINKS */}
        <nav className="hidden sm:flex items-center gap-4 text-xs tracking-wider text-muted font-medium">
          <Link href="/#about" className="hover:text-foreground transition-editorial">
            ABOUT
          </Link>
          <span className="select-none text-border-custom">•</span>
          <Link href="/#work" className="hover:text-foreground transition-editorial">
            WORK
          </Link>
          <span className="select-none text-border-custom">•</span>
          <Link href="/#contact" className="hover:text-foreground transition-editorial">
            CONTACT
          </Link>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 border border-border-custom hover:bg-border-custom/20 transition-editorial text-foreground focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* RESUME BUTTON */}
          <a
            href="/resume.pdf"
            download
            className="border border-foreground text-[11px] px-3.5 py-2 bg-transparent text-foreground hover:bg-foreground hover:text-background font-medium tracking-wide transition-editorial text-center"
          >
            <span className="hidden xs:inline">DOWNLOAD </span>CV
          </a>
        </div>
      </div>
    </header>
  );
}
