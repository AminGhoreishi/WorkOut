export default function OrderSummarySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-zinc-800 rounded w-20" />
          <div className="h-4 bg-zinc-800 rounded w-24" />
        </div>
      </div>
      <div className="pt-4 border-t border-amber-500/20 flex justify-between items-center">
        <div className="h-4 bg-zinc-800 rounded w-28" />
        <div className="h-7 bg-zinc-800 rounded w-32" />
      </div>
      <div className="h-10 bg-zinc-800 rounded-xl w-full" />
      <div className="h-4 bg-zinc-800 rounded w-3/4" />
      <div className="h-12 bg-amber-500/20 rounded-xl w-full" />
    </div>
  );
}
