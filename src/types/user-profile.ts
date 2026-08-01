import type { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

export interface UserProfile {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

export interface ProfileFormInputs {
  username: string;
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface UserProfileResponse {
  user?: UserProfile;
  message?: string;
}

export interface UserProfileLoadingProps {
  message?: string;
}

export interface UserProfileErrorProps {
  errorMessage?: string;
  onRetry: () => void;
}

export interface UserProfileCardProps {
  profile: UserProfile | null;
}

export interface UserProfileFormProps {
  register: UseFormRegister<ProfileFormInputs>;
  errors: FieldErrors<ProfileFormInputs>;
  setValue: UseFormSetValue<ProfileFormInputs>;
  saving: boolean;
  onSubmit: () => void;
}
