import { CheckCircle } from "lucide-react";
import type { UserProfileCardProps } from "@/types/user-profile";

export default function UserProfileCard({ profile }: UserProfileCardProps) {
  const avatarLetter = profile?.fullName
    ? profile.fullName.charAt(0)
    : profile?.username?.charAt(0) || "U";

  const roleText =
    profile?.role === "admin"
      ? "مدیر کل"
      : profile?.role === "coach"
        ? "مربی مجرب"
        : "ورزشکار فیت‌کوچ";

  return (
    <div className="md:col-span-1 bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl h-fit">
      <div className="w-20 h-20 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 rounded-full flex items-center justify-center font-bold text-3xl shadow-lg mb-4">
        {avatarLetter}
      </div>
      <h2 className="text-xl font-bold font-morabbaReg text-white">
        {profile?.fullName || "کاربر ورزشکار"}
      </h2>
      <p className="text-amber-400 text-xs mt-1 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
        {roleText}
      </p>

      <hr className="border-white/10 w-full my-6" />

      <div className="w-full text-right space-y-3 text-xs text-neutral-400">
        <div className="flex justify-between items-center">
          <span>نام کاربری:</span>
          <span className="text-white font-medium">
            @{profile?.username}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>وضعیت حساب:</span>
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            تایید شده
          </span>
        </div>
      </div>
    </div>
  );
}
