"use client";

import { X } from "lucide-react";
import type { PaymentActionAlertProps } from "@/types/admin-payments";

export default function PaymentActionAlert({
  message,
  onClose,
}: PaymentActionAlertProps) {
  if (!message) return null;

  return (
    <div
      className={`p-4 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-all ${
        message.type === "success"
          ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
          : "bg-red-500/10 border border-red-500/30 text-red-300"
      }`}
    >
      <span>{message.text}</span>
      <button
        type="button"
        onClick={onClose}
        className="text-zinc-400 hover:text-white p-1 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
