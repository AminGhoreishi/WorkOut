import {
  Home,
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  BookOpen,
  MessageSquare,
  Dumbbell,
  Ticket,
  CreditCard,
  BarChart3,
  Settings,
  UserCog,
  Heart,
  Activity,
  Salad,
  Utensils,
  Trophy,
  Sparkles,
  Film,
  TrendingUp,
  Tag,
} from "lucide-react";
import type { SidebarCounts, MenuSection } from "@/types/sidebar";



export function getAdminMenuItems(
  counts: SidebarCounts,
  formatNumber: (num: number) => string
): MenuSection[] {
  return [
    {
      title: "منوی اصلی",
      items: [
        {
          id: "dashboard",
          label: "داشبورد",
          icon: LayoutDashboard,
          badge: null,
          href: "/admin",
        },
        {
          id: "ai",
          label: "هوش مصنوعی",
          icon: Sparkles,
          badge: "جدید",
          href: "/admin/ai",
        },
        {
          id: "users",
          label: "کاربران",
          icon: Users,
          badge: counts.users > 0 ? formatNumber(counts.users) : null,
          href: "/admin/users",
        },
        {
          id: "packages",
          label: "پکیج‌ها",
          icon: Package,
          badge: null,
          href: "/admin/packages",
        },
        {
          id: "subscriptions",
          label: "اشتراک‌ها",
          icon: Calendar,
          badge: counts.subscriptions > 0 ? formatNumber(counts.subscriptions) : null,
          href: "/admin/subscriptions",
        },
      ],
    },
    {
      title: "محتوا",
      items: [
        {
          id: "videos",
          label: "مدیریت ویدیوها",
          icon: Film,
          badge: counts.videos > 0 ? formatNumber(counts.videos) : "۰",
          href: "/admin/videos",
        },
        {
          id: "articles",
          label: "مقالات",
          icon: BookOpen,
          badge: counts.articles > 0 ? formatNumber(counts.articles) : null,
          href: "/admin/articles",
        },
        {
          id: "comments",
          label: "کامنت‌ها",
          icon: MessageSquare,
          badge: counts.comments > 0 ? formatNumber(counts.comments) : "۰",
          href: "/admin/comments",
        },
        {
          id: "workouts",
          label: "برنامه‌های تمرینی",
          icon: Dumbbell,
          badge: null,
          href: "/admin/workouts",
        },
        {
          id: "personal-records",
          label: "رکورد های شخصی PR",
          icon: Trophy,
          badge: null,
          href: "/admin/pr",
        },
        {
          id: "foods",
          label: "مدیریت غذاها",
          icon: Salad,
          badge: null,
          href: "/admin/foods",
        },
        {
          id: "meal-plans",
          label: "برنامه غذایی",
          icon: Utensils,
          badge: null,
          href: "/admin/meal-plans",
        },
        {
          id: "tickets",
          label: "تیکت‌ها",
          icon: Ticket,
          badge: counts.tickets ? formatNumber(counts.tickets) : "۰",
          href: "/admin/tickets",
        },
      ],
    },
    {
      title: "مالی",
      items: [
        {
          id: "payments",
          label: "پرداخت‌ها",
          icon: CreditCard,
          badge: null,
          href: "/admin/payments",
        },
        {
          id: "discounts",
          label: "کدهای تخفیف",
          icon: Tag,
          badge: null,
          href: "/admin/discounts",
        },
      ],
    },
    {
      title: "تنظیمات",
      items: [
        {
          id: "admins",
          label: "مدیران",
          icon: UserCog,
          badge: counts.admins ? formatNumber(counts.admins) : "۱",
          href: "/admin/admins",
        },
      ],
    },
  ];
}

