import type { PriceCardProps } from "@/types/components";

export default function PriceCard({
  price,
  originalPrice,
  discountPercent,
  hasDiscount,
}: PriceCardProps) {
  const currentPrice = price?.monthly || 0;

  return (
    <div className="relative z-10 bg-neutral-900/90 border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-2 sm:space-y-3 font-danaMed">
      <div className="flex items-center justify-between">
        <span className="text-neutral-400 text-xs sm:text-sm font-medium">
          مبلغ قابل پرداخت (یک ماهه):
        </span>
        {hasDiscount && discountPercent ? (
          <span className="text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-md ss02">
            {discountPercent}٪ تخفیف
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline gap-2 justify-between pt-1">
        {hasDiscount && originalPrice ? (
          <span className="text-xs sm:text-sm text-neutral-500 line-through ss02">
            {originalPrice.toLocaleString("fa-IR")} تومان
          </span>
        ) : null}
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
