export function calculateDirectDiscountAmount(
  basePrice: number,
  directDiscountPercent: number,
): number {
  if (directDiscountPercent <= 0) return 0;
  return Math.floor((basePrice * directDiscountPercent) / 100);
}

export function calculateCouponDiscountAmount(
  basePrice: number,
  couponDiscountPercent: number,
): number {
  if (couponDiscountPercent <= 0) return 0;
  return Math.floor((basePrice * couponDiscountPercent) / 100);
}

export function calculateTotalDiscountAmount(
  basePrice: number,
  directDiscountPercent: number,
  couponDiscountPercent: number,
): number {
  return (
    calculateDirectDiscountAmount(basePrice, directDiscountPercent) +
    calculateCouponDiscountAmount(basePrice, couponDiscountPercent)
  );
}

export function calculateFinalPrice(
  basePrice: number,
  directDiscountPercent: number,
  couponDiscountPercent: number,
): number {
  const totalDiscount = calculateTotalDiscountAmount(
    basePrice,
    directDiscountPercent,
    couponDiscountPercent,
  );
  return Math.max(basePrice - totalDiscount, 0);
}

export function formatFaNumber(num: number): string {
  return new Intl.NumberFormat("fa-IR").format(num || 0);
}