export function getUserMenuItems(
  counts: SidebarCounts,
  formatNumber: (num: number) => string
): MenuSection[] {
  return [
    {
      title: "منوی اصلی",
      items: [
        {
          id: "dashboard",
          label: "داشبورد",
          icon: LayoutDashboard,
          badge: null,
          href: "/dashboard",
        },
        {
          id: "subscription",
          label: "اشتراک من",
          icon: CreditCard,
          badge: null,
          href: "/dashboard/subscription",
        },
      ],
    },
    {
      title: "تمرین و تغذیه",
      items: [
        {
          id: "workout",
          label: "برنامه‌ی تمرینی",
          icon: Dumbbell,
          badge: null,
          href: "/dashboard/workout",
        },
        {
          id: "meal-plan",
          label: "برنامه غذایی",
          icon: Utensils,
          badge: null,
          href: "/dashboard/meal-plans",
        },
        {
          id: "progress",
          label: "نمودار پیشرفت",
          icon: TrendingUp,
          badge: null,
          href: "/dashboard/progress",
        },
        {
          id: "bmi",
          label: "شاخص توده بدنی (BMI)",
          icon: Activity,
          badge: null,
          href: "/dashboard/bmi",
        },
        {
          id: "nutrition",
          label: "تغذیه و کالری‌شمار",
          icon: Salad,
          badge: null,
          href: "/nutrition",
        },
      ],
    },
    {
      title: "پروفایل و شخصی",
      items: [
        {
          id: "profile",
          label: "پروفایل سایت",
          icon: UserCog,
          badge: null,
          href: "/dashboard/profile",
        },
        {
          id: "fitness-profile",
          label: "پروفایل ورزشی",
          icon: Dumbbell,
          badge: null,
          href: "/dashboard/fitness-profile",
        },
        {
          id: "wishlist",
          label: "علاقه‌مندی‌ها",
          icon: Heart,
          badge: counts.wishlist > 0 ? formatNumber(counts.wishlist) : null,
          href: "/dashboard/favorites",
        },
      ],
    },
    {
      title: "پشتیبانی و نظرات",
      items: [
        {
          id: "tickets",
          label: "تیکت‌ها",
          icon: Ticket,
          badge: null,
          href: "/dashboard/tickets",
        },
        {
          id: "testimonials",
          label: "ثبت نظرات و تجربیات",
          icon: MessageSquare,
          badge: null,
          href: "/dashboard/testimonials",
        },
      ],
    },
  ];
}

export function getMobileMenuItems(hasRole?: boolean): MenuSection[] {
  const sections: MenuSection[] = [
    {
      title: "منوی اصلی",
      items: [
        {
          id: "home",
          label: "خانه",
          icon: Home,
          badge: null,
          href: "/",
        },
        {
          id: "packages",
          label: "پکیج‌ها",
          icon: Package,
          badge: null,
          href: "/packages",
        },
        {
          id: "articles",
          label: "مقالات",
          icon: BookOpen,
          badge: null,
          href: "/articles",
        },
        {
          id: "introduce",
          label: "درباره ما",
          icon: UserCog,
          badge: null,
          href: "/introduce",
        },
        ...(hasRole
          ? [
              {
                id: "subscription",
                label: "اشتراک من",
                icon: CreditCard,
                badge: null,
                href: "/dashboard/subscription",
              },
            ]
          : []),
      ],
    },
  ];

  if (hasRole) {
    sections.push(
      {
        title: "تمرین و تغذیه",
        items: [
          {
            id: "workout",
            label: "برنامه‌ی تمرینی",
            icon: Dumbbell,
            badge: null,
            href: "/dashboard/workout",
          },
          {
            id: "meal-plan",
            label: "برنامه غذایی",
            icon: Utensils,
            badge: null,
            href: "/dashboard/meal-plans",
          },
          {
            id: "progress",
            label: "نمودار پیشرفت",
            icon: TrendingUp,
            badge: null,
            href: "/dashboard/progress",
          },
          {
            id: "bmi",
            label: "شاخص توده بدنی (BMI)",
            icon: Activity,
            badge: null,
            href: "/dashboard/bmi",
          },
          {
            id: "nutrition",
            label: "تغذیه و کالری‌شمار",
            icon: Salad,
            badge: null,
            href: "/nutrition",
          },
        ],
      },
      {
        title: "پروفایل و شخصی",
        items: [
          {
            id: "profile",
            label: "پروفایل سایت",
            icon: UserCog,
            badge: null,
            href: "/dashboard/profile",
          },
          {
            id: "fitness-profile",
            label: "پروفایل ورزشی",
            icon: Dumbbell,
            badge: null,
            href: "/dashboard/fitness-profile",
          },
          {
            id: "wishlist",
            label: "علاقه‌مندی‌ها",
            icon: Heart,
            badge: null,
            href: "/dashboard/favorites",
          },
        ],
      },
      {
        title: "پشتیبانی و نظرات",
        items: [
          {
            id: "tickets",
            label: "تیکت‌ها",
            icon: Ticket,
            badge: null,
            href: "/dashboard/tickets",
          },
          {
            id: "testimonials",
            label: "ثبت نظرات و تجربیات",
            icon: MessageSquare,
            badge: null,
            href: "/dashboard/testimonials",
          },
        ],
      }
    );
  }

  return sections;
}
