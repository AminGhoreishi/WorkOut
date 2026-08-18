import Link from "next/link";
import { BiCheck, BiDumbbell } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import type { PackagesGridProps } from "@/types/package";

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

export default function PackagesGrid({ packages }: PackagesGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {packages.map((pkg) => (
        <div
          key={pkg._id || pkg.id}
          className={`relative overflow-hidden backdrop-blur-lg rounded-2xl p-6 sm:p-8 hover:bg-neutral-900 transition-all flex flex-col justify-between ${pkg.popular
            ? "bg-gradient-to-b from-amber-500/20 via-amber-950/30 to-neutral-900/95 border border-amber-500/35 md:border-2 md:border-amber-400 md:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.15)] z-10"
            : "bg-neutral-900/80 border border-amber-500/20 hover:border-amber-400/50 shadow-[0_0_20px_rgba(234,179,8,0.05)]"
            }`}
        >
          {pkg.popular && (
            <>
              <div className="md:hidden w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 py-2 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 text-center font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-1.5">
                <span>محبوب‌ترین</span>
              </div>
              <div className="hidden md:block absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 px-6 py-1 rounded-full text-sm font-bold shadow-md">
                محبوب‌ترین
              </div>
            </>
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
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${feature.included !== false
                      ? "bg-amber-500/10 border border-amber-500/30"
                      : "bg-red-500/10 border border-red-500/30"
                      }`}
                  >
                    <BiCheck
                      className={`w-3.5 h-3.5 ${feature.included !== false
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
                    {typeof feature === "string" ? feature : feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/package/${pkg.slug || pkg._id}`}
            className={`w-full  py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${pkg.popular
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
  );
}
