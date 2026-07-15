"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionLink = motion.create(Link);

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
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] flex items-center transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border-custom"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto px-6 flex items-center justify-between font-mono">
        {/* LOGO / MONOGRAM */}
        <MotionLink
          href="/"
          className="text-[13px] font-bold tracking-widest hover:text-accent transition-editorial flex items-center group/logo uppercase"
          onMouseEnter={handleMouseEnter}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <span>{text}</span>
          <span className={`inline-block w-1.5 h-3.5 bg-accent ml-1 ${isTyping ? "opacity-100" : "cursor-blink"}`} />
        </MotionLink>


        {/* NAVIGATION LINKS */}
        <nav className="hidden sm:flex items-center gap-5 text-[10.5px] tracking-wider text-muted-foreground font-semibold">
          <MotionLink 
            href="/#about" 
            className="hover:text-foreground transition-editorial uppercase"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            ABOUT
          </MotionLink>
          <span className="select-none text-border-custom/50">•</span>
          <MotionLink 
            href="/#work" 
            className="hover:text-foreground transition-editorial uppercase"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            WORK
          </MotionLink>
          <span className="select-none text-border-custom/50">•</span>
          <MotionLink 
            href="/#contact" 
            className="hover:text-foreground transition-editorial uppercase"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            CONTACT
          </MotionLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <motion.button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 border border-border-custom bg-border-custom/5 hover:bg-border-custom/20 transition-all duration-250 text-foreground focus:outline-none cursor-pointer overflow-hidden rounded-none shadow-xs"
            aria-label="Toggle Theme"
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -12, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 12, opacity: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* RESUME BUTTON */}
          <motion.a
            href="/resume.pdf"
            download
            className="border border-foreground text-[10.5px] px-3.5 py-1.5 bg-transparent text-foreground hover:bg-foreground hover:text-background font-semibold tracking-wider transition-editorial text-center cursor-pointer uppercase rounded-none"
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <span className="hidden xs:inline">DOWNLOAD </span>CV
          </motion.a>
        </div>
      </div>
    </header>
  );
}
