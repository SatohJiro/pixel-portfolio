"use client";

import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { PixelBadge } from "../pixel/PixelBadge";
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
  const { isVi } = useLanguage();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const counterRef = useRef(10);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "line-1",
      type: "system",
      text: "SatohJiro Pixel Console v2.0 (x86_64-nextjs)",
    },
    {
      id: "line-2",
      type: "system",
      text: "Type 'help' or click any command shortcut below to explore profile data.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  const quickCommands = ["help", "whoami", "skills", "experience", "projects", "awards", "contact", "hire", "resume"];

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

    const inputId = `in-${counterRef.current++}`;
    const outputId = `out-${counterRef.current++}`;
    const errId = `err-${counterRef.current++}`;

    const newLines: TerminalLine[] = [
      ...lines,
      { id: inputId, type: "input", text: `satohjiro@portfolio:~$ ${cmdStr}` },
    ];

    if (trimmed === "clear") {
      setLines([
        {
          id: `init-${counterRef.current++}`,
          type: "system",
          text: "Terminal buffer cleared. Type 'help' for commands.",
        },
      ]);
      setInputVal("");
      return;
    }

    if (trimmed === "help") {
      newLines.push({
        id: outputId,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="font-bold text-emerald-400">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300 pt-1">
              <div><span className="text-amber-400 font-bold">whoami</span> : Profile summary & role</div>
              <div><span className="text-amber-400 font-bold">skills</span> : Core technologies & stack</div>
              <div><span className="text-amber-400 font-bold">experience</span> : Work experience history</div>
              <div><span className="text-amber-400 font-bold">projects</span> : Key software projects</div>
              <div><span className="text-amber-400 font-bold">awards</span> : Academic honors & awards</div>
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
        id: outputId,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="text-emerald-400 font-bold">Name: NGUYEN TRAN ANH (@SatohJiro)</div>
            <div>Role: Software Engineer | Full-Stack & Frontend Developer</div>
            <div>Education: Bachelor of Engineering (Valedictorian Class 2019, GPA 3.6/4.0)</div>
            <div>Focus: ReactJS, Next.js, Vue.js, TypeScript, State Management, API & AI integration</div>
            <div>Location: Ho Chi Minh City, Vietnam</div>
          </div>
        ),
      });
    } else if (trimmed === "skills") {
      newLines.push({
        id: outputId,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div className="text-emerald-400 font-bold">Technical Skills:</div>
            <div>• Frontend Core: ReactJS, Next.js, Vue.js (2/3), TypeScript, JavaScript (ES6+), Tailwind CSS</div>
            <div>• State & Tuning: Redux Toolkit, Zustand, Context API, Re-render reduction (+30%)</div>
            <div>• Architecture & Backend: Micro-frontend (ahamo NTT Docomo), Java Spring Boot, Python FastAPI</div>
            <div>• AI & Queues: OpenAI GPT-4 API, RabbitMQ message queues, Doc2Vec NLP</div>
            <div>• Databases & DevOps: PostgreSQL, MySQL, MongoDB, Docker, Git/GitHub, CMS Webrelease</div>
          </div>
        ),
      });
    } else if (trimmed === "experience" || trimmed === "exp") {
      newLines.push({
        id: outputId,
        type: "output",
        text: (
          <div className="space-y-2 font-mono text-xs text-slate-200">
            <div>
              <span className="text-emerald-400 font-bold">[1] Hero Solutions (09/2024 - Present):</span> Frontend Developer on ahamo Platform (NTT Docomo Japan - Micro-frontend, Vue.js, ReactJS, CMS Webrelease).
            </div>
            <div>
              <span className="text-emerald-400 font-bold">[2] Nexus Zone (01/2024 - 09/2024):</span> Frontend Developer on Salesforce-CRM (+30% performance boost, Redux/Zustand, Rookie of the Year 2024).
            </div>
            <div>
              <span className="text-emerald-400 font-bold">[3] TMA Solutions (01/2023 - 12/2023):</span> Fullstack Developer (GPT Code Generator with GPT-4/FastAPI/RabbitMQ - 3rd Place AI Got Talent).
            </div>
          </div>
        ),
      });
    } else if (trimmed === "projects") {
      newLines.push({
        id: outputId,
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
        id: outputId,
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
        id: outputId,
        type: "output",
        text: (
          <div className="space-y-1 font-mono text-xs text-slate-200">
            <div>Email: <a href="mailto:trananhq2345@gmail.com" className="text-emerald-400 underline">trananhq2345@gmail.com</a></div>
            <div>Phone: <a href="tel:+84989702459" className="text-emerald-400 underline">(+84) 98 970 2459</a></div>
            <div>GitHub: <a href="https://github.com/SatohJiro" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">https://github.com/SatohJiro</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/satohjiro/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">https://www.linkedin.com/in/satohjiro/</a></div>
          </div>
        ),
      });
    } else if (trimmed === "resume" || trimmed === "cv") {
      newLines.push({
        id: outputId,
        type: "output",
        text: <span className="text-emerald-400 font-mono text-xs">Opening Resume Viewer modal...</span>,
      });
      onOpenResumeModal();
    } else if (trimmed === "hire" || trimmed === "sudo hire") {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      newLines.push({
        id: outputId,
        type: "output",
        text: (
          <div className="p-3 border-2 border-emerald-500 bg-emerald-950/80 text-emerald-300 font-mono text-xs space-y-1">
            <div className="font-bold text-white">🎉 Thank you for your interest!</div>
            <div>Nguyen Tran Anh is ready to contribute to your engineering team.</div>
            <div>Feel free to connect via <a href="mailto:trananhq2345@gmail.com" className="underline font-bold text-emerald-300">trananhq2345@gmail.com</a> or phone <span className="font-bold text-white">(+84) 98 970 2459</span>.</div>
          </div>
        ),
      });
    } else {
      newLines.push({
        id: errId,
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
    <section id="terminal" className="relative py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <PixelBadge variant="emerald" size="md">
            {isVi ? "DÒNG LỆNH TƯƠNG TÁC" : "DEVELOPER CLI SANDBOX"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? "Interactive CLI Terminal" : "Interactive Terminal Console"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Tra cứu nhanh thông tin hồ sơ qua các lệnh dòng lệnh hoặc click vào các phím tắt bên dưới."
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
              className="px-2.5 py-1 text-xs font-mono font-bold border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-emerald-100 dark:hover:bg-emerald-950 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              $ {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Frame */}
        <div className="border-2 border-slate-900 dark:border-slate-100 bg-slate-950 text-slate-100 shadow-[6px_6px_0px_0px_#18181b] dark:shadow-[6px_6px_0px_0px_#ffffff] overflow-hidden">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b-2 border-slate-900 dark:border-slate-100 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 bg-emerald-500 inline-block" />
              <span className="text-slate-300 ml-2 font-bold">satohjiro@terminal: ~/portfolio</span>
            </div>
            <button
              type="button"
              onClick={() => executeCommand("clear")}
              className="flex items-center gap-1 text-[11px] px-2 py-0.5 border border-slate-600 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
              title="Clear Console"
            >
              <Trash2 className="w-3 h-3" />
              <span>CLEAR</span>
            </button>
          </div>

          {/* Terminal Output Area */}
          <div
            ref={outputContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-5 min-h-[240px] max-h-[360px] overflow-y-auto font-mono text-xs space-y-2 cursor-text bg-slate-950 text-slate-200"
          >
            {lines.map((line) => (
              <div key={line.id} className="leading-relaxed">
                {line.type === "input" ? (
                  <span className="text-emerald-400 font-bold">{line.text}</span>
                ) : line.type === "system" ? (
                  <span className="text-slate-400 italic">{line.text}</span>
                ) : line.type === "error" ? (
                  <span className="text-rose-400 font-bold">{line.text}</span>
                ) : (
                  <div>{line.text}</div>
                )}
              </div>
            ))}
          </div>

          {/* Terminal Prompt Input Bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-t-2 border-slate-900 dark:border-slate-100">
            <span className="text-emerald-400 font-mono text-xs font-bold shrink-0">satohjiro@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type command (e.g. whoami, skills, projects)..."
              className="w-full bg-transparent text-xs font-mono font-bold text-white focus:outline-none placeholder:text-slate-500"
              spellCheck={false}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              className="p-1 border border-slate-700 bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
