"use client";

import { useEffect } from "react";
import { MessageSquare, ExternalLink, X } from "lucide-react";
import type { ViewCommentModalProps } from "@/types/comment";

export default function ViewCommentModal({
  isOpen,
  comment,
  onClose,
}: ViewCommentModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !comment) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-danaMed"
      dir="rtl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <h2 className="text-xl text-white font-bold font-morabbaReg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <span>مشاهده دیدگاه</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 font-bold text-lg">
                {comment.avatar || (comment.name ? comment.name.charAt(0) : "👤")}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  {comment.name || "کاربر ناشناس"}
                </div>
                <div className="text-white/60 text-xs mt-0.5">
                  {comment.userId ? comment.userId.email : "مهمان"}
                </div>
              </div>
            </div>

            <div className="text-xs text-white/50 ss02">
              {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString("fa-IR") : "—"}
            </div>
          </div>

          {comment.blogId && (
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 text-xs">
              <span className="text-white/60">مطلب مربوطه:</span>
              <a
                href={`/article/${comment.blogId.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-semibold"
              >
                <span>{comment.blogId.title}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div>
            <label className="block text-white/80 mb-2 text-xs font-medium">
              متن کامل دیدگاه
            </label>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
              {comment.text}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-end bg-black/20">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer text-sm font-semibold"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
