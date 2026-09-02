"use client";

import { useRef, useEffect, useState, memo } from "react";
import { AlertCircle, Send, MessageSquareOff } from "lucide-react";
import type { TicketDetailsProps, TicketMutateApiResponse } from "@/types/ticket";
import EmptyTicketState from "./EmptyTicketState";
import TicketDetailsHeader from "./TicketDetailsHeader";
import { showAlert } from "@/utils/alert";
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { isVideo, formatTime } from "./ticketHelpers";

const TicketDetails = memo(function TicketDetails({
  selectedTicket,
  setSelectedTicket,
  onRefresh,
}: TicketDetailsProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    if (selectedTicket?.messages) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTicket?.messages]);

  useEffect(() => {
    setReplyText("");
  }, [selectedTicket?._id]);

  useEffect(() => {
    if (!selectedTicket?._id) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/admin/ticket/${selectedTicket._id}`);
        if (!res.ok) throw new Error();
        const data: TicketMutateApiResponse = await res.json().catch(() => ({}));
        if (data.success && data.ticket) {
          setSelectedTicket(data.ticket);
        }
      } catch {
        showAlert({
          title: "خطا",
          text: "خطا در دریافت جزئیات تیکت",
          icon: "error",
        });
      }
    };

    fetchDetails();
  }, [selectedTicket?._id, setSelectedTicket]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedTicket ||
      selectedTicket.status === "coach_sent" ||
      selectedTicket.initiatedBy === "coach" ||
      selectedTicket.status === "closed" ||
      !replyText.trim() ||
      sendingReply
    ) return;

    setSendingReply(true);
    try {
      const res = await fetch(`/api/admin/ticket/${selectedTicket._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageText: replyText.trim(),
        }),
      });

      const data: TicketMutateApiResponse = await res.json().catch(() => ({}));

      if (res.ok && data.ticket) {
        setReplyText("");
        setSelectedTicket(data.ticket);
      } else {
        throw new Error(data.message || "خطا در ارسال پاسخ");
      }
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "پاسخ ارسال نشد.";
      showAlert({
        title: "خطا",
        text: errMessage,
        icon: "error",
      });
    } finally {
      setSendingReply(false);
    }
  };

  if (!selectedTicket) {
    return <EmptyTicketState />;
  }

  const isCoachMessage =
    selectedTicket.status === "coach_sent" || selectedTicket.initiatedBy === "coach";

  const displayMessages =
    selectedTicket.messages?.filter((msg, idx) => {
      if (isCoachMessage && idx === 0 && msg.text.trim() === selectedTicket.description.trim()) {
        return false;
      }
      return true;
    }) || [];

  return (
    <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[650px] shadow-2xl font-danaMed" dir="rtl">
      <TicketDetailsHeader
        ticketId={selectedTicket._id}
        status={selectedTicket.status}
        category={selectedTicket.category}
        createdAt={selectedTicket.createdAt}
        subject={selectedTicket.subject}
        senderName={selectedTicket.userId?.fullName || selectedTicket.userId?.username}
        senderEmail={selectedTicket.userId?.email}
        setSelectedTicket={setSelectedTicket}
        onRefresh={onRefresh}
      />

      <div className="flex-1 overflow-y-auto p-6 bg-black/20">
        <MessageGroup className="space-y-4">
          <Message align={isCoachMessage ? "start" : "end"}>
            <MessageAvatar
              className={`border ${
                isCoachMessage
                  ? "bg-purple-500/20 border-purple-500/30 text-purple-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              }`}
            >
              {isCoachMessage
                ? "🛡️"
                : selectedTicket.userId?.username?.charAt(0)?.toUpperCase() || "👤"}
            </MessageAvatar>
            <MessageContent>
              <MessageHeader className={isCoachMessage ? "text-purple-400/80" : ""}>
                <span>
                  {isCoachMessage
                    ? selectedTicket.coachId?.fullName ||
                      selectedTicket.coachId?.username ||
                      "مربی استار فیت"
                    : selectedTicket.userId?.fullName || selectedTicket.userId?.username}
                </span>
                <span className="ss02 text-white/40">{formatTime(selectedTicket.createdAt)}</span>
              </MessageHeader>
              <Bubble variant={isCoachMessage ? "tinted" : "outline"}>
                <BubbleContent
                  className={isCoachMessage ? "rounded-tr-none" : "rounded-tl-none"}
                >
                  <p className="leading-relaxed whitespace-pre-line text-neutral-200">
                    {selectedTicket.description}
                  </p>
                  {selectedTicket.videoUrl && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-white/10 max-w-sm bg-black/40">
                      {isVideo(selectedTicket.videoUrl) ? (
                        <video
                          src={selectedTicket.videoUrl}
                          controls
                          className="w-full h-auto max-h-56 object-cover"
                        />
                      ) : (
                        <a
                          href={selectedTicket.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative group overflow-hidden"
                        >
                          <img
                            src={selectedTicket.videoUrl}
                            alt="پیوست حرکت"
                            className="w-full h-auto max-h-56 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white">
                            مشاهده تصویر کامل
                          </div>
                        </a>
                      )}
                    </div>
                  )}
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {displayMessages.map((msg) => {
              const senderObj = typeof msg.senderId === "object" ? msg.senderId : null;
              const isSupport = senderObj
                ? senderObj.role === "admin" || senderObj.role === "coach"
                : true;

              return (
                <Message
                  key={msg._id}
                  align={isSupport ? "start" : "end"}
                >
                  <MessageAvatar
                    className={`border ${
                      isSupport
                        ? "bg-purple-500/20 border-purple-500/30 text-purple-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    }`}
                  >
                    {isSupport
                      ? "🛡️"
                      : selectedTicket.userId?.username?.charAt(0)?.toUpperCase() || "👤"}
                  </MessageAvatar>
                  <MessageContent>
                    <MessageHeader
                      className={isSupport ? "text-purple-400/80" : "text-white/40"}
                    >
                      <span>{msg.senderName}</span>
                      <span className="ss02 text-white/40">{formatTime(msg.createdAt)}</span>
                    </MessageHeader>
                    <Bubble variant={isSupport ? "tinted" : "outline"}>
                      <BubbleContent
                        className={isSupport ? "rounded-tr-none" : "rounded-tl-none"}
                      >
                        <p className="leading-relaxed whitespace-pre-line text-neutral-200">
                          {msg.text}
                        </p>
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              );
            })}
          <div ref={messageEndRef} />
        </MessageGroup>
      </div>

      <div className="p-4 border-t border-white/10 bg-black/40">
        {isCoachMessage ? (
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center text-purple-300 text-xs flex items-center justify-center gap-2">
            <MessageSquareOff className="w-4 h-4 text-purple-400" />
            این پیام به عنوان «ارسال از مربی» ثبت شده است و نیازی به ارسال پاسخ ندارد.
          </div>
        ) : selectedTicket.status === "closed" ? (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-red-400 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            این تیکت پشتیبانی بسته شده است. در صورت تمایل ابتدا دکمه بازگشایی تیکت را کلیک کنید.
          </div>
        ) : (
          <form onSubmit={handleSendReply} className="flex gap-2">
            <textarea
              rows={1}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="پاسخ خود را در اینجا بنویسید..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder:text-white/45 focus:outline-none focus:border-amber-400 resize-none leading-relaxed h-11 min-h-[44px] max-h-24 overflow-y-auto"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendReply(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!replyText.trim() || sendingReply}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold hover:shadow-lg hover:shadow-amber-500/20 w-12 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
});

export default TicketDetails;
