import type { PriceCardProps } from "@/types/components";

export default function PriceCard({ price, originalPrice }: PriceCardProps) {
  const billingCycle = "monthly";

  const getPriceForCycle = (cycle: typeof billingCycle) => {
    return price[cycle];
  };

  const getOriginalPriceForCycle = (cycle: typeof billingCycle) => {
    return originalPrice[cycle];
  };

  const calculateDiscount = () => {
    const original = getOriginalPriceForCycle(billingCycle);
    const current = getPriceForCycle(billingCycle);
    return Math.round(((original - current) / original) * 100);
  };

  const currentPrice = getPriceForCycle(billingCycle);
  const oldPrice = getOriginalPriceForCycle(billingCycle);
  const discountPercent = calculateDiscount();

  return (
    <div className="relative z-10 bg-neutral-900/90 border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-2 sm:space-y-3 font-danaMed">
      <div className="flex items-center justify-between">
        <span className="text-neutral-400 text-xs sm:text-sm font-medium">
          مبلغ قابل پرداخت:
        </span>
        <div className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold flex items-center gap-1">
          <span>{discountPercent.toLocaleString("fa-IR")}٪</span>
          <span>تخفیف</span>
        </div>
      </div>
      <div className="flex items-baseline gap-1 justify-between pt-1">
        <div className="text-sm sm:text-3xl md:text-4xl font-extrabold text-amber-400 font-morabbaReg leading-none">
          {currentPrice.toLocaleString("fa-IR")}
          <span className="text-xs sm:text-sm font-normal text-neutral-400 mr-1">
            تومان
          </span>
        </div>
        <div className="text-xs sm:text-sm text-neutral-500 line-through">
          {oldPrice.toLocaleString("fa-IR")}
        </div>
      </div>
    </div>
  );
}
