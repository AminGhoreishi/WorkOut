import type { PackageFeaturesProps } from "@/types/components";
import { Check, X } from "lucide-react";

export default function PackageFeatures({ features }: PackageFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-12 sm:py-0 font-danaMed">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-4 font-morabbaReg">
            لیست کامل{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              امکانات
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto rounded-full mt-3 sm:mt-4" />
        </div>
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl overflow-hidden shadow-[0_0_25px_rgba(234,179,8,0.05)]">
          <div className="divide-y divide-amber-500/10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 hover:bg-neutral-900/90 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-1 ${
                        feature.included
                          ? "bg-amber-500/10 border border-amber-500/30"
                          : "bg-red-500/10 border border-red-500/30"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      ) : (
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xs sm:text-base mb-1">
                        {feature.name}
                      </div>
                      {feature.description && (
                        <div className="text-neutral-400 text-[11px] sm:text-sm">
                          {feature.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
