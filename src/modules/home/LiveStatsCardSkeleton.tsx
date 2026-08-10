export default function LiveStatsCardSkeleton() {
  return (
    <div className="flex justify-center">
      <div className="max-w-xs w-full bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-6 text-center animate-pulse">
        <div className="w-16 h-16 bg-neutral-800/80 rounded-full mx-auto mb-4" />
        <div className="h-10 w-24 bg-neutral-800/80 rounded-xl mx-auto mb-2" />
        <div className="h-4 w-20 bg-neutral-800/60 rounded mx-auto mb-2" />
        <div className="h-4 w-32 bg-neutral-800/60 rounded mx-auto" />
      </div>
    </div>
  );
}
