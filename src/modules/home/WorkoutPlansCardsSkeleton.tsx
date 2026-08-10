export default function WorkoutPlansCardsSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 animate-pulse flex flex-col justify-between"
        >
          <div>
            <div className="mb-6 h-14 w-14 bg-neutral-800/80 rounded-xl" />
            <div className="h-8 w-3/4 bg-neutral-800/80 rounded-lg mb-3" />
            <div className="h-4 w-full bg-neutral-800/60 rounded mb-6" />
            <div className="space-y-3 mb-6">
              <div className="h-4 w-1/2 bg-neutral-800/60 rounded" />
              <div className="h-4 w-1/2 bg-neutral-800/60 rounded" />
            </div>
            <div className="space-y-2 mb-8">
              <div className="h-4 w-5/6 bg-neutral-800/60 rounded" />
              <div className="h-4 w-4/6 bg-neutral-800/60 rounded" />
            </div>
          </div>
          <div className="w-full h-12 bg-amber-500/10 rounded-xl border border-amber-500/20" />
        </div>
      ))}
    </div>
  );
}
