import type { TicketChatHeaderProps } from "@/types/ticket";
import {
  getStatusBadge,
  getStatusLabel,
  getCategoryBadge,
  getCategoryLabel,
  formatDate,
} from "./ticketHelpers";

export default function TicketChatHeader({
  selectedTicket,
}: TicketChatHeaderProps) {
  return (
    <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
      <div>
        <h3 className="text-md font-bold text-white line-clamp-1 mb-1 font-morabbaReg">
          {selectedTicket.subject}
        </h3>
        <div className="flex flex-wrap gap-2 items-center">
          <span
            className={`px-2 py-0.5 rounded-full border text-[8px] font-semibold ${getStatusBadge(selectedTicket.status)}`}
          >
            {getStatusLabel(selectedTicket.status)}
          </span>
          <span
            className={`px-2 py-0.5 rounded border text-[8px] ${getCategoryBadge(selectedTicket.category)}`}
          >
            {getCategoryLabel(selectedTicket.category)}
          </span>
          <span className="text-[9px] text-neutral-400 ss02">
            ثبت: {formatDate(selectedTicket.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
