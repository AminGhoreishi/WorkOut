export default function LiveStatsSkeleton() {
  return (
    <section className="py-20 font-danaMed" dir="rtl">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-600/10 border border-amber-500/30 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="h-10 w-56 bg-neutral-800/80 animate-pulse rounded-xl mx-auto mb-4" />
            <div className="h-5 w-44 bg-neutral-800/60 animate-pulse rounded-lg mx-auto" />
          </div>
          <div className="flex justify-center">
            <div className="max-w-xs w-full bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-6 text-center animate-pulse">
              <div className="w-16 h-16 bg-neutral-800/80 rounded-full mx-auto mb-4" />
              <div className="h-10 w-24 bg-neutral-800/80 rounded-xl mx-auto mb-2" />
              <div className="h-4 w-20 bg-neutral-800/60 rounded mx-auto mb-2" />
              <div className="h-4 w-32 bg-neutral-800/60 rounded mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
