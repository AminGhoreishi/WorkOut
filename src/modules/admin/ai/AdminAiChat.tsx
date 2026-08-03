"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Plus,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  Dumbbell,
  BarChart3,
  Utensils,
  FileText,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Cpu,
} from "lucide-react";
import type {
  ChatMessage,
  ChatSession,
  AiPromptSuggestion,
  AdminAiChatProps,
} from "@/types/adminAi";

const defaultSuggestions: AiPromptSuggestion[] = [
  {
    id: "s1",
    title: "طراحی برنامه ورزشی ٪۴ هفته‌ای٪",
    prompt: "یک برنامه ورزشی ۴ هفته‌ای هیبریدی برای افزایش حجم عضلانی طراحی کن.",
    category: "تمرین",
  },
  {
    id: "s2",
    title: "آنالیز آمار و کاربران اخیر",
    prompt: "وضعیت ثبت‌نام و درآمد این ماه کاربران را آنالیز کن و پیشنهاد رشد بده.",
    category: "آمار",
  },
  {
    id: "s3",
    title: "تنظیم رژیم کاهش چربی",
    prompt: "یک رژیم غذایی علمی با میزان بالای پروتئین برای چربی‌سوزی پیشنهاد بده.",
    category: "تغذیه",
  },
  {
    id: "s4",
    title: "تولید مقاله وبلاگ ورزشی",
    prompt: "یک مقاله جامع در مورد هایپرتروفی عضلانی و زمان‌بندی استراحت بنویس.",
    category: "مقاله",
  },
];

