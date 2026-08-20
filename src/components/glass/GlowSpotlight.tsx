"use client";

import React, { useEffect, useState } from "react";

export function GlowSpotlight() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!hasMoved) setHasMoved(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMoved]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Ambient Gradient Blobs */}
      <div
        className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-indigo-600/20 to-cyan-500/15 blur-[120px] animate-float-slow"
      />
      <div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/15 via-indigo-500/15 to-emerald-500/15 blur-[130px] animate-float-reverse"
      />
      <div
        className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-indigo-600/15 blur-[140px] animate-float-slow"
      />

      {/* Interactive Mouse Spotlight */}
      {hasMoved && (
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.08), rgba(6, 182, 212, 0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />
    </div>
  );
}
