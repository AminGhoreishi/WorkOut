export function PackagesSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/10 rounded-2xl p-8 animate-pulse flex flex-col justify-between h-[480px]"
        >
          <div>
            <div className="w-16 h-16 bg-neutral-800 rounded-2xl mb-6" />
            <div className="h-8 bg-neutral-800 rounded-lg w-2/3 mb-4" />
            <div className="h-10 bg-neutral-800 rounded-lg w-1/2 mb-6" />
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-neutral-800 rounded w-full" />
              <div className="h-4 bg-neutral-800 rounded w-5/6" />
              <div className="h-4 bg-neutral-800 rounded w-4/6" />
            </div>
          </div>
          <div className="h-12 bg-neutral-800 rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
}

export default PackagesSkeleton;
