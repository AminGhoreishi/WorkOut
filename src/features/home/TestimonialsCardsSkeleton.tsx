export default function TestimonialsCardsSkeleton() {
  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 animate-pulse space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-800" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/2 bg-neutral-800 rounded" />
                <div className="h-3 w-1/3 bg-neutral-800/60 rounded" />
              </div>
            </div>
            <div className="h-16 bg-neutral-800/40 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
