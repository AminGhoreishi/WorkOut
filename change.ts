export const modifiedFiles = [
  {
    id: 1,
    filePath: "src/modules/auth/LoginForm.tsx",
    description: "Refactored login & register forms with strict validation, open-redirect prevention for callbackUrl, form reset on mode tab toggle, tel input mode, and zero code comments."
  },
  {
    id: 2,
    filePath: "src/modules/auth/OtpForm.tsx",
    description: "Refactored OTP validation form to eliminate SweetAlert (swal) popups, replaced with smooth inline messages, fixed timer memory leak, supported Persian/Arabic clipboard paste, eliminated sessionStorage plaintext credential usage, and used Next Router transitions."
  },
  {
    id: 3,
    filePath: "src/types/auth.ts",
    description: "Updated AuthApiResponse type interface to optional message and error properties."
  }
];
