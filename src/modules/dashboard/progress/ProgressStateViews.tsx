export function ProgressLoadingState() {
  return (
    <div className="min-h-screen bg-neutral-950 p-6 flex flex-col items-center justify-center font-danaMed text-amber-400">
      <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm">در حال بارگذاری اطلاعات پیشرفت شما...</p>
    </div>
  );
}

export function ProgressErrorState() {
  return (
    <div className="min-h-screen bg-neutral-950 p-6 flex flex-col items-center justify-center font-danaMed text-red-400">
      <p className="text-sm">خطا در دریافت اطلاعات پیشرفت. لطفاً دوباره تلاش کنید.</p>
    </div>
  );
}
