export default function MealPlansSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed animate-pulse" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-32 bg-white/5 border border-white/10 rounded-2xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white/5 border border-white/10 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
