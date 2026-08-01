export type BMIGender = "male" | "female";

export type BMICategory = "underweight" | "normal" | "overweight" | "obese";

export interface BMIResult {
  bmi: number;
  bmiFormatted: string;
  category: BMICategory;
  categoryTitle: string;
  categoryDescription: string;
  badgeClass: string;
  badgeText: string;
  idealWeightMin: number;
  idealWeightMax: number;
  idealWeightText: string;
  nutritionAdvice: string;
  activityAdvice: string;
  positionPercent: number;
}

export interface BMIFormInputs {
  weight: string;
  height: string;
  age: string;
  gender: BMIGender;
}