export default function AdminAiChat({ initialSessions }: AdminAiChatProps) {
  const [sessions, setSessions] = useState<ChatSession[]>(
    initialSessions || [
      {
        id: "sess-1",
        title: "بررسی آمار و برنامه‌ریزی ماهانه",
        createdAt: "امروز",
        messagesCount: 4,
      },
      {
        id: "sess-2",
        title: "طراحی برنامه هایپرتروفی پیشرفته",
        createdAt: "دیروز",
        messagesCount: 6,
      },
    ]
  );
  const [activeSessionId, setActiveSessionId] = useState<string>("sess-1");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-welcome",
      role: "assistant",
      content:
        "سلام مدیر عزیز! 👋 من دستیار هوش مصنوعی پیشرفته شما هستم. می‌توانم در طراحی برنامه‌های ورزشی، تنظیم برنامه‌های غذایی، آنالیز آمار سیستم و نوشتن مقالات به شما کمک کنم.",
      createdAt: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      model: "Gemini 1.5 Pro",
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-flash");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: "usr_" + Date.now(),
      role: "user",
      content: textToSend,
      createdAt: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend, model: selectedModel }),
      });

      if (res.ok) {
        const data: ChatMessage = await res.json();
        setMessages((prev) => [...prev, data]);
      } else {
        const errorData = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: "err_" + Date.now(),
            role: "assistant",
            content:
              errorData.message ||
              "خطایی در دریافت پاسخ هوش مصنوعی رخ داد. لطفاً مجدداً تلاش کنید.",
            createdAt: new Date().toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          role: "assistant",
          content: "ارتباط با سرور هوش مصنوعی برقرار نشد.",
          createdAt: new Date().toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    const newId = "sess_" + Date.now();
    const newSess: ChatSession = {
      id: newId,
      title: "گفتگوی جدید",
      createdAt: "هم‌اکنون",
      messagesCount: 1,
    };
    setSessions([newSess, ...sessions]);
    setActiveSessionId(newId);
    setMessages([
      {
        id: "m-welcome-" + Date.now(),
        role: "assistant",
        content: "گفتگوی جدید آغاز شد. چگونه می‌توانم به شما کمک کنم؟",
        createdAt: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "m-clear-" + Date.now(),
        role: "assistant",
        content: "تاریخچه این گفتگو پاک شد.",
        createdAt: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row bg-neutral-950 text-white rounded-3xl border border-amber-500/20 shadow-[0_0_40px_rgba(234,179,8,0.05)] overflow-hidden font-danaMed relative">
      <div
        className={`w-full md:w-80 bg-neutral-900/90 border-b md:border-b-0 md:border-l border-amber-500/20 flex flex-col shrink-0 transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div className="p-4 border-b border-amber-500/20 flex items-center justify-between gap-3">
          <button
            onClick={handleNewChat}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold text-sm transition-all shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>گفتگوی جدید</span>
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-neutral-800/80">
          <div className="text-xs font-semibold text-neutral-400 mb-2 flex items-center justify-between">
            <span>مدل هوش مصنوعی</span>
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-neutral-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-300 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="gemini-flash">Gemini 1.5 Flash (سریع)</option>
            <option value="gemini-pro">Gemini 1.5 Pro (پیشرفته)</option>
            <option value="gpt-4o">GPT-4o (تخصصی ورزشی)</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-xs font-bold text-neutral-400 px-2 mb-2">
            گفتگوهای اخیر
          </div>
          {sessions.map((sess) => {
            const isActive = sess.id === activeSessionId;
            return (
              <div
                key={sess.id}
                onClick={() => setActiveSessionId(sess.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  isActive
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm"
                    : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-medium truncate">
                    {sess.title}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500 shrink-0">
                  {sess.createdAt}
                </span>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-neutral-800 bg-neutral-950/40">
          <div className="text-xs font-bold text-neutral-400 mb-3">
            دسته‌بندی‌های سریع
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                handleSend("یک برنامه ورزشی حرفه‌ای برای مربیان طراحی کن.")
              }
              className="flex items-center gap-1.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 text-[11px] text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
              <span>تمرینات</span>
            </button>
            <button
              onClick={() =>
                handleSend("یک رژیم غذایی اختصاصی برای حجم خالص تنظیم کن.")
              }
              className="flex items-center gap-1.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 text-[11px] text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <Utensils className="w-3.5 h-3.5 text-emerald-400" />
              <span>تغذیه</span>
            </button>
            <button
              onClick={() =>
                handleSend("گزارش آمار ثبت‌نام و درآمد سیستم را تحلیل کن.")
              }
              className="flex items-center gap-1.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 text-[11px] text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              <span>تحلیل آمار</span>
            </button>
            <button
              onClick={() =>
                handleSend("ایده و ساختار یک مقاله جدید وبلاگ را پیشنهاد بده.")
              }
              className="flex items-center gap-1.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 text-[11px] text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>مقالات</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-neutral-950">
        <div className="h-16 px-4 md:px-6 border-b border-amber-500/20 flex items-center justify-between bg-neutral-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl bg-neutral-900 border border-amber-500/20 text-amber-400 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-white font-morabbaReg flex items-center gap-2">
                دستیار هوش مصنوعی مدیریت
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                  فعال
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">
                پاسخ‌گویی به سوالات، تحلیل داده‌ها و ساخت برنامه‌ها
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
              title="پاکسازی پیام‌ها"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(234,179,8,0.15)]">
                <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white font-morabbaReg mb-2">
                دستیار هوشمند پیشخوان مدیریت
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                یک سوال بپرسید یا یکی از پیشنهادهای زیر را انتخاب کنید تا هوش
                مصنوعی پردازش را انجام دهد.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {defaultSuggestions.map((sug) => (
                  <button
                    key={sug.id}
                    onClick={() => handleSend(sug.prompt)}
                    className="p-3 rounded-2xl bg-neutral-900/80 border border-amber-500/20 hover:border-amber-400/50 hover:bg-neutral-900 text-right transition-all group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-white mb-1 group-hover:text-amber-300">
                      {sug.title}
                    </div>
                    <div className="text-[11px] text-neutral-400 line-clamp-2">
                      {sug.prompt}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 md:gap-4 max-w-3xl ${
                    isUser ? "mr-auto flex-row-reverse" : "ml-auto"
                  }`}
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isUser
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-amber-500/30 text-amber-400"
                    }`}
                  >
                    {isUser ? (
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Bot className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-bold text-neutral-300">
                        {isUser ? "شما" : "هوش مصنوعی"}
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        {msg.createdAt}
                      </span>
                    </div>

                    <div
                      className={`p-4 rounded-3xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap relative group ${
                        isUser
                          ? "bg-amber-500/10 border border-amber-500/30 text-amber-100 rounded-tl-none"
                          : "bg-neutral-900/90 border border-neutral-800 text-neutral-200 rounded-tr-none shadow-md"
                      }`}
                    >
                      {msg.content}

                      {!isUser && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="absolute left-3 top-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all cursor-pointer"
                          title="کپی متن"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {isLoading && (
            <div className="flex gap-3 md:gap-4 max-w-3xl ml-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-3xl rounded-tr-none bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>در حال تحلیل و نگارش پاسخ...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-amber-500/20 bg-neutral-900/60 backdrop-blur-md">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {defaultSuggestions.map((sug) => (
                <button
                  key={sug.id}
                  onClick={() => handleSend(sug.prompt)}
                  className="px-3 py-1 rounded-full bg-neutral-950 border border-amber-500/20 hover:border-amber-400/50 text-neutral-300 hover:text-amber-300 text-[11px] whitespace-nowrap transition-colors cursor-pointer"
                >
                  ✨ {sug.title}
                </button>
              ))}
            </div>

            <div className="relative flex items-center">
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="پیام خود را برای هوش مصنوعی بنویسید (Shift + Enter برای خط بعدی)..."
                className="w-full bg-neutral-950 border border-amber-500/30 rounded-2xl pr-4 pl-14 py-3 text-white text-xs md:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 resize-none h-14 min-h-[56px] max-h-32 transition-colors"
              />

              <button
                onClick={() => handleSend()}
                disabled={!inputPrompt.trim() || isLoading}
                className="absolute left-2.5 p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(234,179,8,0.2)]"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
