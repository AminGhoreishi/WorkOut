import mongoose, { Document } from "mongoose";
import type React from "react";
import type { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

export type FitnessGoal =
  | "weight_loss"
  | "muscle_gain"
  | "endurance"
  | "general_fitness"
  | "rehabilitation";

export type EquipmentOption = "none" | "home_basic" | "gym_full";

export type TrainingExperienceOption = "beginner" | "intermediate" | "advanced";

export type FitnessProfileTab = "physical" | "training" | "photos";

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

export interface BMICategoryDisplay {
  label: string;
  color: string;
  bg: string;
  border: string;
}

export interface PhysicalTabProps {
  register: UseFormRegister<FitnessFormInputs>;
  errors: FieldErrors<FitnessFormInputs>;
  watchedHeight: string;
  watchedWeight: string;
  bmi: number;
  bmiCategory: BMICategoryDisplay;
}

export interface TrainingTabProps {
  watchedGoal: FitnessGoal;
  watchedSessions: number;
  watchedExperience: TrainingExperienceOption;
  watchedEquipment: EquipmentOption;
  setValue: UseFormSetValue<FitnessFormInputs>;
}

export interface PhotosTabProps {
  register: UseFormRegister<FitnessFormInputs>;
  bodyPhotos: string[];
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
}
