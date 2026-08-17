import UsersTable from "./UsersTable";
import type { UsersStatsProps } from "@/types/user";

export default function AdminUsers({
  initialStats,
}: {
  initialStats?: UsersStatsProps;
}) {
  return (
    <div className="overflow-hidden font-danaMed" dir="rtl">
      <div className="container mx-auto pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-morabbaReg">
            مدیریت کاربران
          </h1>
          <p className="text-white/60 text-sm">
            مشاهده، ویرایش و مدیریت دسترسی‌های کاربران سیستم استار فیت
          </p>
        </div>

        <UsersTable initialStats={initialStats} />
      </div>
    </div>
  );
}
