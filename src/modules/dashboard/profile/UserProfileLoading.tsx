import { Loader2 } from "lucide-react";
import type { UserProfileLoadingProps } from "@/types/user-profile";

export default function UserProfileLoading({
  message = "در حال بارگذاری اطلاعات پروفایل...",
}: UserProfileLoadingProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-white/60 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      <span>{message}</span>
    </div>
  );
}
