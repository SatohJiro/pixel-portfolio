"use client";

import { useEffect, useState, useCallback } from "react";
import { TelemetryEvent } from "@/types";
import { telemetry } from "@/lib/telemetry";

export function useTelemetry() {
  const [events, setEvents] = useState<TelemetryEvent[]>(() => {
    if (typeof window === "undefined") return [];
    return telemetry.getEvents();
  });

  const [isOptedOut, setIsOptedOut] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return telemetry.isOptedOut();
  });

  const refreshState = useCallback(() => {
    setEvents(telemetry.getEvents());
    setIsOptedOut(telemetry.isOptedOut());
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      refreshState();
    };

    window.addEventListener("satoh-telemetry-update", handleUpdate);
    return () => {
      window.removeEventListener("satoh-telemetry-update", handleUpdate);
    };
  }, [refreshState]);

  const track = (
    type: TelemetryEvent["type"],
    target?: string,
    metadata?: Record<string, string | number | boolean>
  ) => {
    telemetry.track(type, target, metadata);
  };

  const toggleOptOut = () => {
    const nextVal = !isOptedOut;
    telemetry.setOptOut(nextVal);
    setIsOptedOut(nextVal);
  };

  const clearEvents = () => {
    telemetry.clearEvents();
  };

  return {
    events,
    isOptedOut,
    track,
    toggleOptOut,
    clearEvents,
  };
}
