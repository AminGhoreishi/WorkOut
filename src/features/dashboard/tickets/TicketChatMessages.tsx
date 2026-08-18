import Image from "next/image";
import { Shield } from "lucide-react";
import type { TicketChatMessagesProps } from "@/types/ticket";
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import { isVideo, formatTime } from "./ticketHelpers";

export default function TicketChatMessages({
  selectedTicket,
  chatEndRef,
}: TicketChatMessagesProps) {
  return (
    <MessageGroup className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
      <Message align="end" className="max-w-[85%] mr-auto">
        <MessageAvatar className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold shrink-0">
          من
        </MessageAvatar>
        <MessageContent className="bg-amber-500/10 border border-amber-500/20 rounded-2xl rounded-tl-none p-3 text-white text-xs">
          <MessageHeader className="text-amber-400/70 text-[9px] mb-1 font-bold px-0">
            من
          </MessageHeader>
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
                  <Image
                    src={selectedTicket.videoUrl}
                    alt="پیوست حرکت"
                    width={400}
                    height={300}
                    className="w-full h-auto max-h-56 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white">
                    مشاهده تصویر کامل
                  </div>
                </a>
              )}
            </div>
          )}
        </MessageContent>
      </Message>

      {selectedTicket.messages &&
        selectedTicket.messages.map((msg) => {
          const sender = msg.senderId as { role?: string } | null;
          const isSupport =
            typeof msg.senderId === "object" && msg.senderId !== null
              ? sender?.role === "admin" || sender?.role === "coach"
              : true;

          return (
            <Message
              key={msg._id}
              align={isSupport ? "start" : "end"}
              className={`max-w-[85%] ${isSupport ? "justify-start" : "mr-auto"}`}
            >
              <MessageAvatar
                className={`w-8 h-8 rounded-full text-[10px] font-bold shrink-0 border ${
                  isSupport
                    ? "bg-amber-500/20 border-amber-500/30 text-amber-400"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-300"
                }`}
              >
                {isSupport ? (
                  <Shield className="w-4 h-4 text-amber-400" />
                ) : (
                  "من"
                )}
              </MessageAvatar>
              <MessageContent
                className={`rounded-2xl p-3 text-white text-xs border ${
                  isSupport
                    ? "bg-white/5 border-white/10 rounded-tr-none"
                    : "bg-amber-500/10 border-amber-500/20 rounded-tr-none"
                }`}
              >
                <MessageHeader className="flex justify-between items-center gap-6 text-neutral-400 text-[9px] mb-1 px-0">
                  <span>{isSupport ? "پشتیبان فیت‌کوچ" : "من"}</span>
                  <span className="ss02">{formatTime(msg.createdAt)}</span>
                </MessageHeader>
                <p className="leading-relaxed whitespace-pre-line text-neutral-200">
                  {msg.text}
                </p>
              </MessageContent>
            </Message>
          );
        })}
      <div ref={chatEndRef} />
    </MessageGroup>
  );
}
