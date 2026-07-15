"use client";

import { useEffect, useRef } from "react";

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Cache computed colors
    let dotColor = "rgba(0,0,0,0.1)";
    let accentColor = "#D35400";

    const updateColors = () => {
      const styles = getComputedStyle(document.documentElement);
      dotColor = styles.getPropertyValue("--border-custom").trim() || "rgba(0,0,0,0.1)";
      accentColor = styles.getPropertyValue("--accent").trim() || "#D35400";
    };

    updateColors();

    // Listen to theme toggles via MutationObserver on HTML class list changes
    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const gridGap = 32;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const cols = Math.ceil(width / gridGap) + 1;
      const rows = Math.ceil(height / gridGap) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridGap;
          const y = j * gridGap;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 120;
          const maxDistSq = maxDist * maxDist;

          let r = 1;
          let color = dotColor;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const ratio = 1 - dist / maxDist; // 0 to 1 based on proximity
            r = 1 + ratio * 2.5; // grows from 1px to 3.5px
            
            // Mix dotColor and accentColor based on ratio
            color = accentColor;
            ctx.globalAlpha = 0.2 + ratio * 0.8; // get brighter near cursor
          } else {
            ctx.globalAlpha = 0.35; // base opacity for grid dots
          }

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-50"
    />
  );
}
