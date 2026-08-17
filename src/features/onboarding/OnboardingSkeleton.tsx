export default function OnboardingSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="text-center space-y-4">
          <div className="h-8 bg-neutral-800 rounded-lg w-64 mx-auto" />
          <div className="h-4 bg-neutral-800 rounded-lg w-96 mx-auto" />
        </div>
        <div className="bg-neutral-900/80 border border-amber-500/10 rounded-2xl p-8 h-96" />
      </div>
    </div>
  );
}
