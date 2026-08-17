export default function ArticleSkeleton() {
  return (
    <div
      className="min-h-screen bg-neutral-950 text-white font-danaMed ss02"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 bg-neutral-900 border border-amber-500/10 rounded w-16" />
          <div className="h-4 bg-neutral-900 border border-amber-500/10 rounded w-4" />
          <div className="h-4 bg-neutral-900 border border-amber-500/10 rounded w-24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video rounded-2xl bg-neutral-900/60 border border-amber-500/20" />

            <div className="flex items-center gap-3">
              <div className="h-6 bg-amber-500/10 border border-amber-500/20 rounded-full w-20" />
              <div className="h-5 bg-neutral-900 border border-amber-500/10 rounded-full w-16" />
              <div className="h-5 bg-neutral-900 border border-amber-500/10 rounded-full w-16" />
            </div>

            <div className="h-9 bg-neutral-900 rounded-xl w-4/5" />

            <div className="flex items-center gap-4 py-4 border-y border-amber-500/10">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-amber-500/20" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-neutral-900 rounded w-32" />
                <div className="h-3 bg-neutral-900 rounded w-24" />
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="h-4 bg-neutral-900 rounded w-full" />
              <div className="h-4 bg-neutral-900 rounded w-11/12" />
              <div className="h-4 bg-neutral-900 rounded w-4/5" />
              <div className="h-4 bg-neutral-900 rounded w-full" />
              <div className="h-4 bg-neutral-900 rounded w-3/4" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl p-6 bg-neutral-900/60 border border-amber-500/20 h-44" />
            <div className="rounded-2xl p-6 bg-neutral-900/60 border border-amber-500/20 h-48" />
            <div className="rounded-2xl p-6 bg-neutral-900/60 border border-amber-500/20 h-64" />
          </div>
        </div>
      </div>
    </div>
  );
}
