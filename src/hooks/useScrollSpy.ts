"use client";

import { useEffect, useState } from "react";
import { telemetry } from "@/lib/telemetry";

export function useScrollSpy(sectionIds: string[], offset: number = 120): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");

  useEffect(() => {
    let lastActive = "";

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            if (lastActive !== sectionId) {
              lastActive = sectionId;
              setActiveSection(sectionId);
              telemetry.track("section_view", sectionId);
            }
            return;
          }
        }
      }

      if (window.scrollY < 100 && sectionIds.length > 0) {
        if (lastActive !== sectionIds[0]) {
          lastActive = sectionIds[0];
          setActiveSection(sectionIds[0]);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
