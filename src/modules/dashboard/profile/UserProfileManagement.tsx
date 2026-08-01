"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { showAlert } from "@/utils/alert";
import { toEnglishDigits } from "@/utils/numbers";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import UserProfileLoading from "./UserProfileLoading";
import UserProfileError from "./UserProfileError";
import UserProfileCard from "./UserProfileCard";
import UserProfileForm from "./UserProfileForm";
import type {
  ProfileFormInputs,
  UserProfileResponse,
} from "@/types/user-profile";

const fetcher = async (url: string): Promise<UserProfileResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || "بارگذاری اطلاعات حساب کاربری با خطا مواجه شد.",
    );
  }
  return res.json();
};

export default function UserProfileManagement() {
  const router = useRouter();
  const [saving, setSaving] = useState<boolean>(false);

  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<UserProfileResponse>("/api/user/profile", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });

  const profile = data?.user || null;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        username: profile.username || "",
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        email: profile.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [profile, reset]);

  const handleUpdateProfile: SubmitHandler<ProfileFormInputs> = async (
    formData,
  ) => {
    if (saving) return;
    setSaving(true);
    try {
      const cleanPhone = toEnglishDigits(formData.phone || "");

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          fullName: formData.fullName,
          phone: cleanPhone,
          email: formData.email,
          password: formData.password || undefined,
        }),
      });

      const resData = await res.json().catch(() => ({}));

      if (res.ok) {
        await mutate(resData, { revalidate: true });
        setValue("password", "");
        setValue("confirmPassword", "");
        router.refresh();
        showAlert({
          title: "موفقیت‌آمیز",
          text: "اطلاعات حساب کاربری شما با موفقیت بروزرسانی شد.",
          icon: "success",
          confirmButtonColor: "#f59e0b",
        });
      } else {
        showAlert({
          title: "خطا",
          text: resData.message || "بروزرسانی اطلاعات کاربری ناموفق بود.",
          icon: "error",
          confirmButtonColor: "#f59e0b",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در ارتباط با سرور رخ داده است.",
        icon: "error",
        confirmButtonColor: "#f59e0b",
      });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <UserProfileLoading />;
  }

  if (swrError && !profile) {
    return (
      <UserProfileError
        errorMessage={swrError.message}
        onRetry={() => mutate()}
      />
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-6 text-white font-danaMed"
      dir="rtl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserProfileCard profile={profile} />
        <UserProfileForm
          register={register}
          errors={errors}
          setValue={setValue}
          saving={saving}
          onSubmit={handleSubmit(handleUpdateProfile)}
        />
      </div>
    </div>
  );
}
