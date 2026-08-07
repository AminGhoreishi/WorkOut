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
