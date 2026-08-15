export const modifiedFiles = [
  {
    id: "1",
    filePath: "src/constants/faq.ts",
    description: "Update FAQ questions and answers with StarFit content"
  },
  {
    id: "2",
    filePath: "src/modules/home/FAQ.tsx",
    description: "Update FAQ section subtitle text to match StarFit specifications"
  },
  {
    id: "3",
    filePath: "src/components/layout/MobileMenu.tsx",
    description: "Redesign mobile menu drawer, navigation items, backdrop, and user auth card"
  },
  {
    id: "4",
    filePath: "src/modules/packages/PackagesGrid.tsx",
    description: "Refactor popular package card styling for mobile and adjust feature list font size to text-xs below sm breakpoint"
  },
  {
    id: "5",
    filePath: "package.json",
    description: "Upgrade Next.js and eslint-config-next to 16.3.1"
  },
  {
    id: "6",
    filePath: "src/app/layout.tsx",
    description: "Configure 48x48 favicon icon metadata, Google site verification tag and title tags for Google search crawler optimization"
  },
  {
    id: "7",
    filePath: "public/googlee29da57a8e735d16.html",
    description: "Add Google Search Console HTML verification file for domain ownership"
  },
  {
    id: "8",
    filePath: "validator/meal-plan.ts",
    description: "Add custom Persian validation error messages for meal plan schema"
  },
  {
    id: "9",
    filePath: "src/modules/admin/meal-plan/MealPlanFormFields.tsx",
    description: "Enhance title input validation with required, minLength, and whitespace trim checks"
  },
  {
    id: "10",
    filePath: "src/modules/admin/meal-plan/MealPlanForm.tsx",
    description: "Consolidate form logic and fields into a single unified component, fixing useEffect reset bug and title validation"
  },
  {
    id: "11",
    filePath: "src/app/api/admin/meal-plan/route.ts",
    description: "Deduplicate validation error messages for meal plan creation"
  },
  {
    id: "12",
    filePath: "src/app/api/admin/meal-plan/[planId]/route.ts",
    description: "Deduplicate validation error messages for meal plan update"
  },
  {
    id: "13",
    filePath: "src/components/layout/Header.tsx",
    description: "Replace پشتیبانی navigation link with درباره ما (/introduce)"
  },
  {
    id: "14",
    filePath: "src/modules/admin/pr/CreatePRModal.tsx",
    description: "Replace HTML date input with Jalali (Shamsi) DatePicker using react-multi-date-picker"
  },
  {
    id: "15",
    filePath: "src/modules/admin/pr/PersonalRecords.tsx",
    description: "Update button label from تعریف متس جدید to تعریف رکورد جدید"
  },
  {
    id: "16",
    filePath: "src/modules/packages/PackagesSkeleton.tsx",
    description: "Extract PackagesSkeleton into a dedicated component file"
  },
  {
    id: "17",
    filePath: "src/modules/dashboard/progress/AddProgressRecordModal.tsx",
    description: "Replace standard HTML date input with Jalali (Shamsi) DatePicker and simplify exercise name field by removing select dropdown"
  },
  {
    id: "18",
    filePath: "validator/progress.ts",
    description: "Extract DEFAULT_CATEGORIES, DEFAULT_UNITS constants and add validateProgressRecordInput validation function"
  },
  {
    id: "19",
    filePath: "src/modules/dashboard/progress/ProgressChartManagement.tsx",
    description: "Use dedicated /api/user/workout-progress/count SWR endpoint for completed workouts count"
  },
  {
    id: "20",
    filePath: "src/app/api/user/workout-progress/route.ts",
    description: "Clean up GET handler to focus solely on exercise progress list"
  },
  {
    id: "21",
    filePath: "src/app/api/user/workout-progress/count/route.ts",
    description: "Create dedicated API route for counting completed workouts using countDocuments"
  }
];
