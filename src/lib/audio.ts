"use client";

// Lightweight Web Audio API 8-bit Synthesizer
// Zero external assets/mp3 downloads needed, pure synthesized chiptune!

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted: boolean = false;
let isUnlocked: boolean = false;

// Initialize mute state from localStorage if available
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("satoh_portfolio_sfx_muted");
    isMuted = saved === "true";
  } catch {
    isMuted = false;
  }
}

/**
 * Eagerly initializes and unlocks Web Audio context on modern browsers
 */
export function initAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass({ latencyHint: "interactive" });
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(1, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);
      }
    }

    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Play a 1-sample inaudible buffer to unlock hardware audio thread
    if (audioCtx && !isUnlocked) {
      try {
        const buffer = audioCtx.createBuffer(1, 1, 22050);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
        isUnlocked = true;
      } catch {
        // ignore
      }
    }

    return audioCtx;
  } catch {
    return null;
  }
}

// Global eager listener: Unlocks audio on the VERY FIRST gesture anywhere on the screen
if (typeof window !== "undefined") {
  const handleFirstGesture = () => {
    initAudio();
    window.removeEventListener("pointerdown", handleFirstGesture, true);
    window.removeEventListener("keydown", handleFirstGesture, true);
    window.removeEventListener("touchstart", handleFirstGesture, true);
    window.removeEventListener("click", handleFirstGesture, true);
  };

  window.addEventListener("pointerdown", handleFirstGesture, { capture: true, passive: true, once: true });
  window.addEventListener("keydown", handleFirstGesture, { capture: true, passive: true, once: true });
  window.addEventListener("touchstart", handleFirstGesture, { capture: true, passive: true, once: true });
  window.addEventListener("click", handleFirstGesture, { capture: true, passive: true, once: true });
}

function getAudioContext(): AudioContext | null {
  return initAudio();
}

