"use client";

import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { GlassBadge } from "../glass/GlassBadge";
import {
  CornerDownLeft,
  Trash2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { telemetry } from "@/lib/telemetry";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: string | React.ReactNode;
}

interface InteractiveTerminalProps {
  onOpenResumeModal: () => void;
}

export function InteractiveTerminal({ onOpenResumeModal }: InteractiveTerminalProps) {
  const { isVi, isEn } = useLanguage();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "system",
      text: "SatohJiro Terminal Sandbox v2.4.0 (x86_64-nextjs)",
    },
    {
      id: "2",
      type: "system",
      text: "Type 'help' or click any command chip below to explore.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  const quickCommands = ["help", "whoami", "skills", "experience", "projects", "awards", "contact", "hire", "resume"];

  // Scroll ONLY the inner terminal output container, never the window
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    telemetry.track("terminal_command", trimmed);

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const newLines: TerminalLine[] = [
      ...lines,
      { id: `${Date.now()}-in`, type: "input", text: `$ ${cmdStr}` },
    ];

    if (trimmed === "clear") {
      setLines([
        {
          id: `${Date.now()}-init`,
          type: "system",
          text: "Terminal buffer cleared. Type 'help' for commands.",
        },
      ]);
      setInputVal("");
      return;
    }

    if (trimmed === "help") {
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="font-bold text-white">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-cyan-300 pt-1">
              <div><span className="text-amber-400 font-bold">whoami</span> : Profile summary & role</div>
              <div><span className="text-amber-400 font-bold">skills</span> : Core technologies & strengths</div>
              <div><span className="text-amber-400 font-bold">experience</span> : Work experience history</div>
              <div><span className="text-amber-400 font-bold">projects</span> : Key software projects</div>
              <div><span className="text-amber-400 font-bold">awards</span> : Academic & hackathon honors</div>
              <div><span className="text-amber-400 font-bold">contact</span> : Email, phone, GitHub, LinkedIn</div>
              <div><span className="text-amber-400 font-bold">resume</span> : Open ATS resume modal</div>
              <div><span className="text-amber-400 font-bold">hire</span> : Fast-track interview request 🎉</div>
              <div><span className="text-amber-400 font-bold">clear</span> : Clear console buffer</div>
            </div>
          </div>
        ),
      });
    } else if (trimmed === "whoami") {
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="text-emerald-400 font-bold">Name: NGUYEN TRAN ANH (SatohJiro)</div>
            <div>Role: Software Engineer | Full-Stack & Frontend Developer</div>
            <div>Education: Degree of Engineer (Valedictorian Class 2019, GPA 3.6/4.0)</div>
            <div>Focus: ReactJS, Next.js, Vue.js, TypeScript, State Management, API & AI integration</div>
            <div>Location: Ho Chi Minh City, Vietnam</div>
          </div>
        ),
      });
    } else if (trimmed === "skills") {
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="text-indigo-400 font-bold">Technical Skills:</div>
            <div>• Frontend Core: ReactJS, Next.js, Vue.js (2/3), TypeScript, JavaScript (ES6+), Tailwind CSS</div>
            <div>• State & Tuning: Redux Toolkit, Zustand, Context API, Re-render reduction (+30%)</div>
            <div>• Architecture & Backend: Micro-frontend (ahamo NTT Docomo), Java Spring Boot, Python FastAPI, NestJS</div>
            <div>• AI & Queues: OpenAI GPT-4 API, RabbitMQ message queues, Doc2Vec NLP</div>
            <div>• Databases & DevOps: PostgreSQL, MySQL, MongoDB, Docker, Git/GitHub, CMS Webrelease</div>
          </div>
        ),
      });
    } else if (trimmed === "experience" || trimmed === "exp") {
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: (
          <div className="space-y-2 font-mono text-xs text-slate-200">
            <div>
              <span className="text-cyan-400 font-bold">[1] Hero Solutions (09/2024 - Present):</span> Frontend Developer on ahamo Platform (NTT Docomo Japan - Micro-frontend, Vue.js, ReactJS, CMS Webrelease).
            </div>
            <div>
              <span className="text-cyan-400 font-bold">[2] Nexus Zone (01/2024 - 09/2024):</span> Frontend Developer on Salesforce-CRM (+30% performance boost, Redux/Zustand, Rookie of the Year 2024).
            </div>
            <div>
              <span className="text-cyan-400 font-bold">[3] TMA Solutions (01/2023 - 12/2023):</span> Fullstack Developer (GPT Code Generator with GPT-4/FastAPI/RabbitMQ - 3rd Place AI Got Talent).
            </div>
          </div>
        ),
      });
    } else if (trimmed === "projects") {
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: (
          <div className="space-y-1.5 font-mono text-xs text-slate-200">
            <div><span className="text-emerald-400 font-bold">1. GPT Code Generator:</span> Natural language to code preview with GPT-4, FastAPI, RabbitMQ, Next.js.</div>
            <div><span className="text-emerald-400 font-bold">2. ahamo Docomo Platform:</span> Mobile carrier portal with Vue.js, React, Micro-frontends.</div>
            <div><span className="text-emerald-400 font-bold">3. Salesforce-CRM:</span> CRM interface optimization with Redux Toolkit and Zustand.</div>
            <div><span className="text-emerald-400 font-bold">4. Graduation Thesis Portal:</span> Role-based access + Doc2Vec duplicate detection NLP.</div>
            <div><span className="text-emerald-400 font-bold">5. Genetic Sudoku Solver:</span> Evolutionary algorithm in pure Java.</div>
          </div>
        ),
      });
    } else if (trimmed === "awards" || trimmed === "honors") {
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-amber-300">
            <div>🏆 1st Place — Valedictorian of Class 2019 (Nong Lam University - GPA 3.6/4.0)</div>
            <div>✨ 3rd Place — AI Got Talent 2023 (TMA Solutions Corporation)</div>
            <div>🎖️ Rookie of the Year 2024 (Nexus Zone Corporation)</div>
          </div>
        ),
      });
    } else if (trimmed === "contact") {
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div>Email: <a href="mailto:trananhq2345@gmail.com" className="text-cyan-400 underline">trananhq2345@gmail.com</a></div>
            <div>Phone: <a href="tel:+84989702459" className="text-cyan-400 underline">(+84) 98 970 2459</a></div>
            <div>GitHub: <a href="https://github.com/SatohJiro" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">https://github.com/SatohJiro</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/satohjiro/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">https://www.linkedin.com/in/satohjiro/</a></div>
          </div>
        ),
      });
    } else if (trimmed === "resume" || trimmed === "cv") {
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: <span className="text-emerald-400 font-mono text-xs">Opening Resume Viewer modal...</span>,
      });
      onOpenResumeModal();
    } else if (trimmed === "hire" || trimmed === "sudo hire") {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      newLines.push({
        id: `${Date.now()}-out`,
        type: "output",
        text: (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs space-y-1">
            <div className="font-bold text-white">🎉 Thank you for your interest!</div>
            <div>Nguyen Tran Anh is ready to contribute to your engineering team.</div>
            <div>Feel free to connect via <a href="mailto:trananhq2345@gmail.com" className="underline font-bold text-cyan-300">trananhq2345@gmail.com</a> or phone <span className="font-bold text-white">(+84) 98 970 2459</span>.</div>
          </div>
        ),
      });
    } else {
      newLines.push({
        id: `${Date.now()}-err`,
        type: "error",
        text: (
          <span className="font-mono text-xs text-rose-400">
            command not found: {cmdStr}. Type &apos;help&apos; for list of valid commands.
          </span>
        ),
      });
    }

    setLines(newLines);
    setInputVal("");
  };

  const handleChipClick = (e: MouseEvent, cmd: string) => {
    e.preventDefault();
    executeCommand(cmd);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      } else {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  return (
    <section id="terminal" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <GlassBadge variant="indigo" size="md">
            {isVi ? "Giao Diện Dòng Lệnh Tương Tác" : "Developer CLI Sandbox"}
          </GlassBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? (
              <>
                Interactive <span className="text-gradient">CLI Terminal</span>
              </>
            ) : (
              <>
                Interactive <span className="text-gradient">Terminal Sandbox</span>
              </>
            )}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            {isVi
              ? "Khám phá nhanh thông tin qua các lệnh dòng lệnh hoặc click vào các phím tắt bên dưới."
              : "Query profile info via CLI commands or click the shortcut chips below."}
          </p>
        </div>

        {/* Quick Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={(e) => handleChipClick(e, cmd)}
              className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/15 text-cyan-700 dark:text-cyan-400 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-500/15 transition-all cursor-pointer shadow-xs"
            >
              $ {cmd}
            </button>
          ))}
        </div>

        {/* Dedicated Dark Terminal Window Frame (Permanent Dark Console UI) */}
        <div className="rounded-2xl border border-slate-800 dark:border-white/15 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2 font-medium">satohjiro@terminal: ~/portfolio</span>
            </div>
            <button
              type="button"
              onClick={() => executeCommand("clear")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Clear Console"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Terminal Output Area (Always High-Contrast Dark Console Body) */}
          <div
            ref={outputContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="p-5 min-h-[260px] max-h-[380px] overflow-y-auto font-mono text-xs space-y-2 cursor-text bg-slate-950 text-slate-200"
          >
            {lines.map((line) => (
              <div key={line.id} className="leading-relaxed">
                {line.type === "input" ? (
                  <span className="text-indigo-300 font-bold">{line.text}</span>
                ) : line.type === "system" ? (
                  <span className="text-slate-400 italic">{line.text}</span>
                ) : line.type === "error" ? (
                  <span className="text-rose-400 font-semibold">{line.text}</span>
                ) : (
                  <div>{line.text}</div>
                )}
              </div>
            ))}
          </div>

          {/* Terminal Prompt Input Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-t border-slate-800">
            <span className="text-emerald-400 font-mono text-xs font-bold shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type command (e.g. whoami, skills, projects)..."
              className="w-full bg-transparent text-xs font-mono text-cyan-300 focus:outline-none placeholder:text-slate-500 font-medium"
              spellCheck={false}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors shrink-0 cursor-pointer"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
