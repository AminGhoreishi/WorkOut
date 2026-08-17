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
  },
  {
    id: "22",
    filePath: "src/modules/home/Testimonials.tsx",
    description: "Create Testimonials section component displaying real user reviews, star ratings, and success achievements"
  },
  {
    id: "23",
    filePath: "src/templates/HomeTemplate.tsx",
    description: "Include Testimonials section on the home page"
  },
  {
    id: "24",
    filePath: "src/types/testimonial.ts",
    description: "Create TypeScript interface types for Testimonial model"
  },
  {
    id: "25",
    filePath: "model/Testimonial.ts",
    description: "Create Mongoose Schema and model for Testimonials (user reviews & success stories)"
  },
  {
    id: "26",
    filePath: "src/app/api/user/testimonials/route.ts",
    description: "Create user testimonials API route for fetching and submitting user reviews"
  },
  {
    id: "27",
    filePath: "src/components/layout/admin/sidebarItems.ts",
    description: "Add Testimonials navigation link to user dashboard sidebar menu"
  },
  {
    id: "28",
    filePath: "src/modules/dashboard/testimonials/AddTestimonialModal.tsx",
    description: "Create modal component for user testimonial submission with star rating and achievement input"
  },
  {
    id: "29",
    filePath: "src/modules/dashboard/testimonials/UserTestimonialsManagement.tsx",
    description: "Create user dashboard testimonials management component"
  },
  {
    id: "30",
    filePath: "src/app/(dashboard)/dashboard/testimonials/page.tsx",
    description: "Create dashboard testimonials page route with StarFit metadata"
  },
  {
    id: "31",
    filePath: "src/modules/home/HeroSection.tsx",
    description: "Replace placeholder dumbbell icon with dynamic dual-image overlapping layout for hero section"
  },
  {
    id: "32",
    filePath: "lib/homeData.ts",
    description: "Include slug field in getHomePlans package query and object mapping"
  },
  {
    id: "33",
    filePath: "src/modules/home/WorkoutPlansList.tsx",
    description: "Replace static button element with Next.js Link component navigating to package details page"
  },
  {
    id: "34",
    filePath: "src/types/components.ts",
    description: "Add optional slug property to HomeWorkoutPlanItem interface"
  },
  {
    id: "35",
    filePath: "src/app/(main)/introduce/page.tsx",
    description: "Redesign Introduce page focused on coach Amirhossein Miraftabi credentials, personal training, and football conditioning with Black & Gold theme"
  },
  {
    id: "36",
    filePath: "model/WorkoutExercise.ts",
    description: "Add weight field to WorkoutExercise Mongoose schema"
  },
  {
    id: "37",
    filePath: "src/types/workout.ts",
    description: "Add optional weight property to WorkoutExercise, ExerciseItem, IWorkoutExercise, and WorkoutExerciseFormInputs interfaces"
  },
  {
    id: "38",
    filePath: "src/app/api/admin/subscription/workout-exercises/route.ts",
    description: "Support weight property in PUT update endpoint for workout exercises"
  },
  {
    id: "39",
    filePath: "src/modules/admin/workouts/WorkoutExerciseForm.tsx",
    description: "Add weight input field to workout exercise form and request payloads"
  },
  {
    id: "40",
    filePath: "src/modules/admin/workouts/WorkoutExercisesSection.tsx",
    description: "Display weight meta information in workout exercise list cards"
  },
  {
    id: "41",
    filePath: "model/WorkoutExercise.ts",
    description: "Update weight field type from string to number with default value 0"
  },
  {
    id: "42",
    filePath: "src/modules/admin/workouts/WorkoutExerciseForm.tsx",
    description: "Refactor form state management to use react-hook-form hook (register, handleSubmit, reset)"
  },
  {
    id: "43",
    filePath: "src/modules/admin/workouts/WorkoutExerciseForm.tsx",
    description: "Refactor submit logic into a single modular onSubmit function handling POST and PUT dynamically"
  },
  {
    id: "44",
    filePath: "src/modules/admin/workouts/WorkoutExerciseForm.tsx",
    description: "Refactor submitWorkoutExercise helper to return fetch Response and handle ok check and alert messaging inside onSubmit"
  },
  {
    id: "45",
    filePath: "src/modules/admin/workouts/WorkoutExerciseForm.tsx",
    description: "Explicitly capture error parameter in catch block to maintain cross-parser compatibility"
  },
  {
    id: "46",
    filePath: "src/app/globals.css",
    description: "Set font-family of swal container, popup, title, content, buttons, and inputs to var(--font-danaMed)"
  },
  {
    id: "47",
    filePath: "src/utils/alert.ts",
    description: "Update SweetAlert customClass title property from font-morabbaReg to font-danaMed"
  },
  {
    id: "48",
    filePath: "src/app/api/admin/subscription/workout-exercises/route.ts",
    description: "Add PATCH HTTP handler to support updating exercise weight"
  },
  {
    id: "49",
    filePath: "src/modules/dashboard/workout/ExercisesList.tsx",
    description: "Add pencil icon button next to exercise weight to enable inline editing and sending PATCH requests to update weight"
  },
  {
    id: "50",
    filePath: "src/types/nutrition.ts",
    description: "Add optional requiredCalories field to EditTargetModalProps interface"
  },
  {
    id: "51",
    filePath: "src/modules/dashboard/nutrition/EditTargetModal.tsx",
    description: "Add کالری مورد نیاز input field and tempRequiredCalories state to EditTargetModal"
  },
  {
    id: "52",
    filePath: "src/types/nutrition.ts",
    description: "Add ActivityLevel and CalcGender type definitions for BMR calculation"
  },
  {
    id: "53",
    filePath: "src/modules/dashboard/nutrition/EditTargetModal.tsx",
    description: "Fetch fitness profile data (height, weight, age) and implement BMR calculation with activity level multiplier for required calories"
  },
  {
    id: "54",
    filePath: "src/types/nutrition.ts",
    description: "Add FitnessCalorieCalculatorProps interface type definition"
  },
  {
    id: "55",
    filePath: "src/modules/dashboard/nutrition/FitnessCalorieCalculator.tsx",
    description: "Create dedicated FitnessCalorieCalculator component for fetching fitness profile and calculating BMR/daily calories"
  },
  {
    id: "56",
    filePath: "src/modules/dashboard/nutrition/EditTargetModal.tsx",
    description: "Refactor EditTargetModal to use extracted FitnessCalorieCalculator component"
  },
  {
    id: "57",
    filePath: "validator/progress.ts",
    description: "Add سرعت and توان categories to DEFAULT_CATEGORIES in progress validator"
  },
  {
    id: "58",
    filePath: "src/modules/dashboard/progress/ProgressChartManagement.tsx",
    description: "Add test dropdown select (excluding all option) and filter chart data by selected test"
  },
  {
    id: "59",
    filePath: "src/modules/admin/pr/chart/PRChart.tsx",
    description: "Remove option all from select dropdown in PRChart component"
  },
  {
    id: "60",
    filePath: "tsconfig.json",
    description: "Migrate project architecture to feature-driven folder structure (src/features, src/models, src/validators, src/lib, src/styles)"
  }
];
