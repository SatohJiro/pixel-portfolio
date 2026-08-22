"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { sfx } from "@/lib/audio";
import { Zap, Flame, Swords, Trophy, Sparkles } from "lucide-react";

interface FloatingText {
  id: number;
  text: string;
  isCrit?: boolean;
}

interface Projectile {
  id: number;
  type: "bullet" | "plasma" | "hadangeki";
}

export function MegaManBattleScene() {
  // ================= X STATE =================
  const [xScore, setXScore] = useState(420);
  const [xCombo, setXCombo] = useState(0);
  const [xState, setXState] = useState<"idle" | "shooting" | "charging">("idle");
  const [xProjectiles, setXProjectiles] = useState<Projectile[]>([]);
  const [xShake, setXShake] = useState(false);

  // Metool Enemy State
  const [metoolHp, setMetoolHp] = useState(120);
  const [metoolMaxHp, setMetoolMaxHp] = useState(120);
  const [metoolName, setMetoolName] = useState<"METOOL GUARD" | "BATTON BLASTER" | "VILE BOSS">("METOOL GUARD");
  const [metoolHit, setMetoolHit] = useState(false);
  const [metoolExploding, setMetoolExploding] = useState(false);
  const [xDamageTexts, setXDamageTexts] = useState<FloatingText[]>([]);

  // ================= ZERO STATE =================
  const [zeroScore, setZeroScore] = useState(580);
  const [zeroCombo, setZeroCombo] = useState(0);
  const [zeroTeleportPhase, setZeroTeleportPhase] = useState<0 | 1 | 2 | 3>(0); // 0=base, 1=above, 2=behind, 3=front
  const [zeroState, setZeroState] = useState<"idle" | "teleportCombo" | "iaido">("idle");
  const [iaidoPhase, setIaidoPhase] = useState<"idle" | "focus" | "dash" | "sheath" | "shatter">("idle");
  const [iaidoSlashLine, setIaidoSlashLine] = useState(false);
  const [judgmentCutFlurry, setJudgmentCutFlurry] = useState(false);
  const [zeroShake, setZeroShake] = useState(false);

  // Drone Enemy State
  const [droneHp, setDroneHp] = useState(180);
  const [droneMaxHp, setDroneMaxHp] = useState(180);
  const [droneName, setDroneName] = useState<"SPIKY DRONE" | "MECH CARRIER" | "SIGMA MECH">("SPIKY DRONE");
  const [droneHit, setDroneHit] = useState(false);
  const [droneExploding, setDroneExploding] = useState(false);
  const [zeroDamageTexts, setZeroDamageTexts] = useState<FloatingText[]>([]);

  const [xChargeLevel, setXChargeLevel] = useState<0 | 1 | 2 | 3>(0);
  const [xCharging, setXCharging] = useState(false);
  const [plasmaSupernovaBlast, setPlasmaSupernovaBlast] = useState(false);

  // Jet Dash & After-Images Visual Feedback
  const [xAfterImages, setXAfterImages] = useState<Array<{ id: number; color: "cyan" | "amber" | "purple"; offset: number }>>([]);
  const [xJetPlume, setXJetPlume] = useState(false);
  const [xJetDust, setXJetDust] = useState(false);
  const [xGigaSlideActive, setXGigaSlideActive] = useState(false);

  const [zeroAfterImages, setZeroAfterImages] = useState<Array<{ id: number; color: "rose" | "emerald"; offset: number }>>([]);
  const [zeroJetDust, setZeroJetDust] = useState(false);

  // ================= DUAL CROSS GAUGE =================
  const [dualGauge, setDualGauge] = useState(65);
  const [dualFinisherActive, setDualFinisherActive] = useState(false);
  const [dualFinisherPhase, setDualFinisherPhase] = useState<"idle" | "boss_parry" | "x_rapid" | "zero_combo" | "x_charge_sky" | "boss_death" | "victory">("idle");
  const [zeroStrike, setZeroStrike] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [xDualChargeTier, setXDualChargeTier] = useState<0 | 1 | 2 | 3>(0);
  const [bossDyingStep, setBossDyingStep] = useState<0 | 1 | 2 | 3>(0);
  const [teleportingOut, setTeleportingOut] = useState(false);
  const [soloTeleportOut, setSoloTeleportOut] = useState(false);
  const [dualIntroLanding, setDualIntroLanding] = useState(false);
  const [soloTeleportIn, setSoloTeleportIn] = useState(false);
  const [dualDialogueStep, setDualDialogueStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [bossParryClash, setBossParryClash] = useState<"idle" | "waves_flying" | "deflected" | "detonated">("idle");
  const [dualDamageText, setDualDamageText] = useState<string | null>(null);

  // Eagerly pre-decode all battle sprites into GPU memory on mount to prevent any first-action lag
  useEffect(() => {
    const sprites = [
      "/assets/sprites/megaman_x.png",
      "/assets/sprites/zero_saber.png",
      "/assets/sprites/sigma_boss.png",
      "/assets/sprites/metool.png",
      "/assets/sprites/spiky_drone.png",
    ];
    sprites.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  // ================= X ACTIONS =================
  const spawnXDamage = (dmg: number, isCrit = false) => {
    const newText = { id: Date.now() + Math.random(), text: isCrit ? `CRITICAL -${dmg}!` : `-${dmg}`, isCrit };
    setXDamageTexts((prev) => [...prev.slice(-3), newText]);
    setDualGauge((prev) => Math.min(100, prev + 12));
    setTimeout(() => {
      setXDamageTexts((prev) => prev.filter((t) => t.id !== newText.id));
    }, 700);
  };

  const handleXBuster = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (xCharging || dualFinisherActive) return;
    sfx.buster();
    setXState("shooting");
    setXCombo((c) => c + 1);
    setXScore((s) => s + 30);

    // Jet Dash Recoil, Dust & Cyan Ghost After-Images
    setXJetDust(true);
    setXJetPlume(true);
    const ghost1 = { id: Date.now(), color: "cyan" as const, offset: -8 };
    const ghost2 = { id: Date.now() + 1, color: "cyan" as const, offset: -16 };
    setXAfterImages([ghost1, ghost2]);

    setTimeout(() => {
      setXJetDust(false);
      setXJetPlume(false);
      setXAfterImages([]);
    }, 280);

    const projId = Date.now();
    setXProjectiles((prev) => [...prev, { id: projId, type: "bullet" }]);
    setTimeout(() => {
      setXProjectiles((prev) => prev.filter((p) => p.id !== projId));
    }, 320);

    setTimeout(() => {
      setMetoolHit(true);
      spawnXDamage(35);
      setTimeout(() => setMetoolHit(false), 150);

      setMetoolHp((prev) => {
        const next = prev - 35;
        if (next <= 0) {
          triggerMetoolDefeat();
          return 0;
        }
        return next;
      });
    }, 200);

    setTimeout(() => setXState("idle"), 280);
  };

  // Full 3-Tier Interactive Charge Attack (Tụ Lực -> Khai Hỏa Giga Plasma)
  const handleXChargeAttack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (xCharging || dualFinisherActive) return;

    setXCharging(true);
    setXState("charging");
    setXChargeLevel(1);
    
    // Play accelerating buster pew charge sequence
    sfx.chargeHum();

    // Charge Tier 2 Visual Transition (Cyan Aura)
    setTimeout(() => {
      setXChargeLevel(2);
    }, 250);

    // Charge Tier 3 Visual Transition (MAX GIGA CHARGE GOLDEN/PURPLE CYCLONE)
    setTimeout(() => {
      setXChargeLevel(3);
    }, 520);

    // Release Giga Plasma Blast at 750ms
    setTimeout(() => {
      setXCharging(false);
      setXChargeLevel(0);
      setXState("shooting");
      setXCombo((c) => c + 4);
      setXScore((s) => s + 150);
      sfx.gigaPlasmaFire();
      setXShake(true);
      setTimeout(() => setXShake(false), 350);

      // Grand Jet Burst Recoil Slide & Multi-Tier Ghost Trails
      setXGigaSlideActive(true);
      setXJetPlume(true);
      setXJetDust(true);
      const ghostA = { id: Date.now(), color: "amber" as const, offset: -10 };
      const ghostP = { id: Date.now() + 1, color: "purple" as const, offset: -20 };
      const ghostC = { id: Date.now() + 2, color: "cyan" as const, offset: -30 };
      setXAfterImages([ghostA, ghostP, ghostC]);

      setTimeout(() => {
        setXGigaSlideActive(false);
        setXJetPlume(false);
        setXJetDust(false);
        setXAfterImages([]);
      }, 450);

      const projId = Date.now();
      setXProjectiles((prev) => [...prev, { id: projId, type: "plasma" }]);
      setTimeout(() => {
        setXProjectiles((prev) => prev.filter((p) => p.id !== projId));
      }, 420);

      // Supernova Blast upon enemy impact
      setTimeout(() => {
        setPlasmaSupernovaBlast(true);
        setMetoolHit(true);
        sfx.supernovaDetonation();
        spawnXDamage(140, true);

        setTimeout(() => {
          setPlasmaSupernovaBlast(false);
          setMetoolHit(false);
        }, 400);

        setMetoolHp((prev) => {
          const next = prev - 140;
          if (next <= 0) {
            triggerMetoolDefeat();
            return 0;
          }
          return next;
        });
      }, 260);

      setTimeout(() => setXState("idle"), 480);
    }, 750);
  };

  const triggerMetoolDefeat = () => {
    sfx.explosion();
    setMetoolExploding(true);
    setTimeout(() => {
      setMetoolExploding(false);
      if (metoolName === "METOOL GUARD") {
        setMetoolName("BATTON BLASTER");
        setMetoolMaxHp(180);
        setMetoolHp(180);
      } else if (metoolName === "BATTON BLASTER") {
        setMetoolName("VILE BOSS");
        setMetoolMaxHp(300);
        setMetoolHp(300);
      } else {
        setMetoolName("METOOL GUARD");
        setMetoolMaxHp(120);
        setMetoolHp(120);
      }
    }, 400);
  };


  // ================= ABSOLUTE ANCHOR CINEMATIC DUAL FINISHER EXECUTION =================
  // 1. Solo Teleport Out (0-800ms) -> 2. Dual Arena Landing (800-1500ms) -> 3. Pre-Battle Dialogue Exchange (1500-5800ms) -> 4. X Rapid Stun -> 5. Zero Iaido Launch & X 100% Charge -> 6. Dramatic Pause -> 7. X Grand Giga Plasma -> 8. Boss Death -> 9. Victory Stance -> 10. Teleport Out from Dual -> 11. Solo Arenas Teleport In
  const handleDualCrossFinisher = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (dualGauge < 100 || dualFinisherActive || soloTeleportOut || soloTeleportIn) return;

    // Step 1: Trigger Solo Arenas Teleport Beam Out (0ms - 800ms)
    // Mega Man X & Zero in the Solo Arenas ascend into laser beams with teleport sound
    setSoloTeleportOut(true);
    setDualFinisherActive(false);
    setDualIntroLanding(false);
    setDualDialogueStep(0);
    setDualFinisherPhase("idle");
    setZeroStrike(0);
    setXDualChargeTier(0);
    setBossDyingStep(0);
    setTeleportingOut(false);
    setSoloTeleportIn(false);
    sfx.teleport();

    // Step 2: Open Dual Arena & Characters Shoot Down from Sky into Dual Arena (800ms - 1500ms)
    setTimeout(() => {
      setSoloTeleportOut(false);
      setDualFinisherActive(true);
      setDualIntroLanding(true);
      sfx.teleport();
    }, 800);

    // Step 3: Landing Complete -> Pre-Battle Dialogue Exchange (1500ms - 5800ms)
    // Dialogue 1: Boss Sigma (1500ms - 2800ms)
    setTimeout(() => {
      setDualIntroLanding(false);
      setDualDialogueStep(1);
      sfx.chargeHum();
      setDualDamageText("💬 SIGMA: \"FOOLS! YOU CANNOT STOP MY DOMINION!\"");
    }, 1500);

    // Dialogue 2: Zero (2800ms - 4100ms)
    setTimeout(() => {
      setDualDialogueStep(2);
      sfx.saber();
      setDualDamageText("💬 ZERO: \"IT ENDS HERE, SIGMA! PREPARE YOURSELF!\"");
    }, 2800);

    // Dialogue 3: Mega Man X (4100ms - 5200ms)
    setTimeout(() => {
      setDualDialogueStep(3);
      sfx.levelUp();
      setDualDamageText("💬 X: \"WE FIGHT AS ONE! DUAL CROSS ATTACK, INITIATE!\"");
    }, 4100);

    // Dialogue 4: Warning Battle Start Banner (5200ms - 5800ms)
    setTimeout(() => {
      setDualDialogueStep(4);
      sfx.dimensionShatter();
      setDualDamageText("⚠️ WARNING: DUAL COMBAT ENGAGED! ⚠️");
    }, 5200);

    // Step 4: Boss Surprise Counter Attack - Frenzy Barrage of 6x Razor Sword Waves (5800ms - 8300ms)
    // Sigma launches rapid chain of Hadangeki sword waves (5800ms)
    setTimeout(() => {
      setDualDialogueStep(0);
      setDualFinisherPhase("boss_parry");
      setBossParryClash("waves_flying");
      sfx.saber();
      setTimeout(() => sfx.saber(), 180);
      setTimeout(() => sfx.saber(), 360);
      setDualDamageText("⚔️ SIGMA: 6x RAZOR-SHARP DOOM SWORD WAVES!");
    }, 5800);

    // Waves reach X & Zero -> Rapid Dual Deflections (6700ms - 7400ms)
    setTimeout(() => {
      setBossParryClash("deflected");
      sfx.swordSheath();
      sfx.saber();
      setTimeout(() => {
        sfx.buster();
        sfx.dimensionShatter();
      }, 150);
      setXShake(true);
      setZeroShake(true);
      setTimeout(() => {
        setXShake(false);
        setZeroShake(false);
      }, 400);
      setDualDamageText("🛡️ DUAL DEFLECTION! WAVES DEFLECTED OUT OF ARENA!");
    }, 6700);

    // Deflected Waves Detonate with Explosions at Outer Arena Edges (7400ms - 8300ms)
    setTimeout(() => {
      setBossParryClash("detonated");
      sfx.supernovaDetonation();
      setTimeout(() => sfx.supernovaDetonation(), 180);
      setXShake(true);
      setZeroShake(true);
      setTimeout(() => {
        setXShake(false);
        setZeroShake(false);
      }, 350);
      setDualDamageText("💥 DEFLECTED WAVES DETONATED! BOSS STAGGERED!");
    }, 7400);

    // Step 5: Boss Staggered -> Phase 1: X Rapid Buster Stun Starts (8300ms)
    setTimeout(() => {
      setBossParryClash("idle");
      setDualFinisherPhase("x_rapid");

      sfx.buster();
      setTimeout(() => sfx.buster(), 140);
      setTimeout(() => sfx.buster(), 280);
      setTimeout(() => sfx.buster(), 420);
      setDualDamageText("💥 X RAPID STUN: -800 HP [PUSHBACK!]");
      setXScore((s) => s + 1000);
      setZeroScore((s) => s + 1000);
    }, 8300);

    // Phase 2: Zero Teleport Front -> Back -> Iaido Focus Stance -> Iaido Flash Launcher (9200ms)
    // Mega Man X initiates escalating 3-Tier Power Overcharge
    setTimeout(() => {
      setDualFinisherPhase("zero_combo");
      
      // Strike 1: Front Razor Slash (9200ms) & X Charge Tier 1 (35%)
      setZeroStrike(1);
      setXDualChargeTier(1);
      sfx.saber();
      sfx.chargeHum();

      // Strike 2: Back Razor Slash (9600ms) & X Charge Tier 2 (70%)
      setTimeout(() => {
        setZeroStrike(2);
        setXDualChargeTier(2);
        sfx.saber();
        sfx.chargeHum();
      }, 400);

      // Strike 3: Iaido Focus Stance (10000ms) & X Charge Tier 3 (100% MAXIMUM OVERCHARGE)
      setTimeout(() => {
        setZeroStrike(3);
        setXDualChargeTier(3);
        sfx.chargeHum();
        setDualDamageText("⚡ ZERO: IAIDO FOCUS | 🌟 X: MAXIMUM OVERCHARGE 100%!");
      }, 800);

      // Strike 4: Iaido Flash Launcher (Rising Dragon Slash!) launches Boss Airborne (10450ms)
      setTimeout(() => {
        setZeroStrike(4);
        setXDualChargeTier(3);
        sfx.swordSheath();
        setTimeout(() => sfx.dimensionShatter(), 100);
        setDualDamageText("⚔️ RISING DRAGON SLASH: -2800 HP [AIRBORNE LAUNCH!]");
      }, 1250);

      // Dramatic Airborne Suspension Pause (10900ms - 11600ms)
      setTimeout(() => {
        setZeroStrike(0); // Zero lands and stands ready
        setXDualChargeTier(3);
        sfx.chargeHum();
        setDualDamageText("🎯 TARGET LOCKED: AIRBORNE SIGMA | READY GRAND GIGA PLASMA!");
      }, 1700);
    }, 9200);

    // Phase 3: Mega Man X Grand Giga Plasma Cannon Air Obliteration (Fires at 11600ms)
    setTimeout(() => {
      setZeroStrike(0);
      setXDualChargeTier(0);
      setDualFinisherPhase("x_charge_sky");
      sfx.gigaPlasmaFire();
    }, 11600);

    // Phase 4: Classic Capcom Boss Death Sequence (Bullet Impact at 12100ms)
    // Step 1: Bullet Impacts Boss -> Stagger, Damage Flash, Last Words Dialogue 1 (12100ms - 14100ms) [2000ms]
    setTimeout(() => {
      setDualFinisherPhase("boss_death");
      setBossDyingStep(1);
      setXShake(true);
      setZeroShake(true);
      sfx.supernovaDetonation();
      setTimeout(() => {
        setXShake(false);
        setZeroShake(false);
      }, 400);
      setDualDamageText("💬 SIGMA: \"IMPOSSIBLE... MY PERFECTION... DESTROYED?!\"");

      // Step 2: Continuous Multi-Stage Chain Detonations & System Core Collapse (14100ms - 15500ms) [1400ms]
      setTimeout(() => {
        setBossDyingStep(2);
        setDualDamageText("💥 CORE OVERLOAD: -99999 HP! [SYSTEM COLLAPSE]");
        sfx.supernovaDetonation();
        setTimeout(() => sfx.supernovaDetonation(), 220);
        setTimeout(() => sfx.supernovaDetonation(), 480);
        setTimeout(() => sfx.supernovaDetonation(), 750);
        setTimeout(() => sfx.supernovaDetonation(), 1050);
      }, 2000);

      // Step 3: Seamless Final Blast & Disintegration (15500ms - 16400ms) [900ms]
      setTimeout(() => {
        setBossDyingStep(3);
        setDualDamageText("💬 SIGMA: \"CURSE YOU, X... ZERO... AAAAAGGGHH!\"");
        sfx.dimensionShatter();
        setMetoolHp(0);
        setDroneHp(0);
        triggerMetoolDefeat();
        triggerDroneDefeat();
      }, 3400);
    }, 12100);

    // Phase 5: Iconic Victory Pose Stance (16400ms - 18600ms) [2200ms]
    setTimeout(() => {
      setDualFinisherPhase("victory");
      setBossDyingStep(0);
      setDualDamageText(null);
      sfx.swordSheath();
      sfx.levelUp();

      // Mega Man & Zero Beam Out from Dual Arena (18600ms - 19400ms)
      setTimeout(() => {
        setTeleportingOut(true);
        sfx.teleport();
      }, 2200);
    }, 16400);

    // Step 6: Close Dual Arena & Teleport Characters Back into Solo Arenas (19400ms)
    setTimeout(() => {
      setDualFinisherActive(false);
      setDualFinisherPhase("idle");
      setTeleportingOut(false);
      setSoloTeleportIn(true);
      sfx.teleport();

      // Step 7: Materialization Complete in Solo Arenas & Full Reset (21400ms)
      setTimeout(() => {
        setSoloTeleportIn(false);
        setZeroStrike(0);
        setXDualChargeTier(0);
        setBossDyingStep(0);
        setDualGauge(0);
        setDualDamageText(null);
        setMetoolHit(false);
        setDroneHit(false);
      }, 800);
    }, 20600);
  };

  // ================= ZERO ACTIONS =================
  const spawnZeroDamage = (dmg: number, isCrit = false) => {
    const newText = { id: Date.now() + Math.random(), text: isCrit ? `IAIDO CRIT -${dmg}!` : `-${dmg}`, isCrit };
    setZeroDamageTexts((prev) => [...prev.slice(-3), newText]);
    setDualGauge((prev) => Math.min(100, prev + 15));
    setTimeout(() => {
      setZeroDamageTexts((prev) => prev.filter((t) => t.id !== newText.id));
    }, 700);
  };

  // Zero 3-Step Triple Teleport Omni-Slash Combo (Bổ Trên Không -> Đâm Lưng -> Shin Messenkou)
  const handleZeroTeleportCombo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (zeroState !== "idle" || dualFinisherActive) return;
    setZeroState("teleportCombo");
    setZeroCombo((c) => c + 3);
    setZeroScore((s) => s + 60);

    setZeroJetDust(true);
    setTimeout(() => setZeroJetDust(false), 900);

    // Step 1: Teleport ABOVE Drone (200ms)
    setTimeout(() => {
      setZeroTeleportPhase(1);
      sfx.saber();
      setDroneHit(true);
      spawnZeroDamage(50);
      const g1 = { id: Date.now(), color: "rose" as const, offset: -10 };
      setZeroAfterImages([g1]);
      setTimeout(() => setDroneHit(false), 120);
    }, 200);

    // Step 2: Teleport BEHIND Drone (500ms)
    setTimeout(() => {
      setZeroTeleportPhase(2);
      sfx.saber();
      setDroneHit(true);
      spawnZeroDamage(60);
      const g2 = { id: Date.now(), color: "emerald" as const, offset: 12 };
      setZeroAfterImages([g2]);
      setTimeout(() => setDroneHit(false), 120);
    }, 500);

    // Step 3: Teleport in FRONT with upward Shin Messenkou Geyser (800ms)
    setTimeout(() => {
      setZeroTeleportPhase(3);
      sfx.saber();
      sfx.chargeShot();
      setZeroShake(true);
      setTimeout(() => setZeroShake(false), 300);

      const g3 = { id: Date.now(), color: "rose" as const, offset: -8 };
      const g4 = { id: Date.now() + 1, color: "emerald" as const, offset: 8 };
      setZeroAfterImages([g3, g4]);

      setDroneHit(true);
      spawnZeroDamage(110, true);
      setTimeout(() => setDroneHit(false), 220);

      setDroneHp((prev) => {
        const next = prev - 220;
        if (next <= 0) {
          triggerDroneDefeat();
          return 0;
        }
        return next;
      });
    }, 800);

    // Step 4: Teleport back to home base (1150ms)
    setTimeout(() => {
      setZeroTeleportPhase(0);
      setZeroState("idle");
      setZeroAfterImages([]);
    }, 1150);
  };

  // Zero Master Iaido Flash Slash (Nhất Thiểm Tra Kiếm - Judgment Cut)
  const handleZeroIaidoSlash = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (zeroState !== "idle") return;

    setZeroState("iaido");
    setIaidoPhase("focus");
    sfx.chargeHum(); // Minimalist pulse focus

    // Phase 1: Flash Dash Slicing Through Enemy (380ms)
    setTimeout(() => {
      setIaidoPhase("dash");
      setIaidoSlashLine(true);
      setZeroJetDust(true);
      sfx.saber();
      setDroneHit(true);
      setZeroCombo((c) => c + 3);
      setZeroScore((s) => s + 80);

      const g1 = { id: Date.now(), color: "emerald" as const, offset: -25 };
      const g2 = { id: Date.now() + 1, color: "rose" as const, offset: -50 };
      const g3 = { id: Date.now() + 2, color: "emerald" as const, offset: -75 };
      setZeroAfterImages([g1, g2, g3]);
    }, 380);

    // Phase 2: Stand Behind Enemy & Sheath Sword (650ms)
    setTimeout(() => {
      setIaidoPhase("sheath");
    }, 650);

    // Phase 3: Metallic Click / Sheath Locked (880ms)
    setTimeout(() => {
      sfx.swordSheath();
    }, 880);

    // Phase 4: Dimensional Judgment Cut Space Shatter (960ms)
    setTimeout(() => {
      setIaidoPhase("shatter");
      setJudgmentCutFlurry(true);
      sfx.dimensionShatter();
      setZeroShake(true);
      setTimeout(() => setZeroShake(false), 380);

      spawnZeroDamage(180, true);
      setZeroScore((s) => s + 120);

      setDroneHp((prev) => {
        const next = prev - 180;
        if (next <= 0) {
          triggerDroneDefeat();
          return 0;
        }
        return next;
      });
    }, 960);

    // Phase 5: Complete & Return to Base Position (1450ms)
    setTimeout(() => {
      setJudgmentCutFlurry(false);
      setIaidoSlashLine(false);
      setIaidoPhase("idle");
      setZeroState("idle");
      setDroneHit(false);
      setZeroJetDust(false);
      setZeroAfterImages([]);
    }, 1450);
  };

  const triggerDroneDefeat = () => {
    sfx.explosion();
    setDroneExploding(true);
    setTimeout(() => {
      setDroneExploding(false);
      if (droneName === "SPIKY DRONE") {
        setDroneName("MECH CARRIER");
        setDroneMaxHp(240);
        setDroneHp(240);
      } else if (droneName === "MECH CARRIER") {
        setDroneName("SIGMA MECH");
        setDroneMaxHp(380);
        setDroneHp(380);
      } else {
        setDroneName("SPIKY DRONE");
        setDroneMaxHp(180);
        setDroneHp(180);
      }
    }, 400);
  };

  return (
    <div className="w-full relative overflow-hidden py-3 select-none font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Mini-Game Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-3 border-2 border-slate-900 dark:border-slate-100 bg-slate-950 text-white shadow-[3px_3px_0px_0px_#18181b] dark:shadow-[3px_3px_0px_0px_#ffffff]">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Swords className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="tracking-wider">CAPCOM 16-BIT HUNTERS ARENA</span>
          </div>


          {/* DUAL CROSS GAUGE & FINISHER BUTTON */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-28 text-[9px] font-bold text-amber-300">
                <span>CROSS GAUGE</span>
                <span>{dualGauge}%</span>
              </div>
              <div className="w-28 h-2 bg-slate-900 border border-amber-400/60 rounded-xs overflow-hidden mt-0.5">
                <div
                  className={`h-full transition-all duration-300 ${
                    dualGauge >= 100
                      ? "w-full bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-300 shadow-[0_0_10px_#f59e0b] animate-pulse"
                      : "bg-gradient-to-r from-cyan-500 to-amber-400"
                  }`}
                  style={{ width: `${dualGauge}%` }}
                />
              </div>
            </div>

            {dualGauge >= 100 ? (
              <button
                type="button"
                onClick={handleDualCrossFinisher}
                disabled={dualFinisherActive || soloTeleportOut || soloTeleportIn}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 text-black font-black text-xs border-2 border-white shadow-[0_0_20px_#f59e0b] animate-rainbow-gauge active:scale-95 cursor-pointer disabled:opacity-90 flex items-center gap-1.5"
              >
                {soloTeleportOut ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-black animate-spin" />
                    <span>⚡ BEAMING TO DUAL ARENA...</span>
                  </>
                ) : dualFinisherActive ? (
                  <>
                    <Zap className="w-3.5 h-3.5 text-black animate-pulse" />
                    <span>⚔️ DUAL BATTLE ENGAGED!</span>
                  </>
                ) : (
                  <span>🌟 DUAL FINISHER!</span>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="text-cyan-400 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> X: {xScore}
                </span>
                <span className="text-rose-400 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> ZERO: {zeroScore}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* DUAL CROSS FINISHER FULL ARENA CINEMATIC CUT-IN */}
        {dualFinisherActive && (
          <div className="relative mb-4 p-4 sm:p-6 bg-slate-950 border-4 border-amber-400 shadow-[0_0_50px_#f59e0b] flex flex-col items-center justify-center overflow-hidden z-40 animate-in zoom-in-95 duration-300 rounded-xs">
            {/* Theatrical Background Grid & Cyber Beams */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

            {/* Top Cut-in Title & Step Progress Bar */}
            <div className="relative z-10 w-full flex flex-col items-center mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs sm:text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-cyan-300 animate-pulse">
                  {dualDialogueStep > 0 && "💬 PRE-BATTLE DIALOGUE EXCHANGE"}
                  {dualDialogueStep === 0 && dualFinisherPhase === "boss_parry" && "⚡ CLASH: SIGMA ELECTRO-PLASMA ORBS DEFLECTED BY DUAL PARRY!"}
                  {dualDialogueStep === 0 && dualFinisherPhase === "x_rapid" && "⚡ PHASE 1: X RAPID BUSTER STUN (PUSHBACK ENEMY)!"}
                  {dualDialogueStep === 0 && dualFinisherPhase === "zero_combo" && "⚔️ PHASE 2: ZERO BLINK COMBO & IAIDO RISING LAUNCHER!"}
                  {dualDialogueStep === 0 && dualFinisherPhase === "x_charge_sky" && "💥 PHASE 3: X GRAND GIGA PLASMA SKY OBLITERATION!"}
                  {dualDialogueStep === 0 && dualFinisherPhase === "boss_death" && "🔥 PHASE 4: BOSS CHAIN EXPLOSIONS & TOTAL DISINTEGRATION!"}
                  {dualDialogueStep === 0 && dualFinisherPhase === "victory" && "🏆 PHASE 5: VICTORY POSE & TELEPORT TO HUNTER BASE!"}
                </span>
              </div>

              {/* Boss Health Bar */}
              <div className="w-full max-w-md flex flex-col items-center bg-black/90 p-1.5 border border-rose-500/70 shadow-[0_0_15px_#ef4444]">
                <div className="flex items-center justify-between w-full text-[10px] font-black text-rose-300 mb-0.5">
                  <span>💀 MAVERICK BOSS: SIGMA MECH OVERLORD</span>
                  <span>{dualFinisherPhase === "boss_death" || dualFinisherPhase === "victory" ? "0 / 3000 HP [K.O]" : "3000 / 3000 HP"}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 border border-rose-900 rounded-xs overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      dualFinisherPhase === "boss_death" || dualFinisherPhase === "victory"
                        ? "w-0"
                        : dualFinisherPhase === "x_charge_sky"
                        ? "w-1/6 bg-rose-600"
                        : dualFinisherPhase === "zero_combo"
                        ? "w-1/2 bg-amber-500"
                        : "w-4/5 bg-yellow-400"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Absolute Coordinate Anchored Battle Stage */}
            <div className="relative w-full h-72 sm:h-80 bg-slate-950/90 border border-slate-800 rounded-xs overflow-hidden">
              {/* Ground Battle Line Grid */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cyan-950/40 to-transparent border-b-2 border-cyan-500/40 pointer-events-none" />

              {/* Full-Screen Blinding White Flash Out upon Boss Disintegration */}
              {dualFinisherPhase === "boss_death" && bossDyingStep === 3 && (
                <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-screen-white-flash" />
              )}

              {/* INTRO ENCOUNTER DIALOGUE BOX (Sigma -> Zero -> Mega Man X) */}
              {dualDialogueStep > 0 && dualDialogueStep <= 3 && (
                <div className="absolute top-4 inset-x-4 sm:inset-x-12 z-50 animate-in slide-in-from-top duration-250">
                  {dualDialogueStep === 1 && (
                    <div className="bg-black/95 border-2 border-red-500 p-2.5 sm:p-3.5 shadow-[0_0_35px_rgba(239,68,68,0.9)] flex items-center gap-3.5 rounded-xs">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 border-2 border-red-400 bg-red-950/90 shrink-0 flex items-center justify-center overflow-hidden">
                        <Image src="/assets/sprites/sigma_boss.png" alt="Sigma Boss" fill className="object-contain animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-black text-red-400 font-mono tracking-widest flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span>SIGMA [MAVERICK OVERLORD]</span>
                        </div>
                        <div className="text-xs sm:text-sm font-black text-amber-300 font-mono tracking-wide mt-0.5 animate-pulse">
                          &quot;FOOLS! YOU CANNOT STOP MY REPLIFORCE DOMINION!&quot;
                        </div>
                      </div>
                    </div>
                  )}

                  {dualDialogueStep === 2 && (
                    <div className="bg-black/95 border-2 border-rose-500 p-2.5 sm:p-3.5 shadow-[0_0_35px_rgba(244,63,94,0.9)] flex items-center gap-3.5 rounded-xs">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 border-2 border-rose-400 bg-rose-950/90 shrink-0 flex items-center justify-center overflow-hidden">
                        <Image src="/assets/sprites/zero_saber.png" alt="Zero Hunter" fill className="object-contain animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-black text-rose-400 font-mono tracking-widest flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                          <span>ZERO [SPECIAL S-CLASS HUNTER]</span>
                        </div>
                        <div className="text-xs sm:text-sm font-black text-rose-200 font-mono tracking-wide mt-0.5 animate-pulse">
                          &quot;IT ENDS HERE, SIGMA! PREPARE YOURSELF!&quot;
                        </div>
                      </div>
                    </div>
                  )}

                  {dualDialogueStep === 3 && (
                    <div className="bg-black/95 border-2 border-cyan-400 p-2.5 sm:p-3.5 shadow-[0_0_35px_rgba(34,211,238,0.9)] flex items-center gap-3.5 rounded-xs">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 border-2 border-cyan-300 bg-cyan-950/90 shrink-0 flex items-center justify-center overflow-hidden">
                        <Image src="/assets/sprites/megaman_x.png" alt="Mega Man X" fill className="object-contain animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-black text-cyan-300 font-mono tracking-widest flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                          <span>MEGA MAN X [MAVERICK HUNTER]</span>
                        </div>
                        <div className="text-xs sm:text-sm font-black text-cyan-100 font-mono tracking-wide mt-0.5 animate-pulse">
                          &quot;WE FIGHT AS ONE! DUAL CROSS ATTACK, INITIATE!&quot;
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* BATTLE START WARNING BANNER */}
              {dualDialogueStep === 4 && (
                <div className="absolute top-4 inset-x-4 sm:inset-x-12 z-50 animate-in zoom-in-90 duration-200 flex justify-center">
                  <div className="bg-red-600 border-2 border-yellow-300 px-6 py-2 shadow-[0_0_40px_#ef4444] flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-300 animate-bounce" />
                    <span className="text-xs sm:text-sm font-black tracking-widest text-yellow-300 font-mono animate-pulse">
                      ⚠️ WARNING: DUAL COMBAT ENGAGED! ⚠️
                    </span>
                    <Zap className="w-5 h-5 text-yellow-300 animate-bounce" />
                  </div>
                </div>
              )}

              {/* RETRO BOSS DIALOGUE BOX (Step 1 of Boss Death) */}
              {dualFinisherPhase === "boss_death" && bossDyingStep === 1 && (
                <div className="absolute top-4 inset-x-4 sm:inset-x-12 z-50 animate-in slide-in-from-top duration-300">
                  <div className="bg-black/95 border-2 border-red-500 p-2.5 sm:p-3.5 shadow-[0_0_35px_rgba(239,68,68,0.9)] flex items-center gap-3.5 rounded-xs">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 border-2 border-red-400 bg-red-950/90 shrink-0 flex items-center justify-center overflow-hidden">
                      <Image src="/assets/sprites/sigma_boss.png" alt="Sigma Maverick Boss" fill className="object-contain animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-black text-red-400 font-mono tracking-widest flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>SIGMA [MAVERICK OVERLORD]</span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-amber-300 font-mono tracking-wide mt-0.5 animate-pulse">
                        &quot;IMPOSSIBLE... THIS DUAL OVERCHARGE POWER... ARRRGHHH!&quot;
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* S-Rank Stage Clear Banner upon victory */}
              {dualFinisherPhase === "victory" && (
                <div className="absolute top-4 inset-x-4 sm:inset-x-10 z-50 flex flex-col items-center animate-victory-banner">
                  <div className="bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-black font-black text-xs sm:text-sm px-6 py-2 border-2 border-white shadow-[0_0_40px_#facc15] flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-black animate-spin" />
                    <span className="tracking-widest">MISSION ACCOMPLISHED - RANK S!</span>
                    <Sparkles className="w-4 h-4 text-yellow-900 animate-bounce" />
                  </div>
                </div>
              )}

              {/* Intro Teleport Light Beam Pillars (Shooting Down from Sky upon Entering Dual Arena) */}
              {dualIntroLanding && (
                <>
                  <div className="absolute bottom-0 left-[6%] sm:left-[10%] w-20 h-full bg-gradient-to-t from-cyan-400 via-white to-transparent shadow-[0_0_50px_#38bdf8] pointer-events-none z-35 animate-teleport-beam-in flex items-center justify-center">
                    <div className="w-6 h-full bg-white shadow-[0_0_30px_#ffffff]" />
                  </div>
                  <div className="absolute bottom-0 right-[6%] sm:right-[10%] w-20 h-full bg-gradient-to-t from-rose-500 via-amber-300 to-transparent shadow-[0_0_50px_#ef4444] pointer-events-none z-35 animate-teleport-beam-in flex items-center justify-center">
                    <div className="w-6 h-full bg-white shadow-[0_0_30px_#ffffff]" />
                  </div>
                </>
              )}

              {/* Outro Vertical Teleport Light Beam Pillars (Ascending up to Sky from Victory Stance) */}
              {teleportingOut && (
                <>
                  <div className="absolute bottom-0 left-[30%] sm:left-[33%] w-20 h-full bg-gradient-to-t from-cyan-400 via-white to-transparent shadow-[0_0_50px_#38bdf8] pointer-events-none z-35 animate-teleport-beam flex items-center justify-center">
                    <div className="w-6 h-full bg-white shadow-[0_0_30px_#ffffff]" />
                  </div>
                  <div className="absolute bottom-0 left-[54%] sm:left-[52%] w-20 h-full bg-gradient-to-t from-rose-500 via-amber-300 to-transparent shadow-[0_0_50px_#ef4444] pointer-events-none z-35 animate-teleport-beam flex items-center justify-center">
                    <div className="w-6 h-full bg-white shadow-[0_0_30px_#ffffff]" />
                  </div>
                </>
              )}

              {/* ================= 1. MEGA MAN X ================= */}
              {/* Victory Phase: Centered beside Zero in Victory Stance */}
              {dualFinisherPhase === "victory" ? (
                <div
                  className={`absolute left-[30%] sm:left-[33%] bottom-[10%] z-25 flex flex-col items-center ${
                    teleportingOut ? "animate-character-beam-out" : "animate-in zoom-in-95 duration-200"
                  }`}
                >
                  <div className="relative w-[6.25rem] h-[6.25rem] sm:w-28 sm:h-28">
                    <Image
                      src="/assets/sprites/megaman_x.png"
                      alt="Mega Man X Victory Pose"
                      fill
                      sizes="140px"
                      className="object-contain drop-shadow-[0_0_30px_#38bdf8]"
                      priority
                    />
                    {!teleportingOut && (
                      <div className="absolute -inset-3 rounded-full border-2 border-cyan-400/80 shadow-[0_0_25px_#22d3ee] animate-ping pointer-events-none" />
                    )}
                  </div>
                  <span className="text-[10px] font-black text-cyan-300 mt-1 bg-black/90 px-2.5 py-0.5 border border-cyan-400">
                    MEGA MAN X: S-RANK!
                  </span>
                </div>
              ) : (
                /* Battle Stance on Left */
                <div
                  className={`absolute left-[8%] sm:left-[12%] bottom-[10%] z-20 flex flex-col items-center transition-all ${
                    dualIntroLanding
                      ? "animate-character-beam-in"
                      : dualFinisherPhase === "x_charge_sky"
                      ? "rotate-[-10deg]"
                      : ""
                  }`}
                >
                  {/* 16-Bit Real-Time Dual Charge Meter HUD above X */}
                  {xDualChargeTier > 0 && (
                    <div className="absolute -top-12 inset-x-[-35px] flex flex-col items-center pointer-events-none z-35 animate-charge-bar">
                      <div className="bg-black/95 border-2 border-cyan-400 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-black text-cyan-300 flex items-center gap-1 shadow-[0_0_15px_#22d3ee] whitespace-nowrap">
                        <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
                        <span>
                          {xDualChargeTier === 3
                            ? "🌟 MAXIMUM OVERCHARGE: 100%!"
                            : xDualChargeTier === 2
                            ? "⚡ SUPERCHARGE: 70%..."
                            : "⚡ CHARGING BUSTER: 35%..."}
                        </span>
                      </div>
                      <div className="w-28 sm:w-32 h-2 bg-slate-900 border-2 border-cyan-400 mt-1 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            xDualChargeTier === 3
                              ? "bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-300 w-full animate-pulse"
                              : xDualChargeTier === 2
                              ? "bg-gradient-to-r from-cyan-400 to-blue-500 w-2/3"
                              : "bg-emerald-400 w-1/3"
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  <div className="relative w-[6.25rem] h-[6.25rem] sm:w-28 sm:h-28">
                    {/* Full-Body Escalating Power Charge Aura */}
                    {xDualChargeTier > 0 && (
                      <div
                        className={`absolute -inset-6 sm:-inset-8 rounded-full border-2 transition-all duration-300 animate-charge-aura pointer-events-none ${
                          xDualChargeTier === 3
                            ? "border-amber-300 shadow-[0_0_50px_#f59e0b,0_0_90px_#c084fc]"
                            : xDualChargeTier === 2
                            ? "border-cyan-300 shadow-[0_0_35px_#22d3ee]"
                            : "border-emerald-300 shadow-[0_0_20px_#10b981]"
                        }`}
                      />
                    )}

                    <Image
                      src="/assets/sprites/megaman_x.png"
                      alt="Mega Man X Dual Finisher Stance"
                      fill
                      sizes="140px"
                      className="object-contain drop-shadow-[0_0_25px_#06b6d4]"
                      priority
                    />

                    {/* PRECISE BUSTER NOZZLE ANCHOR (left: 98%, top: 36.8%) */}
                    <div className="absolute left-[98%] top-[36.8%] -translate-y-1/2 pointer-events-none z-30">
                      {/* Buster Nozzle Muzzle Flare */}
                      {(dualFinisherPhase === "x_rapid" || dualFinisherPhase === "x_charge_sky") && (
                        <div className={`w-6 h-6 -ml-3 rounded-full bg-cyan-300 shadow-[0_0_20px_#38bdf8] animate-ping ${dualFinisherPhase === "x_rapid" ? "-mt-4" : "-mt-3"}`} />
                      )}

                      {/* Phase 1: Rapid Normal Buster Pellets (Identical Visual to Solo Mode) */}
                      {dualFinisherPhase === "x_rapid" && (
                        <div className="relative -top-1">
                          {[0, 80, 160, 240].map((delay, idx) => (
                            <div
                              key={idx}
                              className="absolute left-0 top-0 -translate-y-1/2 flex items-center"
                            >
                              <div
                                className="flex items-center gap-1 animate-x-dual-rapid"
                                style={{ animationDelay: `${delay}ms` }}
                              >
                                {/* Authentic Multi-layer Lemon Buster Pellet */}
                                <div className="w-6 h-4 bg-gradient-to-r from-cyan-400 via-sky-300 to-white rounded-full shadow-[0_0_14px_#38bdf8]" />
                                <div className="w-2.5 h-2.5 -ml-1 bg-white rounded-full shadow-[0_0_10px_#ffffff]" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Phase 3: Supreme Grand Giga Plasma Bullet (Identical DNA to Solo Mode Giga Plasma) */}
                      {dualFinisherPhase === "x_charge_sky" && (
                        <div className="absolute left-0 top-0 -translate-y-1/2 animate-x-dual-grand-plasma flex items-center">
                          {/* Blazing Aerodynamic Plasma Trail */}
                          <div className="absolute -left-24 w-36 h-12 bg-gradient-to-r from-transparent via-cyan-400 to-purple-600 rounded-full blur-xs opacity-90" />
                          <div className="absolute -left-16 w-24 h-8 bg-gradient-to-r from-transparent via-white to-cyan-300 rounded-full blur-xs" />
                          
                          {/* Outer Electric Vortex Rings */}
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-200 border-dashed animate-plasma-spin shadow-[0_0_40px_#22d3ee]" />
                            <div className="absolute inset-2 rounded-full border-2 border-purple-400 animate-spin shadow-[0_0_30px_#c084fc]" />
                            
                            {/* Solar White-Hot Supernova Plasma Core */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-[0_0_55px_#38bdf8,inset_0_0_25px_#22d3ee] flex items-center justify-center animate-pulse">
                              <div className="w-8 h-8 rounded-full bg-cyan-200 shadow-[0_0_25px_#ffffff]" />
                            </div>

                            {/* Orbiting Spark Particles */}
                            <div className="absolute top-1 right-2 w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_15px_#fde047] animate-ping" />
                            <div className="absolute bottom-1 left-2 w-4.5 h-4.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#38bdf8] animate-ping" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Phase 2: High-Concentration Pre-Shot Solar Plasma Ball growing at Buster Nozzle */}
                    {xDualChargeTier > 0 && (
                      <div className="absolute left-[98%] top-[36.8%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex items-center justify-center">
                        <div
                          className={`rounded-full border-2 border-dashed animate-spin transition-all duration-300 ${
                            xDualChargeTier === 3
                              ? "w-20 h-20 border-yellow-300 shadow-[0_0_40px_#facc15]"
                              : xDualChargeTier === 2
                              ? "w-14 h-14 border-cyan-300 shadow-[0_0_25px_#38bdf8]"
                              : "w-10 h-10 border-emerald-400 shadow-[0_0_15px_#34d399]"
                          }`}
                        />
                        <div
                          className={`rounded-full bg-white transition-all duration-300 animate-pulse ${
                            xDualChargeTier === 3
                              ? "w-8 h-8 shadow-[0_0_30px_#ffffff,0_0_60px_#38bdf8]"
                              : xDualChargeTier === 2
                              ? "w-5 h-5 shadow-[0_0_20px_#ffffff]"
                              : "w-3 h-3 shadow-[0_0_10px_#ffffff]"
                          }`}
                        />
                      </div>
                    )}

                    {/* Mega Man X Charged Shield Deflection Flash */}
                    {bossParryClash === "deflected" && (
                      <div className="absolute left-[98%] top-[36.8%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 animate-parry-flash">
                        <div className="w-20 h-20 rounded-full border-4 border-cyan-300 bg-cyan-400/40 shadow-[0_0_50px_#22d3ee,inset_0_0_25px_#ffffff] flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white shadow-[0_0_30px_#ffffff]" />
                        </div>
                        <div className="absolute -inset-4 rounded-full border-2 border-yellow-300 shadow-[0_0_25px_#facc15] animate-ping" />
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-black text-cyan-300 mt-1 bg-black/80 px-2 py-0.5 border border-cyan-500">
                    {bossParryClash === "deflected"
                      ? "🛡️ CHARGED SHIELD DEFLECT!"
                      : "MEGA MAN X"}
                  </span>
                </div>
              )}

              {/* ================= SIGMA BARRAGE OF 6x HIGH-VOLTAGE ELECTRO-PLASMA ORBS ================= */}
              {(bossParryClash === "waves_flying" || bossParryClash === "deflected" || bossParryClash === "detonated") && (
                <>
                  {/* === 3 ELECTRO ORBS TOWARDS MEGA MAN X (LEFT) === */}
                  {/* Orb 1: Mid Straight Electro Stream */}
                  <div className="absolute left-1/2 bottom-[14%] pointer-events-none z-35 animate-electro-orb-left-1">
                    <div className="relative w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center animate-electro-orb-pulse">
                      {/* Outer Rotating Lightning Arcs Ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-300 shadow-[0_0_35px_#22d3ee] animate-electro-spin" />
                      <div className="absolute inset-1.5 rounded-full border-2 border-yellow-300 shadow-[0_0_25px_#fde047] animate-spin" />
                      {/* Plasma Nebula Core Glow */}
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-cyan-400 via-yellow-300 to-white shadow-[0_0_45px_#38bdf8,inset_0_0_20px_#ffffff] flex items-center justify-center animate-pulse">
                        <div className="w-4.5 h-4.5 rounded-full bg-white shadow-[0_0_20px_#ffffff]" />
                      </div>
                      {/* Orbiting Lightning Spark Clusters */}
                      <div className="absolute top-0 right-1 w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_15px_#fde047] animate-ping" />
                      <div className="absolute bottom-1 left-0 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#38bdf8] animate-ping" />
                    </div>
                  </div>

                  {/* Orb 2: Low-Angle Swift Electro Stream (Delay 180ms) */}
                  <div className="absolute left-1/2 bottom-[10%] pointer-events-none z-35 animate-electro-orb-left-2" style={{ animationDelay: "180ms" }}>
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center animate-electro-orb-pulse">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400 shadow-[0_0_35px_#c084fc] animate-electro-spin" />
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-white shadow-[0_0_40px_#a855f7,inset_0_0_15px_#ffffff] flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#ffffff]" />
                      </div>
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-purple-300 shadow-[0_0_15px_#e879f9] animate-ping" />
                    </div>
                  </div>

                  {/* Orb 3: Colossal High-Voltage Heavy Thunder Sphere (Delay 360ms) */}
                  <div className="absolute left-1/2 bottom-[18%] pointer-events-none z-35 animate-electro-orb-left-3" style={{ animationDelay: "360ms" }}>
                    <div className="relative w-18 h-18 sm:w-22 sm:h-22 flex items-center justify-center animate-electro-orb-pulse">
                      <div className="absolute -inset-2 rounded-full border-2 border-amber-300 shadow-[0_0_50px_#f59e0b] animate-ping" />
                      <div className="absolute inset-0 rounded-full border-3 border-dashed border-cyan-300 shadow-[0_0_45px_#06b6d4] animate-electro-spin" />
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-cyan-400 via-amber-300 to-white shadow-[0_0_60px_#f59e0b,inset_0_0_25px_#ffffff] flex items-center justify-center animate-pulse">
                        <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_30px_#ffffff]" />
                      </div>
                      <div className="absolute bottom-1 right-2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_20px_#ffffff] animate-ping" />
                    </div>
                  </div>

                  {/* === 3 ELECTRO ORBS TOWARDS ZERO (RIGHT) === */}
                  {/* Orb 1: Mid Straight Electro Stream */}
                  <div className="absolute left-1/2 bottom-[14%] pointer-events-none z-35 animate-electro-orb-right-1">
                    <div className="relative w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center animate-electro-orb-pulse">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400 shadow-[0_0_35px_#10b981] animate-electro-spin" />
                      <div className="absolute inset-1.5 rounded-full border-2 border-teal-300 shadow-[0_0_25px_#2dd4bf] animate-spin" />
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-white shadow-[0_0_45px_#10b981,inset_0_0_20px_#ffffff] flex items-center justify-center animate-pulse">
                        <div className="w-4.5 h-4.5 rounded-full bg-white shadow-[0_0_20px_#ffffff]" />
                      </div>
                      <div className="absolute top-0 left-1 w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_15px_#34d399] animate-ping" />
                      <div className="absolute bottom-1 right-0 w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-[0_0_15px_#fde047] animate-ping" />
                    </div>
                  </div>

                  {/* Orb 2: Low-Angle Swift Electro Stream (Delay 180ms) */}
                  <div className="absolute left-1/2 bottom-[10%] pointer-events-none z-35 animate-electro-orb-right-2" style={{ animationDelay: "180ms" }}>
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center animate-electro-orb-pulse">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-400 shadow-[0_0_35px_#14b8a6] animate-electro-spin" />
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-teal-500 via-emerald-300 to-white shadow-[0_0_40px_#0d9488,inset_0_0_15px_#ffffff] flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#ffffff]" />
                      </div>
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-teal-200 shadow-[0_0_15px_#99f6e4] animate-ping" />
                    </div>
                  </div>

                  {/* Orb 3: Colossal High-Voltage Heavy Thunder Sphere (Delay 360ms) */}
                  <div className="absolute left-1/2 bottom-[18%] pointer-events-none z-35 animate-electro-orb-right-3" style={{ animationDelay: "360ms" }}>
                    <div className="relative w-18 h-18 sm:w-22 sm:h-22 flex items-center justify-center animate-electro-orb-pulse">
                      <div className="absolute -inset-2 rounded-full border-2 border-amber-300 shadow-[0_0_50px_#f59e0b] animate-ping" />
                      <div className="absolute inset-0 rounded-full border-3 border-dashed border-emerald-300 shadow-[0_0_45px_#10b981] animate-electro-spin" />
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-amber-300 to-white shadow-[0_0_60px_#f59e0b,inset_0_0_25px_#ffffff] flex items-center justify-center animate-pulse">
                        <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_30px_#ffffff]" />
                      </div>
                      <div className="absolute bottom-1 left-2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_20px_#ffffff] animate-ping" />
                    </div>
                  </div>
                </>
              )}

              {/* ================= OUTER SKY EXPLOSIONS (DEFLECTED ORBS BURSTING OUTSIDE ARENA) ================= */}
              {bossParryClash === "detonated" && (
                <>
                  {/* Upper-Left Explosions */}
                  <div className="absolute -top-10 -left-10 pointer-events-none z-45 flex items-center justify-center animate-deflected-sky-blast">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-400 via-cyan-400 to-white shadow-[0_0_80px_#38bdf8]" />
                    <div className="absolute w-44 h-44 rounded-full border-4 border-cyan-200 shadow-[0_0_40px_#ffffff] animate-shockwave-ring" />
                    <div className="absolute w-24 h-24 rounded-full bg-white shadow-[0_0_50px_#38bdf8] animate-ping" />
                  </div>
                  <div className="absolute top-12 -left-16 pointer-events-none z-45 flex items-center justify-center animate-deflected-sky-blast" style={{ animationDelay: "120ms" }}>
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-yellow-300 via-cyan-400 to-white shadow-[0_0_70px_#facc15]" />
                    <div className="absolute w-36 h-36 rounded-full border-2 border-yellow-300 shadow-[0_0_30px_#ffffff] animate-shockwave-ring" />
                  </div>

                  {/* Upper-Right Explosions */}
                  <div className="absolute -top-10 -right-10 pointer-events-none z-45 flex items-center justify-center animate-deflected-sky-blast">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-amber-300 shadow-[0_0_80px_#10b981]" />
                    <div className="absolute w-44 h-44 rounded-full border-4 border-emerald-200 shadow-[0_0_40px_#ffffff] animate-shockwave-ring" />
                    <div className="absolute w-24 h-24 rounded-full bg-white shadow-[0_0_50px_#10b981] animate-ping" />
                  </div>
                  <div className="absolute top-12 -right-16 pointer-events-none z-45 flex items-center justify-center animate-deflected-sky-blast" style={{ animationDelay: "120ms" }}>
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-300 via-yellow-400 to-white shadow-[0_0_70px_#f59e0b]" />
                    <div className="absolute w-36 h-36 rounded-full border-2 border-emerald-400 shadow-[0_0_30px_#ffffff] animate-shockwave-ring" />
                  </div>
                </>
              )}

              {/* ================= 2. BOSS SIGMA (Ground [50%, 10%] -> Airborne [50%, 8%]) ================= */}
              {dualFinisherPhase !== "victory" && (
                <div
                  className={`absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center transition-all duration-500 ${
                    dualFinisherPhase === "x_charge_sky" ||
                    dualFinisherPhase === "boss_death" ||
                    (dualFinisherPhase === "zero_combo" && (zeroStrike === 4 || (zeroStrike === 0 && xDualChargeTier === 3)))
                      ? "top-[8%] -translate-y-4"
                      : "bottom-[10%]"
                  }`}
                >
                  {/* Phase 1: Hit Sparks directly on Sigma's Chest */}
                  {dualFinisherPhase === "x_rapid" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-30">
                      <div className="w-16 h-16 rounded-full border-2 border-cyan-300 shadow-[0_0_25px_#22d3ee] animate-sigma-hit-spark" />
                      <div className="absolute w-12 h-12 rounded-full border-2 border-yellow-300 shadow-[0_0_25px_#fde047] animate-sigma-hit-spark" style={{ animationDelay: "0.08s" }} />
                    </div>
                  )}

                  {/* Boss Surprise Energy Slash Aura */}
                  {bossParryClash === "waves_flying" && (
                    <div className="absolute -inset-8 flex items-center justify-center pointer-events-none z-30">
                      <div className="w-48 h-48 rounded-full border-4 border-rose-500 shadow-[0_0_50px_#ef4444] animate-ping" />
                      <div className="absolute w-40 h-40 rounded-full border-2 border-yellow-300 shadow-[0_0_30px_#fde047] animate-spin" />
                    </div>
                  )}

                  {/* Boss Parry Recoil Sparks */}
                  {bossParryClash === "deflected" && (
                    <div className="absolute -inset-6 flex items-center justify-center pointer-events-none z-30">
                      <div className="w-36 h-36 rounded-full border-2 border-yellow-300 shadow-[0_0_35px_#facc15] animate-ping" />
                    </div>
                  )}

                  {/* Phase 3: Colossal Sky Supernova Detonation centered on Airborne Boss Sigma */}
                  {dualFinisherPhase === "x_charge_sky" && (
                    <div className="absolute -inset-32 flex items-center justify-center pointer-events-none z-40">
                      <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-cyan-300 shadow-[0_0_150px_#f59e0b] animate-sky-supernova" />
                      <div className="absolute w-72 h-72 rounded-full border-4 border-white shadow-[0_0_80px_#ffffff] animate-shockwave-ring" />
                      <div className="absolute w-88 h-88 rounded-full border-4 border-cyan-300 shadow-[0_0_80px_#22d3ee] animate-shockwave-ring" style={{ animationDelay: "0.15s" }} />
                    </div>
                  )}

                  {/* Sigma Boss Sprite with Death Stagger Animation */}
                  <div
                    className={`relative w-32 h-32 sm:w-40 sm:h-40 ${
                      dualFinisherPhase === "boss_death" && (bossDyingStep === 1 || bossDyingStep === 2)
                        ? "animate-sigma-death-stagger"
                        : dualFinisherPhase === "boss_death" && bossDyingStep === 3
                        ? "animate-sigma-disintegrate"
                        : bossParryClash === "deflected"
                        ? "shake-arena"
                        : ""
                    }`}
                    style={{ imageRendering: "pixelated" }}
                  >
                    <Image
                      src="/assets/sprites/sigma_boss.png"
                      alt="Sigma Maverick Boss Sprite"
                      fill
                      sizes="180px"
                      className={`object-contain drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] ${
                        dualFinisherPhase === "x_rapid"
                          ? "animate-pulse brightness-150"
                          : dualFinisherPhase === "boss_death"
                          ? "brightness-200"
                          : bossParryClash === "waves_flying"
                          ? "brightness-125"
                          : ""
                      }`}
                      priority
                    />

                    {/* Phase 2 (Strike 1): Ultra-Sharp Front Razor Saber Cut */}
                    {dualFinisherPhase === "zero_combo" && zeroStrike === 1 && (
                      <div className="absolute -inset-10 flex items-center justify-center pointer-events-none z-30">
                        <div className="w-56 h-3.5 bg-gradient-to-r from-transparent via-white to-emerald-400 shadow-[0_0_45px_#10b981] animate-razor-slash" style={{ transform: "rotate(-32deg)" }} />
                        <div className="absolute w-44 h-1 bg-white shadow-[0_0_20px_#ffffff] animate-ping" style={{ transform: "rotate(-32deg)" }} />
                      </div>
                    )}

                    {/* Phase 2 (Strike 2): Ultra-Sharp Back Reverse Crimson Razor Cut */}
                    {dualFinisherPhase === "zero_combo" && zeroStrike === 2 && (
                      <div className="absolute -inset-10 flex items-center justify-center pointer-events-none z-30">
                        <div className="w-56 h-3.5 bg-gradient-to-r from-transparent via-white to-rose-400 shadow-[0_0_45px_#ef4444] animate-razor-slash" style={{ transform: "rotate(38deg)" }} />
                        <div className="absolute w-44 h-1 bg-white shadow-[0_0_20px_#ffffff] animate-ping" style={{ transform: "rotate(38deg)" }} />
                      </div>
                    )}

                    {/* Phase 2 (Strike 4): Dimensional Cuts Criss-Crossing on Boss during Iaido Flash Launch */}
                    {dualFinisherPhase === "zero_combo" && zeroStrike === 4 && (
                      <div className="absolute -inset-12 flex items-center justify-center pointer-events-none z-30">
                        {[-45, 45, -75, 75, 15, -15].map((angle, i) => (
                          <div
                            key={angle + "_" + i}
                            className="absolute w-56 h-3 bg-gradient-to-r from-transparent via-white to-emerald-400 shadow-[0_0_40px_#10b981] animate-judgment-cut"
                            style={{ transform: `rotate(${angle}deg)`, animationDelay: `${i * 0.04}s` }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Phase 4 (Step 2): Rapid Continuous Chain Fireball Explosions Across Boss Body */}
                    {dualFinisherPhase === "boss_death" && bossDyingStep === 2 && (
                      <div className="absolute -inset-10 pointer-events-none z-40">
                        {/* Explosion 1: Chest Core */}
                        <div className="absolute top-6 left-6 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-white animate-chain-explosion shadow-[0_0_40px_#f59e0b]" />
                        {/* Explosion 2: Left Shoulder */}
                        <div className="absolute top-2 right-2 w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-300 via-red-600 to-white animate-chain-explosion shadow-[0_0_45px_#ef4444]" style={{ animationDelay: "0.22s" }} />
                        {/* Explosion 3: Right Arm */}
                        <div className="absolute top-16 -left-2 w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-300 via-blue-500 to-white animate-chain-explosion shadow-[0_0_40px_#38bdf8]" style={{ animationDelay: "0.48s" }} />
                        {/* Explosion 4: Head Overload */}
                        <div className="absolute -top-3 left-1/3 w-22 h-22 rounded-full bg-gradient-to-tr from-rose-500 via-amber-300 to-white animate-chain-explosion shadow-[0_0_50px_#f59e0b]" style={{ animationDelay: "0.75s" }} />
                        {/* Explosion 5: Lower Core Breach */}
                        <div className="absolute bottom-2 right-6 w-22 h-22 rounded-full bg-gradient-to-tr from-yellow-400 via-purple-600 to-white animate-chain-explosion shadow-[0_0_45px_#c084fc]" style={{ animationDelay: "1.05s" }} />
                      </div>
                    )}

                    {/* Phase 4 (Step 3): Grand Climax Final Shatter Explosion */}
                    {dualFinisherPhase === "boss_death" && bossDyingStep === 3 && (
                      <div className="absolute -inset-12 pointer-events-none z-45 flex items-center justify-center">
                        <div className="w-44 h-44 rounded-full bg-white animate-boss-core-burst shadow-[0_0_100px_#ffffff,0_0_150px_#38bdf8]" />
                        <div className="absolute inset-0 rounded-full border-4 border-cyan-300 shadow-[0_0_60px_#22d3ee] animate-ping" />
                      </div>
                    )}
                  </div>

                  {/* Sát thương Bạo kích Cực Đại & Parry Recoil Badges */}
                  {bossParryClash === "waves_flying" && (
                    <div className="absolute -top-10 z-50 animate-bounce text-center">
                      <span className="text-[10px] font-black text-amber-300 bg-black/95 px-2.5 py-0.5 border-2 border-yellow-400 shadow-[0_0_20px_#facc15] whitespace-nowrap">
                        ⚡ SIGMA: 6x ELECTRO-PLASMA ORBS!
                      </span>
                    </div>
                  )}

                  {bossParryClash === "deflected" && (
                    <div className="absolute -top-10 z-50 animate-bounce text-center">
                      <span className="text-[10px] font-black text-cyan-300 bg-black/95 px-2.5 py-0.5 border-2 border-cyan-400 shadow-[0_0_20px_#22d3ee] whitespace-nowrap">
                        ⚡ OVERVOLTAGE SHORT-CIRCUIT STUNNED!
                      </span>
                    </div>
                  )}

                  {dualDamageText && bossParryClash === "idle" && (
                    <div className="absolute -top-12 z-50 animate-bounce text-center">
                      <span className="text-xs sm:text-sm font-black text-amber-300 bg-black/95 px-4 py-1.5 border-2 border-amber-400 shadow-[0_0_30px_#f59e0b] tracking-wider whitespace-nowrap">
                        {dualDamageText}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Phase 2 (Strike 4): Colossal Rising Dragon Force Geyser Pillar Erupting at Center */}
              {dualFinisherPhase === "zero_combo" && zeroStrike === 4 && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-48 h-80 pointer-events-none z-20 animate-zero-colossal-geyser flex flex-col items-center">
                  <div className="w-full h-full bg-gradient-to-t from-emerald-500 via-teal-300 to-transparent shadow-[0_0_70px_#10b981] rounded-t-full flex items-center justify-center">
                    <div className="w-12 h-full bg-white shadow-[0_0_40px_#ffffff] rounded-t-full" />
                    <div className="absolute inset-x-4 top-4 h-32 bg-cyan-300/60 rounded-t-full animate-pulse" />
                  </div>
                  <div className="absolute bottom-2 w-32 h-6 rounded-full border-2 border-emerald-300 shadow-[0_0_25px_#34d399] animate-ping" />
                </div>
              )}

              {/* ================= 3. ZERO HUNTER (Dynamic Anchors Based on Strike Step) ================= */}
              {/* Victory Phase: Centered beside X in Back-to-Back Victory Stance */}
              {dualFinisherPhase === "victory" ? (
                <div
                  className={`absolute left-[54%] sm:left-[52%] bottom-[10%] z-25 flex flex-col items-center ${
                    teleportingOut ? "animate-character-beam-out" : "animate-in zoom-in-95 duration-200"
                  }`}
                >
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                    <Image
                      src="/assets/sprites/zero_saber.png"
                      alt="Zero Victory Pose"
                      fill
                      sizes="140px"
                      className="object-contain drop-shadow-[0_0_30px_#ef4444]"
                      priority
                    />
                    {!teleportingOut && (
                      <div className="absolute -inset-3 rounded-full border-2 border-rose-500/80 shadow-[0_0_25px_#ef4444] animate-ping pointer-events-none" />
                    )}
                  </div>
                  <span className="text-[10px] font-black text-rose-300 mt-1 bg-black/90 px-2.5 py-0.5 border border-rose-500">
                    ZERO: S-RANK!
                  </span>
                </div>
              ) : (
                /* Battle Stances */
                <>
                  {/* Strike 1: Directly in Front of Sigma (Left ~37%) */}
                  {dualFinisherPhase === "zero_combo" && zeroStrike === 1 && (
                    <div className="absolute left-[34%] sm:left-[37%] bottom-[10%] z-25 flex flex-col items-center animate-in zoom-in-75 duration-100">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                        <Image
                          src="/assets/sprites/zero_saber.png"
                          alt="Zero Front Slash"
                          fill
                          sizes="140px"
                          className="object-contain drop-shadow-[0_0_25px_#10b981]"
                          priority
                        />
                      </div>
                      <span className="text-[9px] font-black text-emerald-300 mt-1 bg-black/80 px-2 py-0.5 border border-emerald-500">
                        ZERO: FRONT RAZOR SLASH!
                      </span>
                    </div>
                  )}

                  {/* Strike 2: Directly Behind Sigma (Left ~63%, Facing Left) */}
                  {dualFinisherPhase === "zero_combo" && zeroStrike === 2 && (
                    <div className="absolute left-[63%] sm:left-[60%] bottom-[10%] z-25 flex flex-col items-center scale-x-[-1] animate-in zoom-in-75 duration-100">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                        <Image
                          src="/assets/sprites/zero_saber.png"
                          alt="Zero Back Slash"
                          fill
                          sizes="140px"
                          className="object-contain drop-shadow-[0_0_25px_#ef4444]"
                          priority
                        />
                      </div>
                      <span className="text-[9px] font-black text-rose-300 mt-1 bg-black/80 px-2 py-0.5 border border-rose-500 scale-x-[-1]">
                        ZERO: BACK RAZOR SLASH!
                      </span>
                    </div>
                  )}

                  {/* Strike 3: Iaido Focus Stance directly under Sigma */}
                  {dualFinisherPhase === "zero_combo" && zeroStrike === 3 && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] z-25 flex flex-col items-center animate-in zoom-in-90 duration-150">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                        <Image
                          src="/assets/sprites/zero_saber.png"
                          alt="Zero Iaido Focus Stance"
                          fill
                          sizes="140px"
                          className="object-contain drop-shadow-[0_0_35px_#10b981] animate-pulse"
                          priority
                        />
                        {/* Iaido Focus Energy Suction Rings */}
                        <div className="absolute -inset-4 rounded-full border-2 border-emerald-400 shadow-[0_0_30px_#10b981] animate-ping pointer-events-none" />
                        <div className="absolute -inset-8 rounded-full border-2 border-dashed border-teal-300 shadow-[0_0_25px_#2dd4bf] animate-spin pointer-events-none" />
                      </div>
                      <span className="text-[9px] font-black text-emerald-300 mt-1 bg-black/90 px-2.5 py-0.5 border-2 border-emerald-400 shadow-[0_0_20px_#10b981] animate-pulse">
                        ⚡ ZERO: IAIDO FOCUS CHARGE...
                      </span>
                    </div>
                  )}

                  {/* Strike 4: Iaido Flash Launcher thrusting upwards */}
                  {dualFinisherPhase === "zero_combo" && zeroStrike === 4 && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] z-25 flex flex-col items-center -translate-y-8 animate-in slide-in-from-bottom duration-150">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                        <Image
                          src="/assets/sprites/zero_saber.png"
                          alt="Zero Iaido Flash Launcher"
                          fill
                          sizes="140px"
                          className="object-contain drop-shadow-[0_0_40px_#ffffff]"
                          priority
                        />
                      </div>
                      <span className="text-[9px] font-black text-amber-300 mt-1 bg-black/80 px-2 py-0.5 border border-amber-500">
                        ⚔️ RISING DRAGON SLASH!
                      </span>
                    </div>
                  )}

                  {/* Base Stance (Phase 1, Phase 3, Boss Death, Idle, Intro Landing, Boss Parry) on Right [10%] */}
                  {(dualFinisherPhase !== "zero_combo" || zeroStrike === 0) && (
                    <div
                      className={`absolute right-[8%] sm:right-[12%] bottom-[10%] z-20 flex flex-col items-center scale-x-[-1] transition-all ${
                        dualIntroLanding ? "animate-character-beam-in" : ""
                      }`}
                    >
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                        <Image
                          src="/assets/sprites/zero_saber.png"
                          alt="Zero Dual Finisher Stance"
                          fill
                          sizes="140px"
                          className="object-contain drop-shadow-[0_0_25px_#ef4444]"
                          priority
                        />
                        {!dualIntroLanding && bossParryClash !== "deflected" && (
                          <div className="absolute -inset-4 rounded-full border-2 border-rose-500/80 shadow-[0_0_25px_#ef4444] animate-ping pointer-events-none" />
                        )}

                        {/* Zero Z-Saber Parry Spark Flash */}
                        {bossParryClash === "deflected" && (
                          <div className="absolute left-0 top-[38%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 animate-parry-flash">
                            <div className="w-20 h-20 rounded-full border-4 border-emerald-400 bg-emerald-400/40 shadow-[0_0_50px_#10b981,inset_0_0_25px_#ffffff] flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-white shadow-[0_0_30px_#ffffff]" />
                            </div>
                            <div className="absolute -inset-4 rounded-full border-2 border-amber-300 shadow-[0_0_25px_#f59e0b] animate-ping" />
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] font-black text-rose-300 mt-1 bg-black/80 px-2 py-0.5 border border-rose-500 scale-x-[-1]">
                        {bossParryClash === "deflected"
                          ? "⚔️ PERFECT Z-PARRY!"
                          : "ZERO HUNTER"}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          
          {/* ================= LEFT BATTLEGROUND: MEGA MAN X ================= */}
          <div
            onClick={handleXBuster}
            className={`relative p-3.5 sm:p-4 border-2 border-slate-900 dark:border-slate-100 bg-slate-900/95 text-white shadow-[4px_4px_0px_0px_#0284c7] rounded-xs flex flex-col justify-between cursor-pointer transition-all duration-150 ${
              xShake ? "shake-arena border-cyan-400 shadow-[6px_6px_0px_0px_#38bdf8]" : ""
            }`}
          >
            {/* Top HUD */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-cyan-400 font-bold">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>UNIT 01: MEGA MAN X</span>
                {xCombo > 1 && (
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 border border-cyan-400/40 animate-pulse">
                    COMBO x{xCombo}!
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400">
                STAGE 01: CENTRAL HIGHWAY
              </div>
            </div>

            {/* Battle Arena Viewport */}
            <div className="relative h-44 sm:h-48 flex items-center justify-between px-4 sm:px-8 bg-slate-950/90 border border-slate-800 overflow-hidden">
              {/* Floor Neon Grid & Background Cyber lines */}
              <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-t from-cyan-950/80 to-transparent border-t-2 border-cyan-500/50" />
              <div className="absolute top-2 right-4 text-[9px] text-slate-700 font-mono">SECTOR_X_44</div>

              {/* ================= MEGA MAN X 16-BIT SPRITE & BUSTER TIP ================= */}
              <div className="relative flex items-center z-10">
                {/* Teleport Beam Out / In Pillar for X in Solo Arena */}
                {(soloTeleportOut || soloTeleportIn) && (
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-full bg-gradient-to-t from-cyan-400 via-white to-transparent shadow-[0_0_40px_#38bdf8] pointer-events-none z-35 flex items-center justify-center ${
                      soloTeleportIn ? "animate-teleport-beam-in" : "animate-teleport-beam"
                    }`}
                  >
                    <div className="w-5 h-full bg-white shadow-[0_0_25px_#ffffff]" />
                  </div>
                )}

                {dualFinisherActive && !soloTeleportOut && !soloTeleportIn ? (
                  /* Holographic Deployed Status in Solo Arena while Dual Battle is ongoing */
                  <div className="flex flex-col items-center justify-center p-3.5 bg-slate-900/90 border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse rounded-xs my-6">
                    <div className="flex items-center gap-1.5 text-xs font-black text-cyan-300 font-mono">
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span>DEPLOYED TO DUAL ARENA</span>
                    </div>
                    <span className="text-[9px] text-cyan-400/70 font-mono mt-0.5">CO-OP BOSS BATTLE IN PROGRESS...</span>
                  </div>
                ) : (
                  <div className={`relative flex items-center ${soloTeleportOut ? "animate-character-beam-out" : soloTeleportIn ? "animate-character-beam-in" : ""}`}>
                    {/* Charging Cyclone Aura VFX with escalating color tiers */}
                    {xCharging && (
                      <div
                        className={`absolute -inset-6 rounded-full border-2 transition-all duration-300 animate-charge-aura pointer-events-none ${
                          xChargeLevel === 3
                            ? "border-amber-300 shadow-[0_0_40px_#f59e0b,0_0_80px_#c084fc]"
                            : xChargeLevel === 2
                            ? "border-cyan-300 shadow-[0_0_30px_#22d3ee]"
                            : "border-emerald-300 shadow-[0_0_20px_#10b981]"
                        }`}
                      />
                    )}

                    {/* 16-Bit Real-Time Charge Meter HUD */}
                    {xCharging && (
                      <div className="absolute -top-8 inset-x-[-20px] flex flex-col items-center pointer-events-none z-30 animate-charge-bar">
                        <div className="bg-black/90 border border-cyan-400 px-1.5 py-0.5 text-[9px] font-mono font-black text-cyan-300 flex items-center gap-1 shadow-[0_0_10px_#22d3ee]">
                          <Sparkles className="w-2.5 h-2.5 text-yellow-300 animate-spin" />
                          <span>{xChargeLevel === 3 ? "⚡ MAXIMUM OVERCHARGE!" : `CHARGE LV.${xChargeLevel}`}</span>
                        </div>
                        <div className="w-24 h-1.5 bg-slate-900 border border-cyan-500 mt-0.5 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-200 ${
                              xChargeLevel === 3
                                ? "bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-300 w-full animate-pulse"
                                : xChargeLevel === 2
                                ? "bg-gradient-to-r from-cyan-400 to-blue-500 w-2/3"
                                : "bg-emerald-400 w-1/3"
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Pixel Art Mega Man X Image with Jet Dash & After-Images */}
                    <div
                      className={`relative w-[6.25rem] h-[6.25rem] sm:w-28 sm:h-28 transition-transform duration-100 ${
                        xGigaSlideActive
                          ? "animate-x-giga-slide"
                          : xState === "shooting"
                          ? "animate-x-step-recoil"
                          : ""
                      }`}
                      style={{ imageRendering: "pixelated" }}
                    >
                      {/* Ground Jet Dust Exhaust */}
                      {xJetDust && (
                        <div className="absolute -bottom-2 -left-3 pointer-events-none z-0 flex items-center">
                          <div className="w-5 h-3 bg-gradient-to-l from-cyan-300 via-slate-300 to-transparent rounded-full animate-jet-dust blur-2xs" />
                          <div className="w-3 h-2 -ml-1 bg-white rounded-full animate-jet-dust" />
                        </div>
                      )}

                      {/* Jet Booster Thruster Plume */}
                      {xJetPlume && (
                        <div className="absolute top-[45%] -left-4 -translate-y-1/2 pointer-events-none z-0">
                          <div className="w-8 h-4 bg-gradient-to-l from-cyan-400 via-sky-200 to-transparent rounded-full animate-jet-booster shadow-[0_0_15px_#38bdf8]" />
                        </div>
                      )}

                      {/* Ghost After-Images Trailing Behind X */}
                      {xAfterImages.map((ghost) => (
                        <div
                          key={ghost.id}
                          className={`absolute inset-0 pointer-events-none z-0 ${
                            ghost.color === "amber"
                              ? "animate-after-image-amber"
                              : ghost.color === "purple"
                              ? "animate-after-image-purple"
                              : "animate-after-image-cyan"
                          }`}
                          style={{ transform: `translateX(${ghost.offset}px)` }}
                        >
                          <Image
                            src="/assets/sprites/megaman_x.png"
                            alt="Mega Man X Phantom After-Image"
                            fill
                            sizes="140px"
                            className="object-contain opacity-70"
                          />
                        </div>
                      ))}

                      <Image
                        src="/assets/sprites/megaman_x.png"
                        alt="Mega Man X Pixel Art Sprite"
                        fill
                        sizes="140px"
                        className="object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] relative z-10"
                        priority
                      />

                      {/* PRECISE BUSTER NOZZLE FLARE (At tip of X-Buster) */}
                      {xState !== "idle" && (
                        <div className="absolute right-[-2px] top-[36.8%] -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-300 shadow-[0_0_16px_#38bdf8] animate-ping pointer-events-none z-30" />
                      )}

                      {/* PROJECTILES ORIGINATING FORWARD DIRECTLY FROM BUSTER NOZZLE */}
                      <div className="absolute left-[98%] top-[36.8%] -translate-y-1/2 pointer-events-none z-20">
                        {xProjectiles.map((p) => (
                          <div key={p.id} className="absolute left-0 top-0 -translate-y-1/2">
                            {p.type === "plasma" ? (
                              /* Epic Capcom Mega Man X Giga Plasma Comet */
                              <div className="relative flex items-center animate-plasma">
                                {/* Blazing Aerodynamic Plasma Trail */}
                                <div className="absolute -left-20 w-28 h-10 bg-gradient-to-r from-transparent via-cyan-400 to-purple-600 rounded-full blur-xs opacity-90" />
                                <div className="absolute -left-12 w-20 h-6 bg-gradient-to-r from-transparent via-white to-cyan-300 rounded-full blur-xs" />
                                
                                {/* Outer Electric Vortex Rings */}
                                <div className="relative w-18 h-18 sm:w-22 sm:h-22 flex items-center justify-center">
                                  <div className="absolute inset-0 rounded-full border-2 border-cyan-200 border-dashed animate-plasma-spin shadow-[0_0_35px_#22d3ee]" />
                                  <div className="absolute inset-1.5 rounded-full border-2 border-purple-400 animate-spin shadow-[0_0_25px_#c084fc]" />
                                  
                                  {/* Solar White-Hot Supernova Plasma Core */}
                                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_0_45px_#38bdf8,inset_0_0_20px_#22d3ee] flex items-center justify-center animate-pulse">
                                    <div className="w-6 h-6 rounded-full bg-cyan-200 shadow-[0_0_20px_#ffffff]" />
                                  </div>

                                  {/* Orbiting Spark Particles */}
                                  <div className="absolute top-1 right-2 w-3.5 h-3.5 rounded-full bg-yellow-300 shadow-[0_0_12px_#fde047] animate-ping" />
                                  <div className="absolute bottom-1 left-2 w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] animate-ping" />
                                </div>
                              </div>
                            ) : (
                              /* Rapid Lemon Pellets */
                              <div className="flex items-center gap-2 animate-bullet">
                                <div className="w-5 h-3 bg-gradient-to-r from-yellow-300 to-cyan-300 rounded-full shadow-[0_0_10px_#facc15]" />
                                <div className="w-6 h-3.5 bg-gradient-to-r from-yellow-400 to-white rounded-full shadow-[0_0_12px_#38bdf8]" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ================= TARGET ENEMY (METOOL) ================= */}
              <div className={`relative flex flex-col items-center z-10 transition-transform duration-100 ${metoolHit ? "translate-x-3 brightness-200" : ""}`}>
                {/* GIGA PLASMA CINEMATIC SUPERNOVA DETONATION ZONE */}
                {plasmaSupernovaBlast && (
                  <div className="absolute -inset-16 flex items-center justify-center pointer-events-none z-30">
                    {/* Concentric Expanding Shockwave Rings */}
                    <div className="absolute inset-[-24px] rounded-full border-4 border-cyan-300 shadow-[0_0_60px_#22d3ee] animate-shockwave-ring" />
                    <div
                      className="absolute inset-[-12px] rounded-full border-4 border-purple-400 shadow-[0_0_50px_#c084fc] animate-shockwave-ring"
                      style={{ animationDelay: "0.12s" }}
                    />
                    <div
                      className="absolute inset-0 rounded-full border-4 border-amber-300 shadow-[0_0_40px_#fde047] animate-shockwave-ring"
                      style={{ animationDelay: "0.22s" }}
                    />

                    {/* 8 Radial Lightning Spark Beams */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <div
                        key={deg}
                        className="absolute w-36 h-2 bg-gradient-to-r from-white via-cyan-300 to-transparent shadow-[0_0_20px_#22d3ee] animate-ping"
                        style={{ transform: `rotate(${deg}deg)` }}
                      />
                    ))}

                    {/* Multi-Layered Rotating Supernova Vortex Core (Pure Visual Energy, No Text) */}
                    <div className="relative w-40 h-40 flex items-center justify-center animate-plasma-supernova">
                      <div className="absolute inset-0 rounded-full border-4 border-cyan-300 shadow-[0_0_70px_#22d3ee] animate-spin" />
                      <div className="absolute inset-3 rounded-full border-4 border-purple-500 shadow-[0_0_50px_#a855f7] animate-ping" />
                      
                      {/* Pure Solar White-Hot Supernova Plasma Core */}
                      <div className="w-24 h-24 rounded-full bg-white shadow-[0_0_80px_#38bdf8,inset_0_0_30px_#22d3ee] flex items-center justify-center animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-cyan-200 shadow-[0_0_30px_#ffffff] animate-ping" />
                      </div>
                      
                      {/* Residual Lingering Plasma Nodes */}
                      <div className="absolute top-1 right-2 w-6 h-6 rounded-full bg-yellow-300 shadow-[0_0_25px_#facc15] animate-ping" />
                      <div className="absolute bottom-1 left-2 w-7 h-7 rounded-full bg-cyan-300 shadow-[0_0_25px_#22d3ee] animate-ping" />
                      <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-purple-400 shadow-[0_0_20px_#c084fc] animate-ping" />
                    </div>
                  </div>
                )}

                {/* Floating Damage Numbers */}
                <div className="absolute -top-8 inset-x-0 flex flex-col items-center pointer-events-none">
                  {xDamageTexts.map((item) => (
                    <span
                      key={item.id}
                      className={`text-xs font-black animate-bounce ${
                        item.isCrit
                          ? "text-amber-300 bg-black/90 px-1.5 py-0.5 border border-amber-400 text-sm shadow-[0_0_8px_#facc15]"
                          : "text-rose-400 bg-black/70 px-1 border border-rose-500/40"
                      }`}
                    >
                      {item.text}
                    </span>
                  ))}
                </div>

                {/* HP Bar */}
                <div className="w-20 mb-1 bg-slate-900 border border-slate-700 h-2.5 p-[1px]">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 transition-all duration-150"
                    style={{ width: `${Math.max(0, (metoolHp / metoolMaxHp) * 100)}%` }}
                  />
                </div>
                <div className="text-[9px] text-amber-400 font-bold mb-0.5 tracking-wider">{metoolName}</div>

                {/* Explosion VFX on Kill */}
                {metoolExploding ? (
                  <div className="w-18 h-18 flex items-center justify-center animate-ping">
                    <div className="w-16 h-16 rounded-full bg-amber-400 shadow-[0_0_30px_#ef4444] flex items-center justify-center font-black text-xs text-black">
                      💥 BOOM!
                    </div>
                  </div>
                ) : (
                  /* Metool 16-Bit Image */
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20" style={{ imageRendering: "pixelated" }}>
                    <Image
                      src="/assets/sprites/metool.png"
                      alt="Metool Enemy Sprite"
                      fill
                      sizes="90px"
                      className="object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Attack Buttons */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleXBuster}
                disabled={xCharging}
                className="py-2 px-3 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 disabled:opacity-50 text-white font-bold text-xs border-2 border-cyan-300 shadow-[2px_2px_0px_0px_#0284c7] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                [ ⚡ BUSTER RAPID ]
              </button>
              <button
                type="button"
                onClick={handleXChargeAttack}
                disabled={xCharging}
                className={`py-2 px-3 text-slate-950 font-bold text-xs border-2 shadow-[2px_2px_0px_0px_#d97706] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
                  xCharging
                    ? "bg-amber-400 border-white animate-pulse"
                    : "bg-amber-500 hover:bg-amber-400 active:bg-amber-600 border-amber-200"
                }`}
              >
                {xCharging ? "[ ⚡ CHARGING... ]" : "[ 💥 CHARGE GIGA PLASMA ]"}
              </button>
            </div>
          </div>

          {/* ================= RIGHT BATTLEGROUND: ZERO ================= */}
          <div
            onClick={handleZeroTeleportCombo}
            className={`relative p-3.5 sm:p-4 border-2 border-slate-900 dark:border-slate-100 bg-slate-900/95 text-white shadow-[4px_4px_0px_0px_#dc2626] rounded-xs flex flex-col justify-between cursor-pointer transition-all duration-150 ${
              zeroShake ? "shake-arena border-rose-400 shadow-[6px_6px_0px_0px_#ef4444]" : ""
            }`}
          >
            {/* Top HUD */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-rose-400 font-bold">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>UNIT 02: ZERO (MAVERICK HUNTER)</span>
                {zeroCombo > 1 && (
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 border border-rose-400/40 animate-pulse">
                    COMBO x{zeroCombo}!
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400">
                STAGE 02: CENTRAL TOWER
              </div>
            </div>

            {/* Battle Arena Viewport */}
            <div className="relative h-44 sm:h-48 flex items-center justify-between px-4 sm:px-8 bg-slate-950/90 border border-slate-800 overflow-hidden">
              {/* Floor Neon Grid */}
              <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-t from-rose-950/80 to-transparent border-t-2 border-rose-500/50" />
              <div className="absolute top-2 right-4 text-[9px] text-slate-700 font-mono">SECTOR_Z_00</div>

              {/* ================= ZERO BASE SPRITE & IAIDO DASH ================= */}
              <div className="relative flex items-center z-10">
                {/* Teleport Beam Out / In Pillar for Zero in Solo Arena */}
                {(soloTeleportOut || soloTeleportIn) && (
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-full bg-gradient-to-t from-rose-500 via-white to-transparent shadow-[0_0_40px_#ef4444] pointer-events-none z-35 flex items-center justify-center ${
                      soloTeleportIn ? "animate-teleport-beam-in" : "animate-teleport-beam"
                    }`}
                  >
                    <div className="w-5 h-full bg-white shadow-[0_0_25px_#ffffff]" />
                  </div>
                )}

                {dualFinisherActive && !soloTeleportOut && !soloTeleportIn ? (
                  /* Holographic Deployed Status in Solo Arena while Dual Battle is ongoing */
                  <div className="flex flex-col items-center justify-center p-3.5 bg-slate-900/90 border border-rose-500/80 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse rounded-xs my-6">
                    <div className="flex items-center gap-1.5 text-xs font-black text-rose-300 font-mono">
                      <Sparkles className="w-4 h-4 text-rose-400 animate-spin" />
                      <span>DEPLOYED TO DUAL ARENA</span>
                    </div>
                    <span className="text-[9px] text-rose-400/70 font-mono mt-0.5">CO-OP BOSS BATTLE IN PROGRESS...</span>
                  </div>
                ) : (
                  <div
                    className={`relative flex items-center ${
                      soloTeleportOut
                        ? "animate-character-beam-out"
                        : soloTeleportIn
                        ? "animate-character-beam-in"
                        : iaidoPhase === "focus"
                        ? "animate-iaido-focus"
                        : iaidoPhase === "dash" || iaidoPhase === "sheath" || iaidoPhase === "shatter"
                        ? "animate-iaido-dash"
                        : ""
                    }`}
                  >
                    {/* ZERO IAIDO FOCUS CHARGE AURA */}
                    {iaidoPhase === "focus" && (
                      <div className="absolute -inset-8 flex items-center justify-center pointer-events-none z-0">
                        <div className="absolute inset-0 rounded-full border-2 border-emerald-400/80 shadow-[0_0_30px_#10b981] animate-ping" />
                        <div className="absolute -inset-4 rounded-full border-4 border-dashed border-rose-500 shadow-[0_0_45px_#ef4444] animate-spin" />
                        {/* HUD Stance Text */}
                        <div className="absolute -top-10 inset-x-0 flex justify-center">
                          <span className="text-[10px] font-black text-emerald-300 bg-black/90 px-2 py-0.5 border border-emerald-400 shadow-[0_0_12px_#10b981] tracking-wider animate-pulse">
                            ⚡ IAIDO FOCUS STANCE
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      className={`relative w-28 h-28 sm:w-32 sm:h-32 transition-opacity duration-100 ${
                        zeroTeleportPhase !== 0 ? "opacity-0 scale-90" : "opacity-100 scale-100"
                      }`}
                      style={{ imageRendering: "pixelated" }}
                    >
                      {/* Ground Jet Dust */}
                      {zeroJetDust && (
                        <div className="absolute -bottom-2 -left-3 pointer-events-none z-0 flex items-center">
                          <div className="w-6 h-3 bg-gradient-to-l from-rose-500 via-emerald-300 to-transparent rounded-full animate-jet-dust blur-2xs" />
                        </div>
                      )}

                      {/* Zero Ghost After-Images */}
                      {zeroAfterImages.map((ghost) => (
                        <div
                          key={ghost.id}
                          className={`absolute inset-0 pointer-events-none z-0 ${
                            ghost.color === "emerald" ? "animate-after-image-emerald" : "animate-after-image-rose"
                          }`}
                          style={{ transform: `translateX(${ghost.offset}px)` }}
                        >
                          <Image
                            src="/assets/sprites/zero_saber.png"
                            alt="Zero Phantom After-Image"
                            fill
                            sizes="140px"
                            className="object-contain opacity-70"
                          />
                        </div>
                      ))}

                      <Image
                        src="/assets/sprites/zero_saber.png"
                        alt="Zero Z-Saber Pixel Art Sprite"
                        fill
                        sizes="140px"
                        className="object-contain drop-shadow-[0_0_14px_rgba(239,68,68,0.85)] relative z-10"
                        priority
                      />
                      {/* Glowing Saber Pulse */}
                      <div className="absolute top-4 right-0 w-8 h-8 rounded-full blur-xs animate-pulse pointer-events-none bg-emerald-400/30" />
                    </div>
                  </div>
                )}
              </div>

              {/* HORIZONTAL IAIDO FLASH DASH CUT LINE ACROSS SCREEN */}
              {iaidoSlashLine && (
                <div className="absolute left-4 top-[48%] -translate-y-1/2 w-[85%] h-2.5 pointer-events-none z-20">
                  <div className="w-full h-full animate-iaido-trail bg-gradient-to-r from-emerald-500 via-white to-transparent shadow-[0_0_30px_#10b981]" />
                </div>
              )}

              {/* ================= TARGET ENEMY (DRONE) & TARGET-LOCKED ZERO TELEPORTS ================= */}
              <div className="relative flex flex-col items-center z-10">
                {/* ZERO TELEPORT STRIKE 1: DIRECTLY ABOVE DRONE */}
                {zeroTeleportPhase === 1 && (
                  <div className="absolute -top-16 -left-8 w-24 h-24 sm:w-28 sm:h-28 z-30 animate-in zoom-in-50 duration-100 rotate-12 drop-shadow-[0_0_25px_#22c55e]">
                    <Image
                      src="/assets/sprites/zero_saber.png"
                      alt="Zero Aerial Downward Strike"
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-2 bg-gradient-to-r from-emerald-400 via-white to-transparent rotate-45 shadow-[0_0_25px_#22c55e]" />
                    </div>
                  </div>
                )}

                {/* ZERO TELEPORT STRIKE 2: DIRECTLY BEHIND DRONE */}
                {zeroTeleportPhase === 2 && (
                  <div className="absolute -top-4 -right-16 w-24 h-24 sm:w-28 sm:h-28 z-30 animate-in zoom-in-50 duration-100 -scale-x-100 drop-shadow-[0_0_25px_#ef4444]">
                    <Image
                      src="/assets/sprites/zero_saber.png"
                      alt="Zero Backstab Strike"
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-2 bg-gradient-to-r from-rose-500 via-white to-transparent -rotate-45 shadow-[0_0_25px_#ef4444]" />
                    </div>
                  </div>
                )}

                {/* ZERO TELEPORT STRIKE 3: IN FRONT WITH SHIN MESSENKOU GEYSER */}
                {zeroTeleportPhase === 3 && (
                  <div className="absolute -top-6 -left-16 w-28 h-28 sm:w-32 sm:h-32 z-30 animate-in zoom-in-75 duration-100 scale-110 drop-shadow-[0_0_35px_#22c55e]">
                    <Image
                      src="/assets/sprites/zero_saber.png"
                      alt="Zero Rising Uppercut Finisher"
                      fill
                      sizes="140px"
                      className="object-contain"
                    />
                    {/* Giant Rising Laser Geyser */}
                    <div className="absolute -inset-10 flex items-center justify-center pointer-events-none">
                      <div className="w-36 h-36 rounded-full border-4 border-emerald-300 shadow-[0_0_45px_#10b981] animate-ping" />
                      <div className="absolute w-2 h-44 bg-gradient-to-t from-emerald-500 via-white to-transparent shadow-[0_0_30px_#22c55e]" />
                    </div>
                  </div>
                )}

                {/* MULTI-ANGLE GEOMETRIC JUDGMENT CUT SPACE SHATTER FLURRY */}
                {judgmentCutFlurry && (
                  <div className="absolute -inset-16 flex items-center justify-center pointer-events-none z-30">
                    {/* 6 Multi-Angle Holographic Laser Cuts */}
                    {[15, -25, 60, -70, 45, -45].map((angle, i) => (
                      <div
                        key={angle + "_" + i}
                        className="absolute w-48 h-3 bg-gradient-to-r from-transparent via-white to-emerald-400 shadow-[0_0_35px_#10b981] animate-judgment-cut"
                        style={{ transform: `rotate(${angle}deg)`, animationDelay: `${i * 0.035}s` }}
                      />
                    ))}

                    {/* Concentric Expanding Shockwave Rings */}
                    <div className="absolute inset-[-20px] rounded-full border-4 border-white shadow-[0_0_60px_#22c55e] animate-shockwave-ring" />
                    <div
                      className="absolute inset-[-8px] rounded-full border-4 border-emerald-400 shadow-[0_0_40px_#10b981] animate-shockwave-ring"
                      style={{ animationDelay: "0.12s" }}
                    />

                    {/* 8 Radial Emerald Sword Qi Sparks */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <div
                        key={"zero_spark_" + deg}
                        className="absolute w-36 h-2 bg-gradient-to-r from-white via-emerald-300 to-transparent shadow-[0_0_20px_#22c55e] animate-ping"
                        style={{ transform: `rotate(${deg}deg)` }}
                      />
                    ))}

                    {/* Holographic Prismatic Dimension Shatter Core */}
                    <div className="relative w-36 h-36 flex items-center justify-center animate-dimension-shatter">
                      <div className="absolute inset-0 rounded-full border-4 border-emerald-400 shadow-[0_0_60px_#10b981] animate-spin" />
                      <div className="absolute inset-3 rounded-full border-4 border-teal-300 shadow-[0_0_40px_#2dd4bf] animate-ping" />
                      <div className="w-20 h-20 rounded-full bg-white shadow-[0_0_70px_#22c55e,inset_0_0_25px_#10b981] flex items-center justify-center animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-emerald-200 shadow-[0_0_25px_#ffffff] animate-ping" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating Damage Numbers */}
                <div className="absolute -top-8 inset-x-0 flex flex-col items-center pointer-events-none">
                  {zeroDamageTexts.map((item) => (
                    <span
                      key={item.id}
                      className={`text-xs font-black animate-bounce ${
                        item.isCrit
                          ? "text-emerald-300 bg-black/90 px-1.5 py-0.5 border border-emerald-400 text-sm shadow-[0_0_12px_#22c55e]"
                          : "text-rose-400 bg-black/70 px-1 border border-rose-500/40"
                      }`}
                    >
                      {item.text}
                    </span>
                  ))}
                </div>

                {/* HP Bar */}
                <div className="w-20 mb-1 bg-slate-900 border border-slate-700 h-2.5 p-[1px]">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500 transition-all duration-150"
                    style={{ width: `${Math.max(0, (droneHp / droneMaxHp) * 100)}%` }}
                  />
                </div>
                <div className="text-[9px] text-rose-400 font-bold mb-0.5 tracking-wider">{droneName}</div>

                {/* Explosion VFX on Kill */}
                {droneExploding ? (
                  <div className="w-18 h-18 flex items-center justify-center animate-ping">
                    <div className="w-16 h-16 rounded-full bg-emerald-400 shadow-[0_0_30px_#10b981] flex items-center justify-center font-black text-xs text-black">
                      ⚔️ SLASHED!
                    </div>
                  </div>
                ) : (
                  /* Spiky Drone 16-Bit Image */
                  <div
                    className={`relative w-18 h-18 sm:w-22 sm:h-22 transition-transform duration-100 ${
                      droneHit ? "translate-x-3 rotate-6 brightness-200" : ""
                    }`}
                    style={{ imageRendering: "pixelated" }}
                  >
                    <Image
                      src="/assets/sprites/spiky_drone.png"
                      alt="Spiky Mech Drone Enemy Sprite"
                      fill
                      sizes="100px"
                      className="object-contain drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Attack Buttons */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleZeroTeleportCombo}
                disabled={zeroState !== "idle"}
                className="py-2 px-3 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-xs border-2 border-rose-300 shadow-[2px_2px_0px_0px_#991b1b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50"
              >
                [ ⚔️ Z-SABER SLASH ]
              </button>
              <button
                type="button"
                onClick={handleZeroIaidoSlash}
                disabled={zeroState !== "idle"}
                className="py-2 px-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs border-2 border-emerald-200 shadow-[2px_2px_0px_0px_#047857] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50"
              >
                [ ⚡ IAIDO FLASH DASH ]
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
