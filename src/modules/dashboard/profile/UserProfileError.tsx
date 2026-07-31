import type { UserProfileErrorProps } from "@/types/user-profile";

export default function UserProfileError({
  errorMessage,
  onRetry,
}: UserProfileErrorProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-neutral-400 gap-4 font-danaMed">
      <p className="text-amber-400 font-semibold">{errorMessage || "خطا در دریافت اطلاعات"}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold hover:opacity-95 rounded-xl text-sm transition-colors cursor-pointer"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
