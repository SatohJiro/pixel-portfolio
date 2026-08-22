"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  swayRadius: number;
  color: string;
  opacity: number;
}

export function PixelSakuraBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Color palettes for Sakura petals
    const lightPalette = ["#f472b6", "#fb7185", "#fbcfe8", "#fda4af", "#f9a8d4"];
    const darkPalette = ["#f472b6", "#fb7185", "#fda4af", "#f9a8d4", "#fbcfe8"];
    const palette = isDark ? darkPalette : lightPalette;

    // Create 45 drifting pixel petals
    const petalCount = Math.min(Math.floor(width / 30), 55);
    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.floor(Math.random() * 4) + 3,
        speedY: Math.random() * 0.8 + 0.5,
        speedX: Math.random() * 0.6 + 0.3,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        swayRadius: Math.random() * 1.5 + 0.5,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: Math.random() * 0.4 + 0.5,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Optimized Animation Loop
    const render = () => {
      if (!isTabVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Draw each pixel sakura petal
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Sway motion
        p.angle += p.angularSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * p.swayRadius;

        // Optimized mouse breeze push effect (Skip Math.sqrt if out of range)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400) {
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 2;
        }

        // Wrap around screen edges
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width + 10) {
          p.x = -10;
        } else if (p.x < -10) {
          p.x = width + 10;
        }

        // Draw 8-bit stepped pixel petal shape
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        const px = Math.floor(p.x);
        const py = Math.floor(p.y);
        const s = p.size;

        ctx.fillRect(px, py, s, s);
        ctx.fillRect(px + s, py + s * 0.5, s * 0.8, s * 0.8);
        ctx.fillRect(px - s * 0.5, py + s * 0.5, s * 0.6, s * 0.6);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Retro Pixel Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-transparent to-rose-100/30 dark:from-indigo-950/40 dark:via-transparent dark:to-slate-950/60" />

      {/* 2. Crisp 24px Pixel Grid */}
      <div className="absolute inset-0 pixel-grid-bg opacity-50 dark:opacity-30" />

      {/* 3. Distant Pixel Mountain Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-25 dark:opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 300"
          className="w-full h-full object-cover preserve-3d"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mount Fuji Pixel Peak */}
          <path
            d="M 600,60 L 640,110 L 680,160 L 760,250 L 850,300 L 350,300 L 440,250 L 520,160 L 560,110 Z"
            className="fill-slate-400 dark:fill-indigo-900"
          />
          {/* Fuji Snow Cap Pixel */}
          <path
            d="M 600,60 L 630,95 L 610,105 L 640,120 L 560,120 L 590,105 L 570,95 Z"
            className="fill-white dark:fill-sky-100 opacity-80"
          />
          {/* Rolling Pixel Foothills */}
          <path
            d="M 0,220 L 120,200 L 260,240 L 400,190 L 550,230 L 700,200 L 880,240 L 1040,190 L 1200,220 L 1200,300 L 0,300 Z"
            className="fill-slate-300 dark:fill-slate-900"
          />
        </svg>
      </div>

      {/* 4. Retro Pixel Sakura Tree (Bottom-Right Landscape Asset) */}
      <div className="absolute -bottom-6 -right-6 sm:bottom-0 sm:right-0 w-72 sm:w-96 h-72 sm:h-96 opacity-40 dark:opacity-30 pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          shapeRendering="crispEdges"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tree Trunk & Gnarled Pixel Branches */}
          <g className="fill-amber-950 dark:fill-amber-900">
            <rect x="150" y="130" width="16" height="70" />
            <rect x="145" y="145" width="24" height="15" />
            <rect x="138" y="160" width="35" height="40" />
            <rect x="120" y="110" width="35" height="12" />
            <rect x="100" y="95" width="25" height="10" />
            <rect x="80" y="80" width="25" height="8" />
            <rect x="140" y="90" width="12" height="40" />
            <rect x="145" y="70" width="20" height="10" />
            <rect x="160" y="55" width="20" height="8" />
            <rect x="110" y="65" width="15" height="8" />
          </g>

          {/* Sakura Blossom Pixel Cloud Layers (Pink Foliage) */}
          {/* Dark Pink Base Shadows */}
          <g className="fill-rose-400 dark:fill-rose-500 opacity-90">
            <rect x="60" y="65" width="45" height="30" />
            <rect x="90" y="50" width="50" height="35" />
            <rect x="135" y="40" width="55" height="35" />
            <rect x="110" y="75" width="40" height="25" />
            <rect x="150" y="65" width="45" height="30" />
            <rect x="45" y="75" width="30" height="20" />
          </g>

          {/* Medium Sakura Pink */}
          <g className="fill-pink-300 dark:fill-pink-400">
            <rect x="65" y="55" width="40" height="25" />
            <rect x="95" y="40" width="45" height="30" />
            <rect x="140" y="30" width="45" height="30" />
            <rect x="115" y="65" width="35" height="20" />
            <rect x="155" y="55" width="35" height="25" />
            <rect x="50" y="70" width="25" height="15" />
          </g>

          {/* Highlight Light Sakura Petals */}
          <g className="fill-pink-100 dark:fill-pink-200 opacity-95">
            <rect x="70" y="50" width="25" height="15" />
            <rect x="105" y="35" width="30" height="18" />
            <rect x="150" y="25" width="30" height="18" />
            <rect x="125" y="60" width="20" height="12" />
            <rect x="165" y="50" width="20" height="15" />
          </g>

          {/* Drifting Petals near the tree */}
          <g className="fill-pink-300 dark:fill-pink-400">
            <rect x="40" y="90" width="4" height="4" />
            <rect x="30" y="110" width="5" height="4" />
            <rect x="55" y="125" width="4" height="4" />
            <rect x="85" y="140" width="5" height="5" />
            <rect x="20" y="135" width="4" height="4" />
            <rect x="110" y="160" width="5" height="4" />
          </g>
        </svg>
      </div>

      {/* 5. Pixel Falling Sakura Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 6. Corner Retro Crosshairs */}
      <div className="absolute top-4 left-4 text-xs font-mono font-bold text-pink-400/40 dark:text-pink-500/30 select-none">
        🌸 [SCENERY: SAKURA RETRO]
      </div>
      <div className="absolute top-4 right-4 text-xs font-mono font-bold text-pink-400/40 dark:text-pink-500/30 select-none">
        +---+
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-mono font-bold text-pink-400/40 dark:text-pink-500/30 select-none">
        +---+
      </div>
    </div>
  );
}
