import type { UserProfileErrorProps } from "@/types/user-profile";

export default function UserProfileError({
  errorMessage,
  onRetry,
}: UserProfileErrorProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white/60 gap-4">
      <p className="text-red-400">{errorMessage || "خطا در دریافت اطلاعات"}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm transition-colors cursor-pointer"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
