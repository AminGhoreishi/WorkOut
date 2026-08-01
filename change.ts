export const modifiedFiles = [
  {
    id: 1,
    filePath: "src/modules/dashboard/favorites/FavoritesManagement.tsx",
    description: "Refactored favorites management module with optimistic state updates, removed window.location.reload performance bottleneck, extracted types into src/types/favorites.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 2,
    filePath: "src/app/(dashboard)/dashboard/favorites/page.tsx",
    description: "Refactored favorites page server component with safe DB error handling, metadata, and clean comment-free code."
  },
  {
    id: 3,
    filePath: "src/types/favorites.ts",
    description: "Created TypeScript interfaces for favorite article items and favorites management props without comments."
  },
  {
    id: 4,
    filePath: "src/modules/dashboard/AdminDashboardUser/WeeklyWorkouts.tsx",
    description: "Refactored weekly workouts sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 5,
    filePath: "src/modules/dashboard/AdminDashboardUser/RecentTickets.tsx",
    description: "Refactored recent tickets sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 6,
    filePath: "src/modules/dashboard/AdminDashboardUser/UpcomingSessions.tsx",
    description: "Refactored upcoming sessions sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 7,
    filePath: "src/modules/dashboard/AdminDashboardUser/DashboardStats.tsx",
    description: "Refactored dashboard stats sub-component: converted inline CSS to Tailwind utilities with zero code comments."
  },
  {
    id: 8,
    filePath: "src/modules/dashboard/AdminDashboardUser/DashboardBanner.tsx",
    description: "Refactored dashboard banner sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 9,
    filePath: "src/modules/dashboard/AdminDashboardUser/ActiveSubscription.tsx",
    description: "Refactored active subscription sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 10,
    filePath: "src/modules/dashboard/AdminDashboardUser/WishlistArticles.tsx",
    description: "Refactored wishlist articles sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 11,
    filePath: "src/modules/dashboard/AdminDashboardUser/AdminDashboardUser.tsx",
    description: "Refactored dashboard container client component with strict TypeScript types, clean Tailwind styling replacing inline CSS, and safe array fallbacks."
  },
  {
    id: 12,
    filePath: "src/app/(dashboard)/dashboard/page.tsx",
    description: "Refactored user dashboard server component with parallel database query fetching (Promise.all), null-safe user property access, and error-resilient DB connection wrapping."
  },
  {
    id: 13,
    filePath: "src/types/user-dashboard.ts",
    description: "Defined exported interfaces for dashboard user, subscription, workout day, ticket, wishlist items, and sub-component props."
  },
  {
    id: 14,
    filePath: "src/app/(dashboard)/dashboard/bmi/page.tsx",
    description: "Server Component wrapper for BMI calculation page with updated app metadata."
  },
  {
    id: 15,
    filePath: "src/modules/dashboard/bmi/BMICalculator.tsx",
    description: "Refactored client component for dynamic BMI computation, SWR auto-population from user fitness profile, real mathematical formula, ideal weight calculation, animated WHO standard scale gauge, and edge-case validation."
  },
  {
    id: 16,
    filePath: "src/types/bmi.ts",
    description: "Created TypeScript interfaces for BMI calculations, form inputs, categories, and recommendation states."
  },
  {
    id: 17,
    filePath: "src/modules/auth/LoginForm.tsx",
    description: "Refactored login & register forms with strict validation, open-redirect prevention for callbackUrl, form reset on mode tab toggle, tel input mode, and zero code comments."
  },
  {
    id: 18,
    filePath: "src/modules/auth/OtpForm.tsx",
    description: "Refactored OTP validation form to eliminate SweetAlert (swal) popups, replaced with smooth inline messages, fixed timer memory leak, supported Persian/Arabic clipboard paste, eliminated sessionStorage plaintext credential usage, and used Next Router transitions."
  },
  {
    id: 19,
    filePath: "src/types/auth.ts",
    description: "Updated AuthApiResponse type interface to optional message and error properties."
  }
];
