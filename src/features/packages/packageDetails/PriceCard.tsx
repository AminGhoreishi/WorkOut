import type { PriceCardProps } from "@/types/components";

export default function PriceCard({ price }: PriceCardProps) {
  const currentPrice = price?.monthly || 0;

  return (
    <div className="relative z-10 bg-neutral-900/90 border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-2 sm:space-y-3 font-danaMed">
      <div className="flex items-center justify-between">
        <span className="text-neutral-400 text-xs sm:text-sm font-medium">
          مبلغ قابل پرداخت (یک ماهه):
        </span>
      </div>
      <div className="flex items-baseline gap-1 justify-between pt-1">
        <div className="text-sm sm:text-3xl md:text-4xl font-extrabold text-amber-400 font-morabbaReg leading-none">
          {currentPrice.toLocaleString("fa-IR")}
          <span className="text-xs sm:text-sm font-normal text-neutral-400 mr-1">
            تومان
          </span>
        </div>
      </div>
    </div>
  );
}
