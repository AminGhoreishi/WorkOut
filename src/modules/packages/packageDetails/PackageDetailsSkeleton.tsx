export default function PackageDetailsSkeleton() {
  return (
    <div
      className="min-h-screen bg-neutral-950 text-neutral-100 relative overflow-hidden font-danaMed"
      dir="rtl"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="h-5 w-48 bg-neutral-900/80 border border-neutral-800/60 rounded-lg animate-pulse" />
      </div>

      <section className="py-8 sm:py-12 lg:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-6 sm:space-y-10">
              <div className="h-7 w-36 bg-amber-500/10 border border-amber-500/20 rounded-full animate-pulse" />

              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 bg-neutral-900 border border-amber-500/20 rounded-2xl animate-pulse shrink-0" />
                  <div className="space-y-3 flex-1">
                    <div className="h-8 sm:h-12 w-3/4 bg-neutral-900 border border-neutral-800 rounded-xl animate-pulse" />
                    <div className="h-6 w-44 bg-neutral-900 border border-neutral-800 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2.5 max-w-3xl">
                  <div className="h-4 bg-neutral-900 rounded-lg w-full animate-pulse" />
                  <div className="h-4 bg-neutral-900 rounded-lg w-5/6 animate-pulse" />
                  <div className="h-4 bg-neutral-900 rounded-lg w-2/3 animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-neutral-900/80 border border-amber-500/10 rounded-2xl p-4 sm:p-6 animate-pulse">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-neutral-800 rounded-xl" />
                  <div className="h-5 w-12 bg-neutral-800 rounded" />
                  <div className="h-3 w-16 bg-neutral-800/60 rounded" />
                </div>
                <div className="flex flex-col items-center space-y-2 border-x border-neutral-800 px-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-neutral-800 rounded-xl" />
                  <div className="h-5 w-12 bg-neutral-800 rounded" />
                  <div className="h-3 w-16 bg-neutral-800/60 rounded" />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-neutral-800 rounded-xl" />
                  <div className="h-5 w-12 bg-neutral-800 rounded" />
                  <div className="h-3 w-16 bg-neutral-800/60 rounded" />
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-amber-500/20 rounded-3xl p-5 sm:p-8 space-y-4 animate-pulse">
                <div className="h-6 w-40 bg-neutral-800 rounded-lg" />
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 bg-neutral-800/40 p-3 rounded-xl">
                      <div className="w-6 h-6 bg-neutral-800 rounded-lg shrink-0" />
                      <div className="h-4 bg-neutral-800 rounded w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-neutral-900/90 border border-amber-500/20 rounded-3xl p-5 sm:p-8 space-y-6 animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-neutral-800 rounded" />
                  <div className="h-10 w-44 bg-neutral-800 rounded-xl" />
                </div>

                <div className="h-14 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-2xl w-full" />

                <div className="space-y-3 pt-2">
                  <div className="h-5 bg-neutral-800/60 rounded w-full" />
                  <div className="h-5 bg-neutral-800/60 rounded w-full" />
                  <div className="h-5 bg-neutral-800/60 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
