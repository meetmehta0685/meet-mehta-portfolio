"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Cpu, Layers, Activity } from "lucide-react";
import { Project } from "@/data/projects";
import { GithubIcon } from "./Icons";
import {
  PrepRoomSimulator,
  HarvestRelaySimulator,
  IELTSPrepSimulator,
  AurumQMSSimulator
} from "./ProjectSimulations";
import { sound } from "./SoundEffects";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const [activeTab, setActiveTab] = useState<"simulator" | "architecture" | "stack">("simulator");

  const drawerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) {
      document.body.style.overflow = "auto";
      return;
    }

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => drawerRef.current?.focus());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.click();
        onClose();
      } else if (e.key === "Tab") {
        if (!drawerRef.current) return;
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderSimulator = () => {
    switch (project.slug) {
      case "preproom":
        return <PrepRoomSimulator />;
      case "harvest-relay":
        return <HarvestRelaySimulator />;
      case "ieltsprep-ai":
        return <IELTSPrepSimulator />;
      case "aurum-qms":
        return <AurumQMSSimulator />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div
        className="project-dialog fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="project-dialog-backdrop absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          ref={drawerRef}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="project-dialog-panel relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden bg-background focus:outline-none"
          tabIndex={-1}
        >
          {/* Top Bar */}
          <div className="project-dialog-header flex items-center justify-between gap-4 border-b border-border-custom px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-accent">
                {project.technologies.slice(0, 2).join(" · ")}
              </span>
              <h2 id="drawer-title" className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                {project.title}
              </h2>
            </div>

            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="icon-button shrink-0"
              aria-label="Close project details"
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div
            role="tablist"
            aria-label="Project Inspector Tabs"
            onKeyDown={(event) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
              const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
              const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
              if (currentIndex < 0) return;
              event.preventDefault();
              const nextIndex = event.key === "Home"
                ? 0
                : event.key === "End"
                  ? tabs.length - 1
                  : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
              tabs[nextIndex]?.focus();
              tabs[nextIndex]?.click();
            }}
            className="project-dialog-tabs flex items-center gap-1 overflow-x-auto border-b border-border-custom px-3 pt-2 text-sm font-semibold sm:px-5"
          >
            <button
              role="tab"
              aria-selected={activeTab === "simulator"}
              onClick={() => {
                sound.click();
                setActiveTab("simulator");
              }}
              className={`flex min-h-11 shrink-0 items-center gap-1.5 border-b-2 px-3 transition-colors ${
                activeTab === "simulator"
                  ? "border-accent text-accent font-bold"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <Activity size={14} /> Demo
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "architecture"}
              onClick={() => {
                sound.click();
                setActiveTab("architecture");
              }}
              className={`flex min-h-11 shrink-0 items-center gap-1.5 border-b-2 px-3 transition-colors ${
                activeTab === "architecture"
                  ? "border-accent text-accent font-bold"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <Layers size={14} /> Features
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "stack"}
              onClick={() => {
                sound.click();
                setActiveTab("stack");
              }}
              className={`flex min-h-11 shrink-0 items-center gap-1.5 border-b-2 px-3 transition-colors ${
                activeTab === "stack"
                  ? "border-accent text-accent font-bold"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <Cpu size={14} /> Tech stack
            </button>
          </div>

          {/* Content Body */}
          <div className="project-dialog-body flex flex-1 flex-col gap-6 overflow-y-auto p-4 text-sm sm:p-6">
            <div className="project-dialog-metrics p-4 text-xs leading-5 text-muted">
              <strong className="mr-1 text-foreground">Illustrative demo.</strong>
              Names, records, quantities, scores, and timing values below are sample interface data, not measured project results.
            </div>

            {/* Tab: Live Simulator */}
            {activeTab === "simulator" && (
              <div className="flex flex-col gap-4">
                <p className="text-[15px] leading-7 text-muted-foreground">
                  {project.summary}
                </p>
                {renderSimulator()}
              </div>
            )}

            {/* Tab: Architecture */}
            {activeTab === "architecture" && (
              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="mb-3 text-base font-bold text-foreground">
                    Key features
                  </h4>
                  <ul className="flex list-disc list-outside flex-col gap-2 pl-5 text-[15px] leading-7 text-muted-foreground">
                    {project.keyAchievements.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>

              </div>
            )}

            {/* Tab: Tech Stack */}
            {activeTab === "stack" && (
              <div className="flex flex-col gap-3">
                <h4 className="mb-1 text-base font-bold text-foreground">
                  What each tool does
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {project.technologies.map((technology) => (
                    <div
                      key={technology}
                      className="flex flex-col gap-1 border-b border-border-custom py-3 last:border-0"
                    >
                      <div className="text-sm font-bold text-accent">{technology}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="project-dialog-footer flex flex-col items-stretch justify-between gap-3 border-t border-border-custom px-4 py-4 text-sm font-semibold sm:flex-row sm:items-center sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="button-primary"
              >
                Visit live site <ArrowUpRight size={15} />
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="button-secondary"
                >
                  <GithubIcon size={15} /> Repository
                </a>
              )}
            </div>

            <span className="text-[10px] text-muted hidden sm:inline-block">
              Press <kbd className="px-1.5 py-0.5 border border-border-custom text-foreground bg-border-custom/20">ESC</kbd> to close
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
