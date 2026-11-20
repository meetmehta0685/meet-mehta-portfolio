"use client";

import { useRef, useState } from "react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const reset = useRef<number>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(reset.current);
    reset.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" className="copy-button" onClick={copy} aria-label={`Copy ${label}`}>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
