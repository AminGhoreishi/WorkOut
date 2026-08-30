import type { Metadata } from "next";
import { connection } from "next/server";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import Discount from "@/models/Discount";
import DiscountsManagement from "@/features/admin/discounts/DiscountsManagement";
import type { DiscountStatsData } from "@/types/discount";

export const metadata: Metadata = {
  title: "مدیریت کدهای تخفیف | استار فیت",
  description: "مدیریت و پیکربندی کدهای تخفیف سیستم استار فیت",
};

export default async function AdminDiscountsPage() {
  await connection();
  registerModels();
  await dbConnect();

  const [totalCount, activeCount, inactiveCount, usageAgg] = await Promise.all([
    Discount.countDocuments(),
    Discount.countDocuments({ isActive: true }),
    Discount.countDocuments({ isActive: false }),
    Discount.aggregate([
      {
        $group: {
          _id: null,
          totalUsage: { $sum: { $ifNull: ["$usageCount", 0] } },
        },
      },
    ]),
  ]);

  const initialStats: DiscountStatsData = {
    totalCount,
    activeCount,
    inactiveCount,
    totalUsage: usageAgg[0]?.totalUsage || 0,
  };

  return <DiscountsManagement initialStats={initialStats} />;
}
