"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { GlassButton } from "../glass/GlassButton";
import {
  FileDown,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Layers,
  Cpu,
  Trophy,
  Terminal,
  Mail,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export function Navbar({ onOpenResumeModal }: NavbarProps) {
  const { isVi, isEn } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking for active state
      const sections = siteConfig.navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    telemetry.track("click", `nav_${id}`);
    setMobileMenuOpen(false);
  };

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-3.5 h-3.5" />,
    User: <User className="w-3.5 h-3.5" />,
    Briefcase: <Briefcase className="w-3.5 h-3.5" />,
    Layers: <Layers className="w-3.5 h-3.5" />,
    Cpu: <Cpu className="w-3.5 h-3.5" />,
    Trophy: <Trophy className="w-3.5 h-3.5" />,
    Terminal: <Terminal className="w-3.5 h-3.5" />,
    Mail: <Mail className="w-3.5 h-3.5" />,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5"
          : "py-4 bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <Link
          href="#home"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full rounded-xl bg-white dark:bg-slate-950/90 flex items-center justify-center font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
              NTA
            </div>
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-bold text-sm tracking-tight text-slate-900 dark:text-white whitespace-nowrap leading-tight">
              {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-wider leading-tight">
              @SatohJiro
            </div>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1 p-1 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-white/5 backdrop-blur-xl shadow-inner">
          {siteConfig.navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm border border-indigo-500/40"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {iconMap[item.icon]}
                <span className="whitespace-nowrap">{item.label[isVi ? "vi" : "en"]}</span>
              </Link>
            );
          })}
        </nav>

        {/* Compact Nav for Medium screens (lg to xl) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-0.5 p-1 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-white/5 backdrop-blur-xl">
          {siteConfig.navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                title={item.label[isVi ? "vi" : "en"]}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm border border-indigo-500/40"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {iconMap[item.icon]}
                <span className="text-[11px] whitespace-nowrap">{item.label[isVi ? "vi" : "en"]}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions (Language, Theme, Download CV, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <LanguageToggle />
          <ThemeToggle />

          <GlassButton
            onClick={() => {
              telemetry.track("download_cv", "navbar_cta");
              onOpenResumeModal();
            }}
            variant="primary"
            size="sm"
            icon={<FileDown className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex whitespace-nowrap shrink-0"
          >
            {isVi ? "Tải CV / In" : "Get Resume"}
          </GlassButton>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {siteConfig.navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white font-semibold shadow-sm"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {iconMap[item.icon]}
                  <span className="whitespace-nowrap">{item.label[isVi ? "vi" : "en"]}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex justify-center">
            <GlassButton
              onClick={() => {
                telemetry.track("download_cv", "mobile_nav_cta");
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              variant="primary"
              size="md"
              icon={<FileDown className="w-4 h-4" />}
              className="w-full whitespace-nowrap"
            >
              {isVi ? "Xem & Tải CV (PDF)" : "View & Download CV (PDF)"}
            </GlassButton>
          </div>
        </div>
      )}
    </header>
  );
}