export const sfx = {
  getIsMuted: (): boolean => isMuted,
  
  toggleMute: (): boolean => {
    isMuted = !isMuted;
    try {
      localStorage.setItem("satoh_portfolio_sfx_muted", String(isMuted));
    } catch {
      // ignore
    }
    return isMuted;
  },

  setMuted: (muted: boolean) => {
    isMuted = muted;
    try {
      localStorage.setItem("satoh_portfolio_sfx_muted", String(muted));
    } catch {
      // ignore
    }
  },

  // Button click / blip sound
  click: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // ignore audio errors
    }
  },

  // Select / Nav tab change sound
  select: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.04); // A5

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // ignore
    }
  },

  // Coin / Item collection sound
  coin: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // ignore
    }
  },

  // Level Up / Quest Complete fanfare
  levelUp: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (idx + 1) * 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + (idx + 1) * 0.12);
      });
    } catch {
      // ignore
    }
  },

  // Mega Man X-Buster Shot (pew sound)
  buster: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // ignore
    }
  },

  // Minimalist 8-Bit Energy Pulse Blip (Cực kỳ ngắn, nhẹ nhàng, thanh thoát)
  chargeHum: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft, delicate 45ms sine blip
      osc.type = "sine";
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.045);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // ignore
    }
  },

  // Classic Capcom Mega Man X Charged Shot Laser Cannon
  gigaPlasmaFire: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      
      // Dual square-wave resonant laser blast
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "square";
      osc1.frequency.setValueAtTime(950, now);
      osc1.frequency.exponentialRampToValueAtTime(70, now + 0.26);
      gain1.gain.setValueAtTime(0.16, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.26);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "square";
      osc2.frequency.setValueAtTime(1800, now);
      osc2.frequency.exponentialRampToValueAtTime(140, now + 0.22);
      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.22);
    } catch {
      // ignore
    }
  },

  // Authentic SNES Capcom Impact Explosion
  supernovaDetonation: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Classic SNES Triangle Bass Thud
      const boom = ctx.createOscillator();
      const boomGain = ctx.createGain();
      boom.type = "triangle";
      boom.frequency.setValueAtTime(240, now);
      boom.frequency.exponentialRampToValueAtTime(35, now + 0.38);
      boomGain.gain.setValueAtTime(0.24, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      boom.connect(boomGain);
      boomGain.connect(ctx.destination);
      boom.start(now);
      boom.stop(now + 0.38);

      // 2. Crunchy Chiptune Noise Burst
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  },

  // Legacy Charged Plasma Buster Shot
  chargeShot: () => {
    sfx.chargeHum();
  },

  // Zero Z-Saber Energy Slash
  saber: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  },

  // Crisp Metallic Katana / Z-Saber Sheath Click (Chink sound)
  swordSheath: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(3200, now + 0.07);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore
    }
  },

  // Dimensional Space Shatter Slash Flurry
  dimensionShatter: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 4 rapid micro-slashes at staggered intervals
      [1400, 1100, 1650, 900].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.035;

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.08);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.08);
      });

      // Bass impact thud
      const boom = ctx.createOscillator();
      const bGain = ctx.createGain();
      boom.type = "triangle";
      boom.frequency.setValueAtTime(180, now + 0.12);
      boom.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      bGain.gain.setValueAtTime(0.25, now + 0.12);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      boom.connect(bGain);
      bGain.connect(ctx.destination);
      boom.start(now + 0.12);
      boom.stop(now + 0.35);
    } catch {
      // ignore
    }
  },

  // 8-bit Explosion impact
  explosion: () => {
    sfx.supernovaDetonation();
  },

  // Mega Man Vertical Teleport Beam Out
  teleport: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.35);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);

      // Chime ping at the end
      const chime = ctx.createOscillator();
      const cGain = ctx.createGain();
      chime.type = "sine";
      chime.frequency.setValueAtTime(2200, now + 0.15);
      chime.frequency.exponentialRampToValueAtTime(3500, now + 0.4);
      cGain.gain.setValueAtTime(0.08, now + 0.15);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      chime.connect(cGain);
      cGain.connect(ctx.destination);
      chime.start(now + 0.15);
      chime.stop(now + 0.4);
    } catch {
      // ignore
    }
  },

  // Capcom Mechanical Weapon Switch Beep
  weaponSwitch: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1760, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // ignore
    }
  },

  // Storm Tornado: High-frequency whistling wind vortex
  stormTornado: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      
      // Wind vortex sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.linearRampToValueAtTime(920, now + 0.15);
      osc.frequency.linearRampToValueAtTime(320, now + 0.35);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);

      // Multi-hit wind slice chops
      [0.08, 0.16, 0.24].forEach((delay, idx) => {
        const slice = ctx.createOscillator();
        const sGain = ctx.createGain();
        slice.type = "square";
        slice.frequency.setValueAtTime(1200 - idx * 150, now + delay);
        slice.frequency.exponentialRampToValueAtTime(200, now + delay + 0.06);

        sGain.gain.setValueAtTime(0.1, now + delay);
        sGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);

        slice.connect(sGain);
        sGain.connect(ctx.destination);
        slice.start(now + delay);
        slice.stop(now + delay + 0.06);
      });
    } catch {
      // ignore
    }
  },

  // Triad Thunder: 3-Node Electric Pulse & Arc Discharge
  triadThunder: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 3 rapid electric charge pings
      [0, 0.06, 0.12].forEach((delay, idx) => {
        const ping = ctx.createOscillator();
        const pGain = ctx.createGain();
        ping.type = "sawtooth";
        ping.frequency.setValueAtTime(600 + idx * 400, now + delay);
        ping.frequency.exponentialRampToValueAtTime(1800, now + delay + 0.05);

        pGain.gain.setValueAtTime(0.12, now + delay);
        pGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);

        ping.connect(pGain);
        pGain.connect(ctx.destination);
        ping.start(now + delay);
        ping.stop(now + delay + 0.05);
      });

      // High voltage discharge crackle
      const zap = ctx.createOscillator();
      const zGain = ctx.createGain();
      zap.type = "sawtooth";
      zap.frequency.setValueAtTime(150, now + 0.18);
      zap.frequency.linearRampToValueAtTime(800, now + 0.25);
      zap.frequency.exponentialRampToValueAtTime(50, now + 0.45);

      zGain.gain.setValueAtTime(0.22, now + 0.18);
      zGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      zap.connect(zGain);
      zGain.connect(ctx.destination);
      zap.start(now + 0.18);
      zap.stop(now + 0.45);
    } catch {
      // ignore
    }
  },

  // Hyouryuushou: Ice Uppercut & Crystal Frost Shatter
  iceShatter: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Upward rising icy whoosh
      const rising = ctx.createOscillator();
      const rGain = ctx.createGain();
      rising.type = "sawtooth";
      rising.frequency.setValueAtTime(250, now);
      rising.frequency.exponentialRampToValueAtTime(1400, now + 0.22);

      rGain.gain.setValueAtTime(0.15, now);
      rGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      rising.connect(rGain);
      rGain.connect(ctx.destination);
      rising.start(now);
      rising.stop(now + 0.25);

      // Frost glass shatter sparkles
      [1800, 2400, 3200, 4100].forEach((freq, idx) => {
        const chime = ctx.createOscillator();
        const cGain = ctx.createGain();
        const t = now + 0.18 + idx * 0.03;

        chime.type = "sine";
        chime.frequency.setValueAtTime(freq, t);
        chime.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.08);

        cGain.gain.setValueAtTime(0.09, t);
        cGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

        chime.connect(cGain);
        cGain.connect(ctx.destination);
        chime.start(t);
        chime.stop(t + 0.08);
      });
    } catch {
      // ignore
    }
  },

  // Rekkoha: Ground Punch Impact + 5 Descending Celestial Light Lasers
  rekkoha: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Heavy Ground Punch Thud
      const punch = ctx.createOscillator();
      const pGain = ctx.createGain();
      punch.type = "triangle";
      punch.frequency.setValueAtTime(220, now);
      punch.frequency.exponentialRampToValueAtTime(35, now + 0.28);

      pGain.gain.setValueAtTime(0.3, now);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      punch.connect(pGain);
      pGain.connect(ctx.destination);
      punch.start(now);
      punch.stop(now + 0.28);

      // Celestial Laser Chord Chime (Descending heavenly pillars)
      [523.25, 659.25, 783.99, 1046.5].forEach((noteFreq, idx) => {
        const laser = ctx.createOscillator();
        const lGain = ctx.createGain();
        const t = now + 0.12 + idx * 0.05;

        laser.type = "sine";
        laser.frequency.setValueAtTime(noteFreq * 2, t);
        laser.frequency.linearRampToValueAtTime(noteFreq, t + 0.35);

        lGain.gain.setValueAtTime(0.12, t);
        lGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

        laser.connect(lGain);
        lGain.connect(ctx.destination);
        laser.start(t);
        laser.stop(t + 0.45);
      });
    } catch {
      // ignore
    }
  },
};
