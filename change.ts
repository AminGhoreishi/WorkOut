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
  },
  {
    id: 63,
    filePath: "src/types/comment.ts",
    description: "Cleaned comment type definitions with zero code comments."
  },
  {
    id: 64,
    filePath: "src/app/(admin)/admin/comments/page.tsx",
    description: "Refactored admin comments page server component with StarFit metadata and zero code comments."
  },
  {
    id: 65,
    filePath: "src/modules/admin/comments/AdminComments.tsx",
    description: "Refactored AdminComments container component with clean layout and zero code comments."
  },
  {
    id: 66,
    filePath: "src/modules/admin/comments/CommentStats.tsx",
    description: "Refactored CommentStats with safe number formatting and zero code comments."
  },
  {
    id: 67,
    filePath: "src/modules/admin/comments/ViewCommentModal.tsx",
    description: "Refactored ViewCommentModal with Escape key listener, backdrop dismiss, author details, and zero code comments."
  },
  {
    id: 68,
    filePath: "src/modules/admin/comments/CommentList.tsx",
    description: "Refactored CommentList component with optimistic SWR data mutation, safe error handling, debounced search, and zero code comments."
  },
  {
    id: 69,
    filePath: "src/types/package.ts",
    description: "Updated package type definitions with zero code comments."
  },
  {
    id: 70,
    filePath: "src/app/(admin)/admin/packages/page.tsx",
    description: "Refactored admin packages page server component with StarFit metadata and zero code comments."
  },
  {
    id: 71,
    filePath: "src/modules/admin/package/packageHelpers.tsx",
    description: "Refactored packageHelpers functions with clean badge and icon rendering with zero code comments."
  },
  {
    id: 72,
    filePath: "src/modules/admin/package/PackageStats.tsx",
    description: "Refactored PackageStats with memoized stats calculation and zero code comments."
  },
  {
    id: 73,
    filePath: "src/modules/admin/package/PackageModal.tsx",
    description: "Refactored PackageModal with Escape key listener, backdrop dismiss, loading state guard, and zero code comments."
  },
  {
    id: 74,
    filePath: "src/modules/admin/package/PackageList.tsx",
    description: "Refactored PackageList component with safe price formatting, card layout, and zero code comments."
  },
  {
    id: 75,
    filePath: "src/modules/admin/package/PackagesManagement.tsx",
    description: "Refactored PackagesManagement container component with SWR data fetching, fixed typo, clean code, and zero comments."
  },
  {
    id: 76,
    filePath: "src/types/meal-plan.ts",
    description: "Updated meal-plan type definitions with zero code comments."
  },
  {
    id: 77,
    filePath: "src/app/(admin)/admin/meal-plans/page.tsx",
    description: "Refactored admin meal-plans page server component with StarFit metadata and zero code comments."
  },
  {
    id: 78,
    filePath: "src/modules/admin/meal-plan/MealPlanItem.tsx",
    description: "Refactored MealPlanItem with safe null handling, responsive grid, and zero code comments."
  },
  {
    id: 79,
    filePath: "src/modules/admin/meal-plan/MealPlanFormFields.tsx",
    description: "Refactored MealPlanFormFields with tab management, safe field array mapping, and zero code comments."
  },
  {
    id: 80,
    filePath: "src/modules/admin/meal-plan/MealPlanForm.tsx",
    description: "Refactored MealPlanForm with clean form reset, error handling, and zero code comments."
  },
  {
    id: 81,
    filePath: "src/modules/admin/meal-plan/MealPlanList.tsx",
    description: "Refactored MealPlanList with search filter, loading indicator, and zero code comments."
  },
  {
    id: 82,
    filePath: "src/modules/admin/meal-plan/MealPlansManagement.tsx",
    description: "Refactored MealPlansManagement container component with SWR data fetching, clean error handling, and zero code comments."
  },
  {
    id: 83,
    filePath: "src/app/(admin)/admin/foods/page.tsx",
    description: "Refactored admin foods page server component with StarFit metadata and zero code comments."
  },
  {
    id: 84,
    filePath: "src/modules/admin/foods/FoodForm.tsx",
    description: "Refactored FoodForm with validation messages and zero code comments."
  },
  {
    id: 85,
    filePath: "src/modules/admin/foods/FoodsTable.tsx",
    description: "Refactored FoodsTable component with SWR data fetching, debounced search, imperative ref refresh, and zero code comments."
  },
  {
    id: 86,
    filePath: "src/modules/admin/foods/FoodsContainer.tsx",
    description: "Refactored FoodsContainer container component with clean form submission, SWR cache revalidation, and zero code comments."
  },
  {
    id: 87,
    filePath: "src/types/adminAi.ts",
    description: "Cleaned adminAi.ts type definitions without comments."
  },
  {
    id: 88,
    filePath: "src/types/admin.ts",
    description: "Cleaned admin.ts type definitions without comments."
  },
  {
    id: 89,
    filePath: "src/types/ai-tools.ts",
    description: "Cleaned ai-tools.ts type definitions without comments."
  },
  {
    id: 90,
    filePath: "src/types/animation.ts",
    description: "Cleaned animation.ts type definitions without comments."
  },
  {
    id: 91,
    filePath: "src/types/blog.ts",
    description: "Cleaned blog.ts type definitions without comments."
  },
  {
    id: 92,
    filePath: "src/types/coach.ts",
    description: "Cleaned coach.ts type definitions without comments."
  },
  {
    id: 93,
    filePath: "src/types/components.ts",
    description: "Cleaned components.ts type definitions without comments."
  },
  {
    id: 94,
    filePath: "src/types/declarations.d.ts",
    description: "Cleaned declarations.d.ts type definitions without comments."
  },
  {
    id: 95,
    filePath: "src/types/feedback.ts",
    description: "Cleaned feedback.ts type definitions without comments."
  },
  {
    id: 96,
    filePath: "src/types/next-auth.d.ts",
    description: "Cleaned next-auth.d.ts type definitions without comments."
  },
  {
    id: 97,
    filePath: "src/types/order.ts",
    description: "Cleaned order.ts type definitions without comments."
  },
  {
    id: 98,
    filePath: "src/types/otp.ts",
    description: "Cleaned otp.ts type definitions without comments."
  },
  {
    id: 99,
    filePath: "src/types/progress.ts",
    description: "Cleaned progress.ts type definitions without comments."
  },
  {
    id: 100,
    filePath: "src/types/pr.ts",
    description: "Cleaned pr.ts type definitions without comments."
  },
  {
    id: 101,
    filePath: "src/types/sidebar.ts",
    description: "Cleaned sidebar.ts type definitions without comments."
  },
  {
    id: 102,
    filePath: "src/types/video.ts",
    description: "Cleaned video.ts type definitions without comments."
  },
  {
    id: 103,
    filePath: "src/types/workout.ts",
    description: "Cleaned workout.ts type definitions without comments."
  },
  {
    id: 104,
    filePath: "src/app/(admin)/admin/tickets/page.tsx",
    description: "Refactored admin tickets page server component with StarFit metadata and zero code comments."
  },
  {
    id: 105,
    filePath: "src/modules/admin/tickets/ticketHelpers.ts",
    description: "Refactored ticketHelpers.ts with clean badge utilities and zero code comments."
  },
  {
    id: 106,
    filePath: "src/modules/admin/tickets/TicketStats.tsx",
    description: "Refactored TicketStats.tsx with memoized layout, safe number formatting, and zero code comments."
  },
  {
    id: 107,
    filePath: "src/modules/admin/tickets/EmptyTicketState.tsx",
    description: "Refactored EmptyTicketState.tsx with clean layout and zero code comments."
  },
  {
    id: 108,
    filePath: "src/modules/admin/tickets/TicketDetails.tsx",
    description: "Refactored TicketDetails.tsx with memoized thread rendering, auto-scroll, and zero code comments."
  },
  {
    id: 109,
    filePath: "src/modules/admin/tickets/TicketList.tsx",
    description: "Refactored TicketList.tsx with SWR integration, automatic stats revalidation, debounced search, and zero code comments."
  },
  {
    id: 110,
    filePath: "src/modules/admin/tickets/AdminTickets.tsx",
    description: "Refactored AdminTickets.tsx container component with clean code and zero comments."
  },
  {
    id: 111,
    filePath: "src/app/(dashboard)/dashboard/workout/page.tsx",
    description: "Refactored user workout page server component with StarFit metadata and zero code comments."
  },
  {
    id: 112,
    filePath: "src/modules/dashboard/workout/WorkoutView.tsx",
    description: "Refactored WorkoutView.tsx container component with SWR data fetching and zero code comments."
  },
  {
    id: 113,
    filePath: "src/modules/dashboard/workout/ExercisesList.tsx",
    description: "Refactored ExercisesList.tsx with progress tracking, video player dropdown, and zero code comments."
  },
  {
    id: 114,
    filePath: "src/modules/dashboard/workout/ExerciseFeedbackForm.tsx",
    description: "Refactored ExerciseFeedbackForm.tsx with clean form handlers and zero code comments."
  },
  {
    id: 115,
    filePath: "src/modules/dashboard/workout/WorkoutHeader.tsx",
    description: "Refactored WorkoutHeader.tsx with clean layout and zero code comments."
  },
  {
    id: 116,
    filePath: "src/modules/dashboard/workout/WorkoutAchievements.tsx",
    description: "Refactored WorkoutAchievements.tsx with clean layout and zero code comments."
  },
  {
    id: 117,
    filePath: "src/modules/dashboard/workout/WorkoutSummary.tsx",
    description: "Refactored WorkoutSummary.tsx with zero code comments."
  },
  {
    id: 118,
    filePath: "src/modules/dashboard/workout/WeeklyAdvice.tsx",
    description: "Refactored WeeklyAdvice.tsx with zero code comments."
  },
  {
    id: 119,
    filePath: "src/modules/dashboard/workout/RestDayView.tsx",
    description: "Refactored RestDayView.tsx with zero code comments."
  },
  {
    id: 120,
    filePath: "src/modules/dashboard/workout/NoWorkoutPlan.tsx",
    description: "Refactored NoWorkoutPlan.tsx with zero code comments."
  },
  {
    id: 121,
    filePath: "src/modules/dashboard/workout/WorkoutDownloadButton.tsx",
    description: "Refactored WorkoutDownloadButton.tsx with client-side PDF renderer and zero code comments."
  },
  {
    id: 122,
    filePath: "src/modules/dashboard/workout/WorkoutPdfDocument.tsx",
    description: "Refactored WorkoutPdfDocument.tsx with PDF styling and zero code comments."
  },
  {
    id: 123,
    filePath: "src/modules/dashboard/workout/WorkoutErrorState.tsx",
    description: "Refactored WorkoutErrorState.tsx with zero code comments."
  },
  {
    id: 124,
    filePath: "src/modules/dashboard/workout/WorkoutExercisesSkeleton.tsx",
    description: "Refactored WorkoutExercisesSkeleton.tsx with zero code comments."
  },
  {
    id: 125,
    filePath: "src/modules/admin/users/UsersTable.tsx",
    description: "Fixed avatar URL overflow bug by rendering standard img tag for image URLs with zero code comments."
  },
  {
    id: 126,
    filePath: "src/modules/admin/pr/PersonalRecords.tsx",
    description: "Refactored PersonalRecords and PR sub-components (PRChart, CreatePRModal, CreateMetricModal, PRHistoryTable, PRStateViews) to modern black and gold theme with zero code comments."
  },
  {
    id: 127,
    filePath: "src/modules/dashboard/AdminDashboardUser/DashboardStats.tsx",
    description: "Connected DashboardStats to SWR /api/user/fitness-profile endpoint to dynamically render weight, height, weekly session goals, training experience, and equipment stats with zero code comments."
  },
  {
    id: 128,
    filePath: "src/utils/fitnessProfile.ts",
    description: "Created fitnessProfile utility helper file containing exported goalLabels, experienceLabels, and equipmentLabels constants with zero code comments."
  },
  {
    id: 129,
    filePath: "src/modules/dashboard/AdminDashboardUser/DashboardStats.tsx",
    description: "Adjusted stat values text size to text-sm on mobile screens below sm breakpoint (text-sm sm:text-2xl) with zero code comments."
  },
  {
    id: 130,
    filePath: "src/modules/auth/LoginForm.tsx",
    description: "Adjusted font sizes to text-xs / text-sm on mobile screens below sm breakpoint (text-xs sm:text-sm, text-2xl sm:text-3xl) with zero code comments."
  },
  {
    id: 131,
    filePath: "src/modules/article/RelatedArticles.tsx",
    description: "Extracted modular RelatedArticles sub-component with external type interfaces and zero code comments."
  },
  {
    id: 132,
    filePath: "src/modules/article/ArticleTags.tsx",
    description: "Extracted modular ArticleTags sub-component with external type interfaces and zero code comments."
  },
  {
    id: 133,
    filePath: "src/modules/article/ArticleDetail.tsx",
    description: "Refactored ArticleDetail component with SWR data fetching for comments, extracted sub-components (RelatedArticles, ArticleTags, ArticleAuthorCard, ArticleCtaCard), safe avatar image rendering, responsive typography, and zero code comments."
  },
  {
    id: 134,
    filePath: "src/modules/article/ArticleAuthorCard.tsx",
    description: "Extracted modular ArticleAuthorCard sub-component with external type interfaces and zero code comments."
  },
  {
    id: 135,
    filePath: "src/modules/article/ArticleCtaCard.tsx",
    description: "Extracted modular ArticleCtaCard sub-component with zero code comments."
  },
  {
    id: 136,
    filePath: "src/utils/article.ts",
    description: "Created article utility helper file containing exported getReadTime and isImageUrl functions with zero code comments."
  },
  {
    id: 137,
    filePath: "src/modules/article/ArticleNotFound.tsx",
    description: "Extracted modular ArticleNotFound fallback sub-component with zero code comments."
  }
