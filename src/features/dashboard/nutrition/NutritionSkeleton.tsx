import MealSkeleton from "./MealSkeleton";

export default function NutritionSkeleton() {
  return (
    <div
      className="font-danaMed pt-4 md:pt-8 bg-neutral-950 min-h-screen text-white animate-pulse"
      dir="rtl"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl" />
            <div className="space-y-2">
              <div className="h-7 w-48 bg-white/10 rounded-lg" />
              <div className="h-4 w-64 bg-white/5 rounded-md" />
            </div>
          </div>

          <div className="h-10 w-full sm:w-56 bg-white/5 border border-amber-500/15 rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 bg-white/[0.03] border border-amber-500/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-2">
                <div className="h-6 w-36 bg-white/10 rounded-lg" />
                <div className="h-3 w-48 bg-white/5 rounded-md" />
              </div>
              <div className="space-y-1 text-left">
                <div className="h-7 w-16 bg-amber-500/20 rounded-md" />
                <div className="h-3 w-28 bg-white/5 rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-amber-500/5 border-4 border-amber-500/20 flex items-center justify-center">
                  <div className="h-6 w-16 bg-white/10 rounded-md" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <div className="h-4 w-16 bg-white/5 rounded-md" />
                  <div className="h-5 w-20 bg-white/10 rounded-md" />
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <div className="h-4 w-20 bg-white/5 rounded-md" />
                  <div className="h-5 w-12 bg-amber-500/20 rounded-md" />
                </div>
                <div className="flex justify-between items-center pb-2">
                  <div className="h-4 w-16 bg-white/5 rounded-md" />
                  <div className="h-5 w-24 bg-white/10 rounded-md" />
                </div>
              </div>

              <div className="space-y-4 bg-white/5 border border-amber-500/10 rounded-2xl p-4">
                <div className="h-4 w-28 bg-white/10 rounded-md mb-2" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded-md" />
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded-md" />
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded-md" />
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/[0.03] border border-amber-500/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-28 bg-white/10 rounded-lg" />
              <div className="h-6 w-16 bg-amber-500/20 rounded-lg" />
            </div>
            <div className="flex-1 flex items-center justify-center py-6">
              <div className="w-28 h-28 rounded-full bg-amber-500/10 border-2 border-amber-500/20" />
            </div>
            <div className="h-10 w-full bg-white/5 rounded-xl" />
          </div>
        </div>

        <div className="h-7 w-44 bg-white/10 rounded-lg mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-amber-500/15 rounded-3xl p-5 space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-6 w-28 bg-white/10 rounded-lg" />
                <div className="h-8 w-24 bg-amber-500/20 rounded-xl" />
              </div>
              <MealSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
