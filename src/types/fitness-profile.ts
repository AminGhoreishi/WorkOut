import mongoose, { Document } from "mongoose";
import type React from "react";

export type FitnessGoal =
  | "weight_loss"
  | "muscle_gain"
  | "endurance"
  | "general_fitness"
  | "rehabilitation";

export type EquipmentOption = "none" | "home_basic" | "gym_full";

export type TrainingExperienceOption = "beginner" | "intermediate" | "advanced";

export interface GoalOptionItem {
  val: FitnessGoal;
  label: string;
  icon: React.ElementType;
}

export interface ExperienceOptionItem {
  val: TrainingExperienceOption;
  label: string;
  desc: string;
}

export interface EquipmentOptionItem {
  val: EquipmentOption;
  label: string;
  desc: string;
}

export interface FitnessProfile {
  _id?: string;
  userId?: string;
  goal: FitnessGoal;
  sessionsPerWeek: number;
  equipment: EquipmentOption;
  trainingExperience: TrainingExperienceOption;
  ageYears: number;
  heightCm: number;
  weightKg: number;
  bodyPhotos: string[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FitnessProfileData {
  goal: FitnessGoal;
  sessionsPerWeek: number;
  equipment: EquipmentOption;
  trainingExperience: TrainingExperienceOption;
  ageYears: number;
  heightCm: number;
  weightKg: number;
  bodyPhotos: string[];
  notes?: string;
}

export interface FitnessFormInputs {
  goal: FitnessGoal;
  sessionsPerWeek: number;
  equipment: EquipmentOption;
  trainingExperience: TrainingExperienceOption;
  ageYears: string;
  heightCm: string;
  weightKg: string;
  notes: string;
}

export interface OnboardingFormInputs {
  goal: FitnessGoal;
  sessionsPerWeek: number;
  equipment: EquipmentOption;
  trainingExperience: TrainingExperienceOption;
  ageYears: number;
  heightCm: number;
  weightKg: number;
  bodyPhotos: string[];
  notes: string;
}

export interface OnboardingFormProps {
  initialProfile?: FitnessProfileData | null;
}

export interface FitnessProfileApiResponse {
  profile?: FitnessProfileData | null;
  message?: string;
}

export interface IFitnessProfile
  extends Omit<FitnessProfile, "_id" | "userId" | "createdAt" | "updatedAt">,
    Document {
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
