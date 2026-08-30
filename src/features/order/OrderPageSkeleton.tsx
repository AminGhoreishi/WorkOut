export default function OrderPageSkeleton() {
  return (
    <div className="min-h-screen bg-black text-amber-50 px-3 sm:px-6 py-6 sm:py-12 relative overflow-hidden" dir="rtl">
      <div className="max-w-6xl mx-auto relative z-10 animate-pulse">
        <div className="mb-6 sm:mb-8 space-y-3">
          <div className="h-4 bg-zinc-800 rounded w-32" />
          <div className="h-8 bg-zinc-800 rounded w-64" />
          <div className="h-4 bg-zinc-800 rounded w-80" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/60 border border-amber-500/10 rounded-2xl p-6 h-48" />
            <div className="bg-zinc-900/60 border border-amber-500/10 rounded-2xl p-6 h-64" />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/80 border border-amber-500/10 rounded-2xl p-6 h-96" />
          </div>
        </div>
      </div>
    </div>
  );
}
