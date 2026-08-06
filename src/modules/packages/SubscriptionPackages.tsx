import Link from "next/link";
import { BiCheck, BiDumbbell } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";

export default function SubscriptionPackages({ packages }: { packages: any }) {
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
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            بهترین پکیج را برای دستیابی به اهداف تناسب اندام خود انتخاب کنید
          </p>
        </div>
      </section>

      <section className="pb-20 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg: any) => (
              <div
                key={pkg._id || pkg.id}
                className={`relative bg-neutral-900/80 backdrop-blur-lg border ${
                  pkg.popular
                    ? "border-2 border-amber-400 scale-105 shadow-[0_0_30px_rgba(234,179,8,0.2)] z-10"
                    : "border-amber-500/20 hover:border-amber-400/50 shadow-[0_0_20px_rgba(234,179,8,0.05)]"
                } rounded-2xl p-8 hover:bg-neutral-900 transition-all flex flex-col justify-between`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 px-6 py-1 rounded-full text-sm font-bold shadow-md">
                    محبوب‌ترین
                  </div>
                )}

                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-amber-600/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-6">
                    <BiDumbbell className="w-8 h-8 text-amber-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 font-morabbaReg">
                    {pkg.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-amber-400 font-morabbaReg">
                      {typeof pkg.price === "number"
                        ? pkg.price.toLocaleString("fa-IR")
                        : pkg.price}
                    </span>
                    <span className="text-neutral-400 mr-2 text-sm">تومان</span>
                    <div className="text-neutral-500 text-sm mt-1">
                      {pkg.duration || "اشتراک دوره"}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {pkg.features?.map((feature: any, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-neutral-300"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            feature.included !== false
                              ? "bg-amber-500/10 border border-amber-500/30"
                              : "bg-red-500/10 border border-red-500/30"
                          }`}
                        >
                          <BiCheck
                            className={`w-3.5 h-3.5 ${
                              feature.included !== false
                                ? "text-amber-400"
                                : "text-red-400"
                            }`}
                          />
                        </div>
                        <span
                          className={
                            feature.included !== false
                              ? "text-neutral-300"
                              : "text-neutral-500 line-through"
                          }
                        >
                          {feature.name || feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/package/${pkg.slug || pkg._id}`}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                      : "bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 border border-amber-500/30"
                  }`}
                >
                  <span>انتخاب پکیج</span>
                  <BsArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
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
