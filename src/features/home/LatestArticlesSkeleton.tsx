export default function LatestArticlesSkeleton() {
  return (
    <section className="py-20 bg-neutral-950/80 font-danaMed" dir="rtl">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="h-10 w-48 bg-neutral-800/80 animate-pulse rounded-xl mb-4" />
            <div className="h-5 w-60 bg-neutral-800/60 animate-pulse rounded-lg" />
          </div>
          <div className="h-6 w-24 bg-neutral-800/60 animate-pulse rounded-lg" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-neutral-900/80 border border-amber-500/20 rounded-2xl overflow-hidden animate-pulse flex flex-col"
            >
              <div className="aspect-video bg-neutral-800/70" />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-16 bg-neutral-800/80 rounded-full" />
                    <div className="h-4 w-20 bg-neutral-800/60 rounded" />
                  </div>
                  <div className="h-6 w-full bg-neutral-800/80 rounded mb-3" />
                  <div className="h-4 w-full bg-neutral-800/60 rounded mb-4" />
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-amber-500/20">
                  <div className="w-8 h-8 rounded-full bg-neutral-800/80" />
                  <div className="h-4 w-24 bg-neutral-800/60 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
