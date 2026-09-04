"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Mail,
  Phone,
  FileText,
  FolderGit2,
  Code2,
  Terminal,
  Compass
} from "lucide-react";
import { projects, Project } from "@/data/projects";
import { sound } from "./SoundEffects";
import { useToast } from "./Toast";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface CommandItem {
  id: string;
  category: "PROJECTS" | "NAVIGATION" | "ACTIONS" | "PROFILES";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onToggleTheme,
  isDarkMode
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundActive, setSoundActive] = useState(() => (typeof window !== "undefined" ? sound.isEnabled() : true));
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard`);
    onClose();
  };

  // Build searchable items list
  const allItems: CommandItem[] = [
    // Projects
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      category: "PROJECTS" as const,
      title: p.title,
      subtitle: p.technologies.slice(0, 3).join(" · "),
      icon: FolderGit2,
      action: () => {
        onSelectProject(p);
        onClose();
      }
    })),

    // Navigation sections
    {
      id: "nav-about",
      category: "NAVIGATION",
      title: "Jump to 01 / Identity (About)",
      icon: Compass,
      action: () => {
        const el = document.getElementById("about");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-work",
      category: "NAVIGATION",
      title: "Jump to 02 / Projects",
      icon: Code2,
      action: () => {
        const el = document.getElementById("work");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-skills",
      category: "NAVIGATION",
      title: "Jump to 03 / Capabilities",
      icon: Terminal,
      action: () => {
        const el = document.getElementById("capabilities");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-experience",
      category: "NAVIGATION",
      title: "Jump to 04 / Experience Timeline",
      icon: Compass,
      action: () => {
        const el = document.getElementById("experience");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-contact",
      category: "NAVIGATION",
      title: "Jump to 07 / Connect (Contact)",
      icon: Mail,
      action: () => {
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },

    // Actions
    {
      id: "action-theme",
      category: "ACTIONS",
      title: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      subtitle: "Toggle visual theme",
      icon: isDarkMode ? Sun : Moon,
      action: () => {
        onToggleTheme();
        showToast(isDarkMode ? "Light mode enabled" : "Dark mode enabled");
        onClose();
      }
    },
    {
      id: "action-sound",
      category: "ACTIONS",
      title: soundActive ? "Mute Web Audio Feedback" : "Enable Web Audio Feedback",
      subtitle: "Toggle synthesized UI sounds",
      icon: soundActive ? VolumeX : Volume2,
      action: () => {
        const next = sound.toggle();
        setSoundActive(next);
        showToast(next ? "Audio feedback enabled" : "Audio muted");
        onClose();
      }
    },
    {
      id: "action-email",
      category: "ACTIONS",
      title: "Copy Email Address",
      subtitle: "mehtameet685@gmail.com",
      icon: Mail,
      action: () => handleCopy("mehtameet685@gmail.com", "Email")
    },
    {
      id: "action-phone",
      category: "ACTIONS",
      title: "Copy Phone Number",
      subtitle: "+91 8320907038",
      icon: Phone,
      action: () => handleCopy("+918320907038", "Phone")
    },
    {
      id: "action-resume",
      category: "ACTIONS",
      title: "Download Resume PDF",
      subtitle: "public/resume.pdf",
      icon: FileText,
      action: () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Meet_Mehta_Resume.pdf";
        link.click();
        showToast("Downloading resume PDF");
        onClose();
      }
    },

    // Profiles
    {
      id: "profile-github",
      category: "PROFILES",
      title: "Open GitHub Profile",
      subtitle: "github.com/meetmehta0685",
      icon: GithubIcon,
      action: () => {
        window.open("https://github.com/meetmehta0685", "_blank");
        onClose();
      }
    },
    {
      id: "profile-linkedin",
      category: "PROFILES",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/meet-mehta685",
      icon: LinkedinIcon,
      action: () => {
        window.open("https://linkedin.com/in/meet-mehta685", "_blank");
        onClose();
      }
    }
  ];

  const filteredItems = allItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Focus trap & navigation handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        sound.click();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sound.tick();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sound.tick();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          sound.click();
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === "Tab") {
        // Trap focus inside modal
        e.preventDefault();
        if (e.shiftKey) {
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
        } else {
          setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
        }
        sound.tick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ type: "spring", stiffness: 450, damping: 28 }}
          className="relative w-full max-w-xl bg-background border border-border-custom shadow-2xl overflow-hidden z-10 font-mono text-xs flex flex-col focus-visible:outline-none"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-border-custom bg-border-custom/5 gap-3">
            <Search size={15} className="text-accent shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search projects, capabilities, actions, contact..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted focus:outline-none text-xs font-mono"
            />
            <div className="flex items-center gap-1.5 text-[10px] text-muted border border-border-custom px-2 py-0.5 select-none">
              <kbd>ESC</kbd>
            </div>
          </div>

          {/* Results List */}
          <div
            ref={listRef}
            className="max-h-[360px] overflow-y-auto p-2 flex flex-col gap-1"
          >
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-muted font-sans text-xs">
                No matching results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.click();
                      item.action();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-3.5 py-2.5 transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-accent text-background font-semibold"
                        : "text-foreground hover:bg-border-custom/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        size={14}
                        className={isSelected ? "text-background" : "text-accent shrink-0"}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="truncate leading-snug">{item.title}</span>
                        {item.subtitle && (
                          <span
                            className={`text-[10px] truncate ${
                              isSelected ? "text-background/80" : "text-muted font-sans"
                            }`}
                          >
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span
                        className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                          isSelected
                            ? "border-background/40 text-background"
                            : "border-border-custom text-muted"
                        }`}
                      >
                        {item.category}
                      </span>
                      {isSelected && <ArrowRight size={12} className="text-background" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Bottom Keyboard Guide */}
          <div className="px-4 py-2.5 border-t border-border-custom bg-border-custom/5 flex items-center justify-between text-[10px] text-muted">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 border border-border-custom bg-border-custom/20">↑</kbd>
                <kbd className="px-1 py-0.5 border border-border-custom bg-border-custom/20">↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 border border-border-custom bg-border-custom/20">↵</kbd> Select
              </span>
            </div>
            <span className="text-accent font-semibold tracking-wider">COMMAND HUD</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
