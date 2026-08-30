import type { SubscriptionPackageItem } from "@/types/package";

export function formatPackagesWithDiscounts(
  packages: any[],
  features: any[],
  directDiscounts: any[],
): SubscriptionPackageItem[] {
  return packages.map((pkg) => {
    const activeDiscount = directDiscounts.find(
      (d) =>
        !d.packages ||
        d.packages.length === 0 ||
        d.packages.some((p: any) => p.toString() === pkg._id.toString()),
    );

    const discountPercent = activeDiscount ? activeDiscount.percent : 0;
    const originalPrice = pkg.price?.monthly ?? 0;
    const finalPrice = discountPercent
      ? originalPrice - (originalPrice * discountPercent) / 100
      : originalPrice;

    return {
      _id: pkg._id.toString(),
      name: pkg.name,
      slug: pkg.slug,
      originalPrice,
      price: finalPrice,
      discountPercent,
      hasDiscount: discountPercent > 0,
      popular: pkg.isPopular,
      duration: "اشتراک دوره",
      features: features
        .filter((f) => f.packageId.toString() === pkg._id.toString())
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((f) => ({
          _id: f._id.toString(),
          packageId: f.packageId.toString(),
          name: f.name,
          description: f.description,
          included: f.included,
          sortOrder: f.sortOrder,
        })),
    };
  });
}

export function formatSinglePackageWithDiscounts(
  pkg: any,
  directDiscounts: any[],
) {
  const activeDiscount = directDiscounts.find(
    (d) =>
      !d.packages ||
      d.packages.length === 0 ||
      d.packages.some((p: any) => p.toString() === pkg._id.toString()),
  );

  const discountPercent = activeDiscount ? activeDiscount.percent : 0;
  const originalPrice = pkg.price?.monthly ?? 0;
  const finalPrice = discountPercent
    ? originalPrice - (originalPrice * discountPercent) / 100
    : originalPrice;

  return {
    ...pkg,
    _id: pkg._id.toString(),
    originalPrice,
    price: {
      ...pkg.price,
      monthly: finalPrice,
    },
    discountPercent,
    hasDiscount: discountPercent > 0,
  };
}