,
  {
    id: 138,
    filePath: "src/modules/onboarding/OnboardingForm.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 139,
    filePath: "src/modules/admin/subscription/CreateSubscriptionModal.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 140,
    filePath: "src/modules/admin/subscription/SubscriptionsTable.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 141,
    filePath: "src/modules/admin/subscription/SubscriptionsManagement.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 142,
    filePath: "src/modules/admin/subscription/VideosManagement.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 143,
    filePath: "src/modules/admin/subscription/WorkoutPlanModal.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 144,
    filePath: "src/modules/admin/subscription/UploadVideoModal.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 145,
    filePath: "src/modules/admin/pr/CreatePRModal.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 146,
    filePath: "src/modules/admin/workouts/WorkoutExercisesSection.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 147,
    filePath: "src/modules/admin/workouts/WorkoutDayForm.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 148,
    filePath: "src/modules/admin/workouts/WorkoutsManagement.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  },
  {
    id: 149,
    filePath: "src/modules/admin/workouts/WorkoutExerciseForm.tsx",
    description: "Removed font-sans class override from component with zero code comments."
  }
,
  {
    id: 150,
    filePath: "src/modules/articles/Articles.tsx",
    description: "Refactored load more pagination to throttled cumulative append fetching with zero code comments."
  }
,
  {
    id: 151,
    filePath: "src/modules/article/ArticleMainContent.tsx",
    description: "Extracted modular ArticleMainContent sub-component for article metadata header and body content with zero code comments."
  }
,
  {
    id: 152,
    filePath: "src/modules/article/ArticleActionsBar.tsx",
    description: "Extracted modular ArticleActionsBar sub-component for article like, bookmark, and share actions with zero code comments."
  }
,
  {
    id: 153,
    filePath: "src/app/(main)/article/[slug]/page.tsx",
    description: "Refactored article page server component with StarFit metadata branding, parallel Promise.all queries, safe DB error handling, and zero code comments."
  }
];
