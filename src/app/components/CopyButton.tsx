"use client";

import { useRef } from "react";

const root = () => document.documentElement;
const ms = (name: string) => parseFloat(getComputedStyle(root()).getPropertyValue(name)) || 0;

// transitions.dev "Text morph": shared letters stay put, only the differing part cross-blurs.
function morphText(el: HTMLElement & { morphTimer?: number }, next: string) {
  const prev = el.dataset.text ?? el.textContent ?? "";
  if (prev === next) return;
  el.dataset.text = next;
  window.clearTimeout(el.morphTimer);

  let a = 0;
  while (a < prev.length && a < next.length && prev[a] === next[a]) a++;
  let b = 0;
  while (b < prev.length - a && b < next.length - a && prev[prev.length - 1 - b] === next[next.length - 1 - b]) b++;

  const swap = document.createElement("span");
  swap.className = "t-morph-swap";
  const out = document.createElement("span");
  out.className = "t-morph-old";
  out.setAttribute("aria-hidden", "true");
  out.textContent = prev.slice(a, prev.length - b);
  const inn = document.createElement("span");
  inn.className = "t-morph-new";
  inn.textContent = next.slice(a, next.length - b);
  swap.append(out, inn);

  el.textContent = "";
  el.append(next.slice(0, a), swap, next.slice(next.length - b));

  swap.style.width = out.getBoundingClientRect().width + "px";
  void swap.offsetWidth;
  swap.classList.add("is-morphing");
  swap.style.width = inn.getBoundingClientRect().width + "px";

  el.morphTimer = window.setTimeout(() => {
    el.textContent = next;
  }, Math.max(ms("--text-morph-dur"), ms("--text-morph-resize-dur")) + 40);
}

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const text = useRef<HTMLSpanElement>(null);
  const reset = useRef<number>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    if (!text.current) return;
    morphText(text.current, "Copied");
    window.clearTimeout(reset.current);
    reset.current = window.setTimeout(() => text.current && morphText(text.current, "Copy"), 2000);
  };

  return (
    <button type="button" className="copy-button" onClick={copy} aria-label={`Copy ${label}`}>
      <span ref={text} className="t-morph" aria-live="polite">Copy</span>
    </button>
  );
}
