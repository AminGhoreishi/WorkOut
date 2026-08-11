export default function CheckoutSkeleton() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-neutral-950 text-amber-50 py-8 sm:py-12 px-3 sm:px-4 relative overflow-hidden font-danaMed"
      dir="rtl"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 space-y-6 sm:space-y-8">
        <div className="flex justify-between items-center pb-4 border-b border-amber-500/20">
          <div className="h-5 w-32 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse" />
          <div className="h-7 w-40 bg-amber-500/10 border border-amber-500/20 rounded-full animate-pulse" />
        </div>

        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="h-9 w-64 bg-zinc-900 border border-zinc-800 rounded-xl mx-auto animate-pulse" />
          <div className="h-4 w-80 bg-zinc-900 border border-zinc-800 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-7 space-y-6 animate-pulse">
            <div className="bg-gradient-to-tr from-zinc-950 via-neutral-900 to-amber-950/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/30 rounded-xl" />
                  <div className="space-y-1">
                    <div className="h-3 w-24 bg-zinc-800 rounded" />
                    <div className="h-4 w-16 bg-zinc-800 rounded" />
                  </div>
                </div>
                <div className="h-6 w-20 bg-amber-500/10 border border-amber-500/20 rounded-lg" />
              </div>

              <div className="space-y-3 my-6">
                <div className="h-3 w-28 bg-zinc-800 rounded" />
                <div className="h-14 bg-black/60 border border-amber-500/30 rounded-2xl w-full" />
              </div>

              <div className="flex justify-between items-end pt-4 border-t border-amber-500/20">
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-zinc-800 rounded" />
                  <div className="h-4 w-24 bg-zinc-800 rounded" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-12 bg-zinc-800 rounded" />
                  <div className="h-4 w-20 bg-zinc-800 rounded" />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="h-4 w-32 bg-amber-500/20 rounded" />
              <div className="space-y-2">
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-5/6" />
                <div className="h-3 bg-zinc-800 rounded w-4/6" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 animate-pulse">
            <div className="bg-neutral-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="h-6 w-36 bg-zinc-800 rounded-lg" />
              <div className="space-y-3">
                <div className="h-12 bg-zinc-800 rounded-xl" />
                <div className="h-12 bg-zinc-800 rounded-xl" />
              </div>
              <div className="h-14 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
