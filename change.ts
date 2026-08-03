export const modifiedFiles = [
  {
    id: 1,
    filePath: "src/modules/dashboard/profile/UserProfileCard.tsx",
    description: "Extracted left-side user profile card (avatar, role badge, username, verified status) into a dedicated component without comments."
  },
  {
    id: 2,
    filePath: "src/modules/dashboard/profile/UserProfileForm.tsx",
    description: "Extracted user profile update form (fullName, username, phone, email, password fields) into a dedicated component without comments."
  },
  {
    id: 3,
    filePath: "src/modules/dashboard/profile/UserProfileManagement.tsx",
    description: "Refactored user profile management module with SWR integration, modular sub-component architecture (UserProfileCard, UserProfileForm), automatic cache revalidation upon submission, external type imports, and zero code comments."
  },
  {
    id: 4,
    filePath: "src/app/(dashboard)/dashboard/profile/page.tsx",
    description: "Server Component wrapper for user profile page with updated app metadata."
  },
  {
    id: 5,
    filePath: "src/types/user-profile.ts",
    description: "Updated TypeScript interfaces for user profile data and sub-component prop interfaces (UserProfileCardProps, UserProfileFormProps)."
  },
  {
    id: 6,
    filePath: "src/modules/dashboard/fitness-profile/PhysicalTab.tsx",
    description: "Extracted physical metrics form tab (age, height, weight, BMI display) into a dedicated modular component without comments."
  },
  {
    id: 7,
    filePath: "src/modules/dashboard/fitness-profile/TrainingTab.tsx",
    description: "Extracted training program & background form tab (goals, weekly sessions, experience, equipment) into a dedicated modular component without comments."
  },
  {
    id: 8,
    filePath: "src/modules/dashboard/fitness-profile/PhotosTab.tsx",
    description: "Extracted body photos upload & coach notes form tab into a dedicated modular component without comments."
  },
  {
    id: 9,
    filePath: "src/modules/dashboard/fitness-profile/FitnessProfileManagement.tsx",
    description: "Refactored fitness profile management module with SWR integration, modular sub-component architecture (PhysicalTab, TrainingTab, PhotosTab), automatic cache revalidation upon submission, external type imports, and zero code comments."
  },
  {
    id: 10,
    filePath: "src/types/fitness-profile.ts",
    description: "Updated TypeScript interfaces for fitness profile data, tabs, and sub-component prop interfaces (PhysicalTabProps, TrainingTabProps, PhotosTabProps)."
  },
  {
    id: 11,
    filePath: "src/app/(dashboard)/dashboard/fitness-profile/page.tsx",
    description: "Server Component wrapper for fitness profile page with updated app metadata."
  },
  {
    id: 12,
    filePath: "src/app/(dashboard)/dashboard/fittness-profile/page.tsx",
    description: "Redirected legacy typo route fittness-profile to standard fitness-profile page."
  },
  {
    id: 13,
    filePath: "src/modules/dashboard/favorites/FavoritesManagement.tsx",
    description: "Refactored favorites management module with optimistic state updates, removed window.location.reload performance bottleneck, extracted types into src/types/favorites.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 14,
    filePath: "src/app/(dashboard)/dashboard/favorites/page.tsx",
    description: "Refactored favorites page server component with safe DB error handling, metadata, and clean comment-free code."
  },
  {
    id: 15,
    filePath: "src/types/favorites.ts",
    description: "Created TypeScript interfaces for favorite article items and favorites management props without comments."
  },
  {
    id: 16,
    filePath: "src/modules/dashboard/AdminDashboardUser/WeeklyWorkouts.tsx",
    description: "Refactored weekly workouts sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 17,
    filePath: "src/modules/dashboard/AdminDashboardUser/RecentTickets.tsx",
    description: "Refactored recent tickets sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 18,
    filePath: "src/modules/dashboard/AdminDashboardUser/UpcomingSessions.tsx",
    description: "Refactored upcoming sessions sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 19,
    filePath: "src/modules/dashboard/AdminDashboardUser/DashboardStats.tsx",
    description: "Refactored dashboard stats sub-component: converted inline CSS to Tailwind utilities with zero code comments."
  },
  {
    id: 20,
    filePath: "src/modules/dashboard/AdminDashboardUser/DashboardBanner.tsx",
    description: "Refactored dashboard banner sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 21,
    filePath: "src/modules/dashboard/AdminDashboardUser/ActiveSubscription.tsx",
    description: "Refactored active subscription sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 22,
    filePath: "src/modules/dashboard/AdminDashboardUser/WishlistArticles.tsx",
    description: "Refactored wishlist articles sub-component: extracted types into src/types/user-dashboard.ts, converted inline CSS to Tailwind, and added zero code comments."
  },
  {
    id: 23,
    filePath: "src/modules/dashboard/AdminDashboardUser/AdminDashboardUser.tsx",
    description: "Refactored dashboard container client component with strict TypeScript types, clean Tailwind styling replacing inline CSS, and safe array fallbacks."
  },
  {
    id: 24,
    filePath: "src/app/(dashboard)/dashboard/page.tsx",
    description: "Refactored user dashboard server component with parallel database query fetching (Promise.all), null-safe user property access, and error-resilient DB connection wrapping."
  },
  {
    id: 25,
    filePath: "src/types/user-dashboard.ts",
    description: "Defined exported interfaces for dashboard user, subscription, workout day, ticket, wishlist items, and sub-component props."
  },
  {
    id: 26,
    filePath: "src/app/(dashboard)/dashboard/bmi/page.tsx",
    description: "Server Component wrapper for BMI calculation page with updated app metadata."
  },
  {
    id: 27,
    filePath: "src/modules/dashboard/bmi/BMICalculator.tsx",
    description: "Refactored client component for dynamic BMI computation, SWR auto-population from user fitness profile, real mathematical formula, ideal weight calculation, animated WHO standard scale gauge, and edge-case validation."
  },
  {
    id: 28,
    filePath: "src/types/bmi.ts",
    description: "Created TypeScript interfaces for BMI calculations, form inputs, categories, and recommendation states."
  },
  {
    id: 29,
    filePath: "src/modules/auth/LoginForm.tsx",
    description: "Refactored login & register forms with strict validation, open-redirect prevention for callbackUrl, form reset on mode tab toggle, tel input mode, and zero code comments."
  },
  {
    id: 30,
    filePath: "src/modules/auth/OtpForm.tsx",
    description: "Refactored OTP validation form to eliminate SweetAlert (swal) popups, replaced with smooth inline messages, fixed timer memory leak, supported Persian/Arabic clipboard paste, eliminated sessionStorage plaintext credential usage, and used Next Router transitions."
  },
  {
    id: 31,
    filePath: "src/types/auth.ts",
    description: "Updated AuthApiResponse type interface to optional message and error properties."
  },
  {
    id: 32,
    filePath: "src/types/ticket.ts",
    description: "Refactored TypeScript type definitions for tickets, messages, users, SWR api responses, and component props without comments."
  },
  {
    id: 33,
    filePath: "src/app/(dashboard)/dashboard/tickets/page.tsx",
    description: "Enhanced tickets page server component with page metadata and clean comment-free code."
  },
  {
    id: 34,
    filePath: "src/modules/dashboard/tickets/UserTickets.tsx",
    description: "Refactored support tickets container component with SWR data fetching, automatic revalidation, clean state handling, error recovery, and zero code comments."
  },
  {
    id: 35,
    filePath: "src/modules/dashboard/tickets/UserTicketChat.tsx",
    description: "Refactored ticket chat component with safe sender resolution, robust date formatting, media validation, optimistic revalidation, and zero code comments."
  },
  {
    id: 36,
    filePath: "src/modules/dashboard/tickets/UserTicketForm.tsx",
    description: "Refactored ticket creation form component with client-side file size validation (50MB limit), SWR cache mutation, safe error handling, and zero code comments."
  },
  {
    id: 37,
    filePath: "src/types/subscription.ts",
    description: "Defined comprehensive TypeScript interfaces for subscription details, orders, coach info, and component props without comments."
  },
  {
    id: 38,
    filePath: "src/modules/subscription/ActiveAccesses.tsx",
    description: "Refactored active accesses component with external prop interface, responsive glassmorphism layout, and zero code comments."
  },
  {
    id: 39,
    filePath: "src/modules/subscription/NoSubscriptionView.tsx",
    description: "Refactored no-subscription fallback component with external prop interface, accessible buttons, and zero code comments."
  },
  {
    id: 40,
    filePath: "src/modules/subscription/WorkoutProgram.tsx",
    description: "Refactored workout program component with strict TypeScript types replacing 'any', safe array fallbacks, and zero code comments."
  },
  {
    id: 41,
    filePath: "src/modules/subscription/PurchaseHistory.tsx",
    description: "Refactored purchase history transaction table with safe date/number formatting, empty array guards, and zero code comments."
  },
  {
    id: 42,
    filePath: "src/modules/subscription/DashboardWorkoutPlan.tsx",
    description: "Refactored dashboard workout plan component with safe initial accordion state, video backdrop/Escape key listener, and zero code comments."
  },
  {
    id: 43,
    filePath: "src/modules/subscription/SubscriptionView.tsx",
    description: "Refactored subscription main view container with safe date math, coach/order null checks, and zero code comments."
  },
  {
    id: 44,
    filePath: "src/app/(dashboard)/dashboard/subscription/page.tsx",
    description: "Refactored subscription page server component with Promise.all parallel database queries, page metadata, and zero code comments."
  },
  {
    id: 45,
    filePath: "src/types/payment.ts",
    description: "Created TypeScript interface file for payment page props and search parameters without comments."
  },
  {
    id: 46,
    filePath: "src/app/(main)/payment/success/page.tsx",
    description: "Refactored payment success server component with ObjectId validation, single populated DB query optimization, page metadata, safe error handling, and zero code comments."
  },
  {
    id: 47,
    filePath: "src/types/nutrition.ts",
    description: "Refactored TypeScript interfaces for nutrition logs, food items, component props, and form values with zero code comments."
  },
  {
    id: 48,
    filePath: "src/app/(main)/nutrition/page.tsx",
    description: "Updated nutrition page metadata to StarFit, session-secured subscription validation, and zero code comments."
  },
  {
    id: 49,
    filePath: "src/modules/dashboard/nutrition/NutritionTracker.tsx",
    description: "Refactored nutrition tracker container with SWR data fetching, optimistic cache mutations, responsive UI, clean date navigation, and zero code comments."
  },
  {
    id: 50,
    filePath: "src/modules/dashboard/nutrition/AddFoodModal.tsx",
    description: "Refactored add food modal with SWR searching and popular foods lookup, removed console log, session-authenticated API integration, and zero code comments."
  },
  {
    id: 51,
    filePath: "src/modules/dashboard/nutrition/EditTargetModal.tsx",
    description: "Refactored edit target modal with safe numeric parsing, SWR cache revalidation, session-authenticated PUT endpoint, and zero code comments."
  },
  {
    id: 52,
    filePath: "src/modules/dashboard/nutrition/WaterTracker.tsx",
    description: "Refactored water tracker with SWR cache revalidation, safe bounds checking, responsive progress bar, and zero code comments."
  },
  {
    id: 53,
    filePath: "src/modules/dashboard/nutrition/MealsGrid.tsx",
    description: "Refactored meals grid sub-component with safe meal item fallback bounds, typed props, deleted item handler, and zero code comments."
  },
  {
    id: 54,
    filePath: "src/modules/dashboard/nutrition/ManualFoodInput.tsx",
    description: "Refactored manual food input form sub-component with react-hook-form context typing and zero code comments."
  },
  {
    id: 55,
    filePath: "src/modules/dashboard/nutrition/MealSkeleton.tsx",
    description: "Cleaned meal skeleton sub-component layout with zero code comments."
  },
  {
    id: 56,
    filePath: "src/modules/dashboard/nutrition/NutritionLock.tsx",
    description: "Cleaned nutrition lock access restricted view sub-component with zero code comments."
  },
  {
    id: 57,
    filePath: "src/types/user.ts",
    description: "Updated user type definitions with AdminUsersApiResponse interface and zero code comments."
  },
  {
    id: 58,
    filePath: "src/app/(admin)/admin/users/page.tsx",
    description: "Refactored admin users page server component with StarFit metadata and zero code comments."
  },
  {
    id: 59,
    filePath: "src/modules/admin/users/AdminUsers.tsx",
    description: "Refactored AdminUsers container component with clean code and zero code comments."
  },
  {
    id: 60,
    filePath: "src/modules/admin/users/UsersStats.tsx",
    description: "Refactored UsersStats with safe Persian number formatting and zero code comments."
  },
  {
    id: 61,
    filePath: "src/modules/admin/users/UserEditModal.tsx",
    description: "Refactored UserEditModal with Escape key listener, backdrop dismiss, loading state guard, and zero code comments."
  },
  {
    id: 62,
    filePath: "src/modules/admin/users/UsersTable.tsx",
    description: "Refactored UsersTable component with SWR data fetching, search/pagination caching, automatic revalidation, and zero code comments."
  }
];





