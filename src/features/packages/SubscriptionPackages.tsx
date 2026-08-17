import type { SubscriptionPackagesProps } from "@/types/package";
import PackagesGrid from "./PackagesGrid";

export default function SubscriptionPackages({
  children,
  packages,
}: SubscriptionPackagesProps & { packages?: any }) {
  return (
    <div className="min-h-screen bg-neutral-950 font-danaMed relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-morabbaReg">
            پکیج‌های{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              اشتراک طلایی
            </span>
          </h1>
          <p className="text-md md:text-xl text-neutral-400 max-w-2xl mx-auto">
            بهترین پکیج را برای دستیابی به اهداف تناسب اندام خود انتخاب کنید
          </p>
        </div>
      </section>

      <section className="pb-20 relative z-10">
        <div className="container mx-auto">
          {children ? children : packages ? <PackagesGrid packages={packages} /> : null}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-600/10 border-t border-amber-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-morabbaReg">
            مطمئن نیستید کدام پکیج مناسب شماست؟
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            با مشاوران ما تماس بگیرید تا بهترین برنامه را برای شما پیشنهاد دهیم
          </p>
          <button className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.35)] transition-all">
            درخواست مشاوره رایگان
          </button>
        </div>
      </section>
    </div>
  );
}
