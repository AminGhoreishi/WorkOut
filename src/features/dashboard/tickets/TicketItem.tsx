import type { TicketItemProps } from "@/types/ticket";
import {
  getStatusBadge,
  getStatusLabel,
  getCategoryBadge,
  getCategoryLabel,
  formatDate,
} from "./ticketHelpers";

export default function TicketItem({
  ticket,
  isSelected,
  onSelect,
}: TicketItemProps) {
  return (
    <div
      onClick={() => onSelect(ticket)}
      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-3 ${
        isSelected
          ? "bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10"
          : "bg-white/[0.03] border-white/10 text-white hover:bg-white/5"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="font-bold text-sm line-clamp-1">
            {ticket.subject}
          </span>
          {ticket.initiatedBy === "coach" && (
            <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold shrink-0">
              پیام مربی
            </span>
          )}
        </div>
        <span
          className={`px-2 py-0.5 rounded border text-[9px] shrink-0 mr-2 ${getCategoryBadge(ticket.category)}`}
        >
          {getCategoryLabel(ticket.category)}
        </span>
      </div>
      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
        {ticket.description}
      </p>
      <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-2 border-t border-white/5">
        <span
          className={`px-2 py-0.5 rounded-full border text-[9px] ${getStatusBadge(ticket.status)}`}
        >
          {getStatusLabel(ticket.status)}
        </span>
        <span className="ss02">{formatDate(ticket.createdAt)}</span>
      </div>
    </div>
  );
}
