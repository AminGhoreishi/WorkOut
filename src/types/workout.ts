import type mongoose from "mongoose";
import type { Document } from "mongoose";

export interface UserInfo {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface PackageInfo {
  _id: string;
  name: string;
  slug: string;
  colorClass: string;
  price?: {
    monthly: number;
  };
}

export interface SubscriptionItem {
  _id: string;
  userId: UserInfo | null;
  packageId: PackageInfo | null;
  status: "trial" | "active" | "expired" | "cancelled";
  startsAt: string;
  endsAt: string;
  createdAt: string;
}

export interface WorkoutPlan {
  _id: string;
  packageId: string;
  title: string;
  description?: string;
  isActive: boolean;
}

export interface WorkoutWeekInfo {
  _id: string;
  packageId: string;
  title: string;
  createdAt?: string;
}

export interface WorkoutDay {
  _id: string;
  planId: string;
  dayName: string;
  muscleGroup: string;
  sortOrder: number;
}

export interface VideoInfo {
  _id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  level?: string;
  durationSec?: number;
  tags?: string[];
  createdAt?: string;
}

export interface WorkoutExercise {
  _id: string;
  dayId: string;
  videoId?: VideoInfo | null;
  videoId2?: VideoInfo | null;
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  sortOrder: number;
}

export interface ExerciseItem {
  _id: string;
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  videoId?: VideoInfo | null;
  videoId2?: VideoInfo | null;
}

export interface DayItem {
  _id: string;
  dayName: string;
  muscleGroup: string;
  exercises: ExerciseItem[];
}

export interface WorkoutPlanProps {
  plan: {
    _id: string;
    title: string;
    description?: string;
  } | null;
  days: DayItem[];
}

export interface IWorkoutPlan extends Document {
  packageId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkoutweek extends Document {
  packageId: mongoose.Types.ObjectId;
  title?: string;
  workoutdays?: unknown[];
  workoutexcersice?: unknown[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkoutmonth extends Document {
  packageId: mongoose.Types.ObjectId;
  title?: string;
  description?: string;
  workoutweeks?: unknown[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkoutDay extends Document {
  planId: mongoose.Types.ObjectId;
  dayName: string;
  muscleGroup: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkoutExercise extends Document {
  dayId: mongoose.Types.ObjectId;
  videoId?: mongoose.Types.ObjectId;
  videoId2?: mongoose.Types.ObjectId;
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutPlanFormInputs {
  title: string;
  description: string;
}

export interface WorkoutDayFormInputs {
  dayName: string;
  muscleGroup: string;
  sortOrder: number;
}

export interface WorkoutExerciseFormInputs {
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  videoId: string;
  videoId2: string;
  sortOrder: number;
}

export interface WorkoutPlanModalProps {
  selectedPackageForPlan: PackageInfo;
  onClose: () => void;
  videos: VideoInfo[];
  setWatchingVideo: (video: VideoInfo | null) => void;
}

export interface EditSubscriptionFormInputs {
  status: SubscriptionItem["status"];
  endsAt: string;
}

export interface EditSubscriptionModalProps {
  selectedSubscription: SubscriptionItem;
  onClose: () => void;
  onSuccess: () => void;
}

export interface VideoPlayerModalProps {
  video: VideoInfo;
  onClose: () => void;
}

export interface WorkoutDayFormProps {
  editingDay: WorkoutDay | null;
  workoutPlanId: string;
  onSuccess: (updatedDay?: WorkoutDay) => void;
  onCancel: () => void;
  defaultSortOrder: number;
}

export interface SubscriptionsTableRef {
  refresh: () => void;
}

export interface SubscriptionsTableProps {
  onOpenPlanModal: (pkg: PackageInfo) => void;
  onEdit: (sub: SubscriptionItem) => void;
  onStatsUpdate: (stats: { total: number; active: number; trial: number; expired: number }) => void;
}

export interface ExercisesListProps {
  exercises: ExerciseItem[];
  muscleGroup: string;
  userId?: string;
  dayId?: string;
}

export interface WorkoutViewProps {
  subscription?: {
    packageId?: {
      _id: string;
      name?: string;
      tagline?: string;
    };
  };
  userId?: string;
}

export interface WorkoutHeaderProps {
  workoutPlan: WorkoutPlan;
  workoutDays: DayItem[];
  overallProgressPercent: number;
}

export interface WorkoutSummaryProps {
  totalExercises: number;
}

export interface SimpleWeek {
  _id?: string;
  id?: string;
  title: string;
  days: DayItem[];
}

export interface DownloadButtonProps {
  workoutPlan: WorkoutPlan;
  workoutDays: DayItem[];
}

export interface VideosManagementRef {
  fetchVideos: () => Promise<void>;
}

export interface VideosManagementProps {
  setShowUploadVideoModal: (show: boolean) => void;
  setWatchingVideo: (video: VideoInfo | null) => void;
  onVideosUpdate?: (videos: VideoInfo[]) => void;
}

export interface CreateSubscriptionModalProps {
  onClose: () => void;
  onSuccess: () => void;
  packages: PackageInfo[];
}

export interface UploadVideoModalProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

export interface WorkoutErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export interface CreatePlanFormProps {
  selectedPackage: PackageInfo;
  onSuccess: (plan: WorkoutPlan) => void;
}

export interface WorkoutExerciseFormProps {
  editingExercise: WorkoutExercise | null;
  selectedDayId: string;
  videos: VideoInfo[];
  onSuccess: () => void;
  onCancel: () => void;
  defaultSortOrder: number;
}

export interface WorkoutExercisesSectionProps {
  selectedDay: WorkoutDay;
  exercises: WorkoutExercise[];
  videos: VideoInfo[];
  onFetchExercises: (dayId: string) => void;
  onDeleteExercise: (id: string) => void;
}

export interface EditPlanInfoFormProps {
  workoutPlan: WorkoutPlan;
  onSuccess: (updatedPlan: WorkoutPlan) => void;
  onCancel: () => void;
}

export interface WorkoutWeeksListProps {
  workoutWeeks: WorkoutWeekInfo[];
  selectedWeek: WorkoutWeekInfo | null;
  onSelectWeek: (week: WorkoutWeekInfo) => void;
  onDeleteWeek: (id: string) => void;
}

export interface WorkoutDaysListProps {
  workoutDays: WorkoutDay[];
  selectedDay: WorkoutDay | null;
  onSelectDay: (day: WorkoutDay) => void;
  onEditDay: (day: WorkoutDay) => void;
  onDeleteDay: (id: string) => void;
}
