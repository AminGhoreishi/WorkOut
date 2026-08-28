import { FAQS_LIST } from "@/constants/faq";

export default function FAQ() {
  return (
    <section className="max-sm:py-10 py-12 sm:py-20 bg-neutral-950/90 font-danaMed">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold font-morabbaReg text-white mb-3 sm:mb-4">
            سوالات{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              متداول
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-neutral-400">
            پاسخ سوالات رایج درباره خدمات و برنامه‌های استارفیت.
          </p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {FAQS_LIST.map((faq, index) => (
            <div
              key={index}
              className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-xl overflow-hidden hover:bg-neutral-900 hover:border-amber-400/50 transition-all shadow-[0_0_15px_rgba(234,179,8,0.04)]"
            >
              <details className="group">
                <summary className="p-4 sm:p-6 cursor-pointer list-none flex justify-between items-center gap-3">
                  <h3 className="text-sm sm:text-lg font-medium text-white group-open:text-amber-300 transition-colors">
                    {faq.question}
                  </h3>
                  <div className="text-amber-400 group-open:rotate-180 transition-transform shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-base text-neutral-300 leading-relaxed border-t border-amber-500/10 pt-3 sm:pt-4">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
