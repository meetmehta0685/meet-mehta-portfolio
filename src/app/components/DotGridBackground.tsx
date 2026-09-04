"use client";

import { useEffect, useRef } from "react";

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d", { alpha: true });
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let dotColor = "rgba(0,0,0,0.1)";
    let accentColor = "#D35400";

    const updateColors = () => {
      const styles = getComputedStyle(document.documentElement);
      dotColor = styles.getPropertyValue("--border-custom").trim() || "rgba(0,0,0,0.1)";
      accentColor = styles.getPropertyValue("--accent").trim() || "#D35400";
    };

    updateColors();

    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let isRunning = false;
    let prefersReducedMotion = false;
    const gridGap = 32;

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / gridGap) + 1;
      const rows = Math.ceil(height / gridGap) + 1;
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 0.35;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.beginPath();
          ctx.arc(i * gridGap, j * gridGap, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function render() {
      if (document.hidden) {
        isRunning = false;
        return;
      }

      if (prefersReducedMotion) {
        drawStatic();
        isRunning = false;
        return;
      }

      // Smooth mouse interpolation
      const m = mouseRef.current;
      const dxMouse = m.targetX - m.x;
      const dyMouse = m.targetY - m.y;
      m.x += dxMouse * 0.18;
      m.y += dyMouse * 0.18;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gridGap) + 1;
      const rows = Math.ceil(height / gridGap) + 1;
      const maxDist = 130;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridGap;
          const y = j * gridGap;

          const dx = m.x - x;
          const dy = m.y - y;
          const distSq = dx * dx + dy * dy;

          let r = 1;
          let color = dotColor;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const ratio = 1 - dist / maxDist;
            r = 1 + ratio * 2.8;
            color = accentColor;
            ctx.globalAlpha = 0.2 + ratio * 0.8;
          } else {
            ctx.globalAlpha = 0.35;
          }

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Idle detection: if mouse movement has settled, stop loop until next move
      const isSettled = Math.abs(dxMouse) < 0.05 && Math.abs(dyMouse) < 0.05;
      if (isSettled && (m.x < -500 || (Math.abs(m.targetX - m.x) < 0.01 && Math.abs(m.targetY - m.y) < 0.01))) {
        isRunning = false;
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    function startLoop() {
      if (!isRunning && !prefersReducedMotion) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    }

    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotion = motionQuery.matches;
      const motionListener = (e: MediaQueryListEvent) => {
        prefersReducedMotion = e.matches;
        if (!prefersReducedMotion) {
          startLoop();
        } else {
          drawStatic();
        }
      };
      motionQuery.addEventListener("change", motionListener);
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (prefersReducedMotion) {
        drawStatic();
      } else {
        startLoop();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      if (mouseRef.current.x < -500) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
      startLoop();
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
      startLoop();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    if (!prefersReducedMotion) {
      startLoop();
    } else {
      drawStatic();
    }

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
