import type { Document, Types } from "mongoose";

export interface IExerciseProgress {
  userId: Types.ObjectId | string;
  exerciseId: Types.ObjectId | string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExerciseProgressDocument extends IExerciseProgress, Document {}

export interface UserPRRecord {
  _id: string;
  userId: string;
  coachId?: string | null;
  category?: string;
  testName?: string;
  unit?: string;
  value: number;
  date: string;
  notes?: string;
}

export interface UserFitnessProfile {
  goal?: string;
  sessionsPerWeek?: number;
  equipment?: string;
  trainingExperience?: string;
  ageYears?: number;
  heightCm?: number;
  weightKg?: number;
  bodyPhotos?: string[];
  notes?: string;
}

export interface UserProgressHistoryProps {
  sortedRecords: UserPRRecord[];
}

export interface NewPRRecordInput {
  testName: string;
  category: string;
  value: string;
  unit: string;
  date: string;
  notes: string;
}

export interface AddProgressRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface NoPackageProgressAccessProps {
  customMessage?: string;
}

export interface ProgressStatsOverviewProps {
  totalRecordsCount: number;
  weightKg?: number | null;
  completedWorkoutsCount: number;
}
