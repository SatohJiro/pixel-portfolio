import { TelemetryEvent } from "@/types";

const STORAGE_KEY = "satoh_telemetry_events";
const OPT_OUT_KEY = "satoh_telemetry_opt_out";
const MAX_STORED_EVENTS = 50;

class PrivacyTelemetryEngine {
  private events: TelemetryEvent[] = [];
  private optedOut: boolean = false;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;
    try {
      this.optedOut = localStorage.getItem(OPT_OUT_KEY) === "true";
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch {
      // Fallback gracefully if localStorage is restricted
      this.events = [];
    }
    this.initialized = true;
  }

  public isOptedOut(): boolean {
    if (typeof window === "undefined") return false;
    this.init();
    return this.optedOut;
  }

  public setOptOut(optOut: boolean): void {
    if (typeof window === "undefined") return;
    this.optedOut = optOut;
    try {
      localStorage.setItem(OPT_OUT_KEY, optOut ? "true" : "false");
      if (optOut) {
        this.clearEvents();
      }
    } catch {
      // ignore
    }
    this.notifySubscribers();
  }

  public track(
    type: TelemetryEvent["type"],
    target?: string,
    metadata?: Record<string, string | number | boolean>
  ): void {
    if (typeof window === "undefined") return;
    this.init();
    if (this.optedOut) return;

    const newEvent: TelemetryEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      target,
      timestamp: Date.now(),
      metadata,
    };

    this.events.unshift(newEvent);
    if (this.events.length > MAX_STORED_EVENTS) {
      this.events = this.events.slice(0, MAX_STORED_EVENTS);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events));
    } catch {
      // ignore storage quota errors
    }

    this.notifySubscribers();
  }

  public getEvents(): TelemetryEvent[] {
    if (typeof window === "undefined") return [];
    this.init();
    return [...this.events];
  }

  public clearEvents(): void {
    if (typeof window === "undefined") return;
    this.events = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    this.notifySubscribers();
  }

  private notifySubscribers() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("satoh-telemetry-update"));
    }
  }
}

export const telemetry = new PrivacyTelemetryEngine();
