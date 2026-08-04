import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/model/Blog";
import UserModel from "@/model/User";
import PackageModel from "@/model/Package";
import PackageFeatureModel from "@/model/Packagefeature";
import type {
  HomeArticleItem,
  HomeWorkoutPlanItem,
  HomeStats,
} from "@/types/components";

export async function getHomeArticles(): Promise<HomeArticleItem[]> {
  await dbConnect();
  const latestBlogs = await BlogModel.find({ status: "published" })
    .select("title slug excerpt image category content authorId createdAt")
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("authorId")
    .lean();

  return latestBlogs.map((blog: any) => {
    const authorName =
      blog.authorId?.fullName || blog.authorId?.username || "نویسنده مهمان";
    const authorInitial = authorName.substring(0, 1);
    const publishDateString = new Intl.DateTimeFormat("fa-IR", {
      month: "long",
      day: "numeric",
    }).format(new Date(blog.createdAt));

    const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt:
        blog.excerpt ||
        (blog.content ? blog.content.substring(0, 100) + "..." : ""),
      image: blog.image || "",
      category: blog.category,
      readingTime: `${readingTime} دقیقه مطالعه`,
      authorName,
      authorInitial,
      publishDate: publishDateString,
    };
  });
}

export async function getHomePlans(): Promise<HomeWorkoutPlanItem[]> {
  await dbConnect();
  const dbPackages = await PackageModel.find({ isActive: true })
    .select("_id name tagline description icon price")
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  const packageIds = dbPackages.map((pkg: any) => pkg._id);
  const dbFeatures =
    packageIds.length > 0
      ? await PackageFeatureModel.find({
          packageId: { $in: packageIds },
          included: true,
        })
          .select("packageId name sortOrder")
          .sort({ sortOrder: 1 })
          .lean()
      : [];

  return dbPackages.map((pkg: any) => {
    const pkgFeatures = dbFeatures
      .filter((feat: any) => feat.packageId.toString() === pkg._id.toString())
      .map((feat: any) => feat.name);

    return {
      id: pkg._id.toString(),
      title: pkg.name,
      description: pkg.tagline || pkg.description || "",
      duration: "۱۲ هفته",
      level: "همه سطوح",
      icon: pkg.icon || "💪",
      features:
        pkgFeatures.length > 0
          ? pkgFeatures
          : [
              `اشتراک ماهانه: ${new Intl.NumberFormat("fa-IR").format(
                pkg.price?.monthly || 0,
              )} تومان`,
            ],
    };
  });
}

export async function getHomeStats(): Promise<HomeStats> {
  await dbConnect();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const [todayCount, yesterdayCount] = await Promise.all([
    UserModel.countDocuments({ createdAt: { $gte: startOfToday } }),
    UserModel.countDocuments({
      createdAt: { $gte: startOfYesterday, $lt: startOfToday },
    }),
  ]);

  const formatPersianNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  let trendText = "";
  if (yesterdayCount === 0) {
    if (todayCount > 0) {
      trendText = `+${formatPersianNumber(100)}% نسبت به دیروز`;
    } else {
      trendText = `${formatPersianNumber(0)}% نسبت به دیروز`;
    }
  } else {
    const percentage = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
    const formattedPercent = new Intl.NumberFormat("fa-IR", {
      signDisplay: "exceptZero",
    }).format(Math.round(percentage));
    trendText = `${formattedPercent}% نسبت به دیروز`;
  }

  return {
    todayUsersCount: formatPersianNumber(todayCount),
    trendText,
  };
}
