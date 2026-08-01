export const modifiedFiles = [
  {
    id: 1,
    filePath: "src/app/(dashboard)/dashboard/bmi/page.tsx",
    description: "Server Component wrapper for BMI calculation page with updated app metadata."
  },
  {
    id: 2,
    filePath: "src/modules/dashboard/bmi/BMICalculator.tsx",
    description: "Refactored client component for dynamic BMI computation, SWR auto-population from user fitness profile, real mathematical formula, ideal weight calculation, animated WHO standard scale gauge, and edge-case validation."
  },
  {
    id: 3,
    filePath: "src/types/bmi.ts",
    description: "Created TypeScript interfaces for BMI calculations, form inputs, categories, and recommendation states."
  },
  {
    id: 4,
    filePath: "src/modules/auth/LoginForm.tsx",
    description: "Refactored login & register forms with strict validation, open-redirect prevention for callbackUrl, form reset on mode tab toggle, tel input mode, and zero code comments."
  },
  {
    id: 5,
    filePath: "src/modules/auth/OtpForm.tsx",
    description: "Refactored OTP validation form to eliminate SweetAlert (swal) popups, replaced with smooth inline messages, fixed timer memory leak, supported Persian/Arabic clipboard paste, eliminated sessionStorage plaintext credential usage, and used Next Router transitions."
  },
  {
    id: 6,
    filePath: "src/types/auth.ts",
    description: "Updated AuthApiResponse type interface to optional message and error properties."
  }
];
