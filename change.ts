export const modifiedFiles = [
  {
    id: 1,
    filePath: "src/app/(dashboard)/dashboard/page.tsx",
    description: "Refactored user dashboard server component with parallel database query fetching (Promise.all), null-safe user property access, and error-resilient DB connection wrapping."
  },
  {
    id: 2,
    filePath: "src/modules/dashboard/AdminDashboardUser/AdminDashboardUser.tsx",
    description: "Refactored dashboard container client component with strict TypeScript types, clean Tailwind styling replacing inline CSS, and safe array fallbacks."
  },
  {
    id: 3,
    filePath: "src/types/user-dashboard.ts",
    description: "Defined exported interfaces for dashboard user, subscription, workout day, ticket, and wishlist items."
  },
  {
    id: 4,
    filePath: "src/app/(dashboard)/dashboard/bmi/page.tsx",
    description: "Server Component wrapper for BMI calculation page with updated app metadata."
  },
  {
    id: 5,
    filePath: "src/modules/dashboard/bmi/BMICalculator.tsx",
    description: "Refactored client component for dynamic BMI computation, SWR auto-population from user fitness profile, real mathematical formula, ideal weight calculation, animated WHO standard scale gauge, and edge-case validation."
  },
  {
    id: 6,
    filePath: "src/types/bmi.ts",
    description: "Created TypeScript interfaces for BMI calculations, form inputs, categories, and recommendation states."
  },
  {
    id: 7,
    filePath: "src/modules/auth/LoginForm.tsx",
    description: "Refactored login & register forms with strict validation, open-redirect prevention for callbackUrl, form reset on mode tab toggle, tel input mode, and zero code comments."
  },
  {
    id: 8,
    filePath: "src/modules/auth/OtpForm.tsx",
    description: "Refactored OTP validation form to eliminate SweetAlert (swal) popups, replaced with smooth inline messages, fixed timer memory leak, supported Persian/Arabic clipboard paste, eliminated sessionStorage plaintext credential usage, and used Next Router transitions."
  },
  {
    id: 9,
    filePath: "src/types/auth.ts",
    description: "Updated AuthApiResponse type interface to optional message and error properties."
  }
];
