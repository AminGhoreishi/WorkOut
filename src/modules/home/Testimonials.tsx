import { BiStar } from "react-icons/bi";

export default function Testimonials() {
  const testimonials = [
    {
      name: "رضا کاظمی",
      role: "مهندس نرم‌افزار",
      text: "با برنامه‌های اختصاصی فیت‌کوچ توانستم در ۶ ماه ۱۵ کیلو وزن کم کنم و عضله‌سازی قابل توجهی داشته باشم. مربیگری آنلاین و پشتیبانی ۲۴ساعته فوق‌العاده است!",
      rating: 5,
      image: "👨",
    },
    {
      name: "نیلوفر امینی",
      role: "معلم",
      text: "همیشه فکر می‌کردم بدنسازی برای خانم‌ها سخت است، اما با راهنمایی سارا خانم و برنامه‌های شخصی‌سازی شده، الان در بهترین فرم زندگیم هستم!",
      rating: 5,
      image: "👩",
    },
    {
      name: "امیر حسینی",
      role: "دانشجو",
      text: "قیمت‌ها منصفانه و کیفیت خدمات عالی. برنامه تمرینی من دقیقاً متناسب با سطح و زمان‌بندی من طراحی شده. پیشرفت‌های چشمگیری داشتم.",
      rating: 5,
      image: "🧑",
    },
  ];

  return (
    <section className="py-20 bg-neutral-950/90 font-danaMed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            نظرات{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              کاربران طلایی
            </span>{" "}
            ما
          </h2>
          <p className="text-neutral-400 text-lg">داستان موفقیت از زبان خودشان</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-900 transition-all hover:border-amber-400/50 shadow-[0_0_20px_rgba(234,179,8,0.05)]"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <BiStar
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-amber-500/20">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="text-white font-medium">
                    {testimonial.name}
                  </div>
                  <div className="text-amber-400/80 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
