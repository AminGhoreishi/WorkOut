  "use client";

import { useState } from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
import type { UserTicketChatProps } from "@/types/ticket";
import { showAlert } from "@/utils/alert";
import TicketItem from "./TicketItem";
import TicketChatMessages from "./TicketChatMessages";
import TicketChatHeader from "./TicketChatHeader";
import TicketChatFooter from "./TicketChatFooter";

  export default function UserTicketChat({
    tickets,
    selectedTicket,
    setSelectedTicket,
    chatEndRef,
    onTicketUpdated,
  }: UserTicketChatProps) {
    const [replyText, setReplyText] = useState("");
    const [sendingReply, setSendingReply] = useState(false);

    const handleSendReply = async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = replyText.trim();
      if (
        !selectedTicket ||
        selectedTicket.initiatedBy === "coach" ||
        selectedTicket.status === "closed" ||
        !trimmed ||
        sendingReply
      ) {
        return;
      }

      setSendingReply(true);
      try {
        const res = await fetch("/api/user/ticket", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedTicket._id,
            messageText: trimmed,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.ticket) {
          setReplyText("");
          setSelectedTicket(data.ticket);
          if (onTicketUpdated) {
            onTicketUpdated();
          }
        } else {
          throw new Error(data.message || "خطا در ارسال پیام");
        }
      } catch (err: unknown) {
        showAlert("خطا", (err as Error).message || "ارسال پاسخ ناموفق بود.", "error");
      } finally {
        setSendingReply(false);
      }
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-danaMed">
        <div
          className={`lg:col-span-5 space-y-4 ${
            selectedTicket ? "hidden lg:block" : "block"
          }`}
        >
          <h2 className="text-white font-bold text-lg mb-2 font-morabbaReg">
            درخواست‌های من
          </h2>
          {tickets.length === 0 ? (
            <div className="p-12 text-center text-neutral-400 bg-white/[0.03] border border-amber-500/15 rounded-2xl">
              <MessageSquare className="w-12 h-12 mx-auto opacity-20 mb-3 text-amber-400" />
              شما هیچ تیکت پشتیبانی ثبت نکرده‌اید.
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {tickets.map((t) => (
                <TicketItem
                  key={t._id}
                  ticket={t}
                  isSelected={selectedTicket?._id === t._id}
                  onSelect={setSelectedTicket}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className={`lg:col-span-7 ${
            !selectedTicket ? "hidden lg:block" : "block"
          }`}
        >
          {selectedTicket && (
            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="mb-3 bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/20 px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer font-bold"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به درخواست‌ها</span>
            </button>
          )}

          {!selectedTicket ? (
            <div className="h-[480px] border border-dashed border-amber-500/20 rounded-2xl flex flex-col items-center justify-center text-neutral-400 p-8 text-center bg-white/[0.02]">
              <MessageSquare className="w-16 h-16 mb-4 opacity-20 text-amber-400" />
              <h4 className="font-bold text-lg text-white mb-2 font-morabbaReg">
                تیکتی انتخاب نشده است
              </h4>
              <p className="text-sm">
                برای مشاهده پاسخ‌ها و گفتگو، یکی از درخواست‌های خود را انتخاب کنید.
              </p>
            </div>
          ) : (
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-2xl overflow-hidden flex flex-col h-[580px] shadow-2xl">
              <TicketChatHeader selectedTicket={selectedTicket} />

              <TicketChatMessages
                selectedTicket={selectedTicket}
                chatEndRef={chatEndRef}
              />

              <TicketChatFooter
                selectedTicketStatus={selectedTicket.status}
                isCoachMessage={selectedTicket.initiatedBy === "coach"}
                replyText={replyText}
                setReplyText={setReplyText}
                sendingReply={sendingReply}
                onSendReply={handleSendReply}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
