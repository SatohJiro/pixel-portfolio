"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTelemetry } from "@/hooks/useTelemetry";
import { formatDate } from "@/lib/utils";
import { GlassBadge } from "../glass/GlassBadge";
import { GlassButton } from "../glass/GlassButton";
import {
  ShieldCheck,
  Activity,
  Trash2,
  Lock,
  EyeOff,
  CheckCircle2,
  X,
  Clock,
  Sparkles,
} from "lucide-react";

interface PrivacyTelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyTelemetryDrawer({ isOpen, onClose }: PrivacyTelemetryDrawerProps) {
  const { isVi, isEn } = useLanguage();
  const { events, isOptedOut, toggleOptOut, clearEvents } = useTelemetry();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Glass Drawer */}
      <div className="relative w-full max-w-md h-full bg-slate-950/95 dark:bg-slate-950/95 light:bg-white/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                {isVi ? "Quyền Riêng Tư & Telemetry" : "Privacy & Telemetry Inspector"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Privacy Principles Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>{isVi ? "Nguyên tắc Bảo mật 100% Ẩn danh" : "Privacy-by-Design Compliance"}</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{isVi ? "Không dùng cookie của bên thứ 3" : "Zero third-party cookies"}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{isVi ? "Không thu thập IP hoặc dấu vân tay thiết bị" : "No IP address or fingerprint logging"}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{isVi ? "Dữ liệu phiên lưu cục bộ tại trình duyệt" : "Client-side session memory only"}</span>
              </li>
            </ul>
          </div>

          {/* Opt-out Control */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">
                {isVi ? "Trạng thái Thu thập Ẩn danh" : "Anonymous Telemetry"}
              </div>
              <div className="text-[11px] text-slate-400">
                {isOptedOut
                  ? (isVi ? "Đã tắt (Opted-Out)" : "Disabled (Opted-Out)")
                  : (isVi ? "Đang bật (Tối ưu trải nghiệm)" : "Enabled (Session only)")}
              </div>
            </div>

            <button
              onClick={toggleOptOut}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                !isOptedOut ? "bg-emerald-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  !isOptedOut ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Live Event Stream */}
        <div className="flex-1 my-4 overflow-y-auto space-y-2 pr-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-1">
            <span>{isVi ? "Nhật ký phiên trực tiếp:" : "Live Session Event Stream:"}</span>
            <span>{events.length} {isVi ? "sự kiện" : "events"}</span>
          </div>

          {events.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 italic">
              {isOptedOut
                ? (isVi ? "Telemetry đang tắt. Không có sự kiện nào được ghi nhận." : "Telemetry is paused (opted out). No events logged.")
                : (isVi ? "Chưa có sự kiện tương tác nào trong phiên này." : "No session events recorded yet.")}
            </div>
          ) : (
            events.map((evt) => (
              <div
                key={evt.id}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-cyan-400 font-bold">{evt.type}</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(evt.timestamp)}
                  </span>
                </div>
                {evt.target && (
                  <div className="text-slate-300 text-[11px] truncate">
                    Target: <span className="text-indigo-300">{evt.target}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <GlassButton
            onClick={clearEvents}
            size="sm"
            variant="outline"
            icon={<Trash2 className="w-3.5 h-3.5 text-rose-400" />}
            className="text-xs"
          >
            {isVi ? "Xóa Log" : "Clear Log"}
          </GlassButton>

          <GlassButton
            onClick={onClose}
            size="sm"
            variant="glass"
            className="text-xs"
          >
            {isVi ? "Đóng" : "Close"}
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
