"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTelemetry } from "@/hooks/useTelemetry";
import { formatDate } from "@/lib/utils";
import { PixelButton } from "../pixel/PixelButton";
import {
  ShieldCheck,
  Trash2,
  Lock,
  CheckCircle2,
  X,
  Clock,
} from "lucide-react";

interface PrivacyTelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyTelemetryDrawer({ isOpen, onClose }: PrivacyTelemetryDrawerProps) {
  const { isVi } = useLanguage();
  const { events, isOptedOut, toggleOptOut, clearEvents } = useTelemetry();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden font-mono">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 pixel-dither-bg transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Pixel Drawer */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-950 border-l-2 border-slate-900 dark:border-slate-100 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-150">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900 dark:border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase">
                {isVi ? "QUYỀN RIÊNG TƯ & TELEMETRY" : "PRIVACY & TELEMETRY LOG"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 border border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Privacy Principles Banner */}
          <div className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-emerald-50 dark:bg-emerald-950/40 text-xs text-slate-800 dark:text-slate-200 space-y-2">
            <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 uppercase">
              <Lock className="w-3.5 h-3.5" />
              <span>{isVi ? "Bảo Mật 100% Ẩn Danh" : "Privacy Compliance"}</span>
            </div>
            <ul className="space-y-1 text-[11px] font-sans">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Không dùng cookie của bên thứ 3" : "Zero third-party cookies"}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Không thu thập IP hoặc thông tin cá nhân" : "No IP address or fingerprint logging"}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Dữ liệu chỉ lưu tạm trong phiên trình duyệt" : "Client-side session memory only"}</span>
              </li>
            </ul>
          </div>

          {/* Opt-out Control */}
          <div className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase">
                {isVi ? "Thu thập Ẩn danh" : "Anonymous Telemetry"}
              </div>
              <div className="text-[11px] text-slate-500">
                {isOptedOut
                  ? (isVi ? "Đã tắt (Opted-Out)" : "Disabled (Opted-Out)")
                  : (isVi ? "Đang bật (Tối ưu trải nghiệm)" : "Enabled (Session only)")}
              </div>
            </div>

            <button
              onClick={toggleOptOut}
              className={`px-3 py-1 text-xs font-bold border-2 border-slate-900 dark:border-slate-100 cursor-pointer shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                !isOptedOut
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              {!isOptedOut ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Live Event Stream */}
        <div className="flex-1 my-4 overflow-y-auto space-y-2 pr-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold pb-1 uppercase">
            <span>{isVi ? "Nhật ký phiên trực tiếp:" : "Session Events:"}</span>
            <span>{events.length} {isVi ? "sự kiện" : "events"}</span>
          </div>

          {events.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 italic font-sans">
              {isOptedOut
                ? (isVi ? "Telemetry đang tắt. Không có sự kiện nào được ghi nhận." : "Telemetry is paused (opted out). No events logged.")
                : (isVi ? "Chưa có sự kiện tương tác nào trong phiên này." : "No session events recorded yet.")}
            </div>
          ) : (
            events.map((evt) => (
              <div
                key={evt.id}
                className="p-2 border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">[{evt.type}]</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(evt.timestamp)}
                  </span>
                </div>
                {evt.target && (
                  <div className="text-slate-700 dark:text-slate-300 text-[11px] truncate">
                    Target: <span className="font-bold text-slate-900 dark:text-white">{evt.target}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t-2 border-slate-900 dark:border-slate-100 flex items-center justify-between gap-2">
          <PixelButton
            onClick={clearEvents}
            size="sm"
            variant="outline"
            icon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
          >
            {isVi ? "Xóa Log" : "Clear Log"}
          </PixelButton>

          <PixelButton
            onClick={onClose}
            size="sm"
            variant="secondary"
          >
            {isVi ? "Đóng" : "Close"}
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
