"use client";

import { useState } from "react";
import useSWR from "swr";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import type { Package, PackageFormData } from "@/types/package";
import PackageStats from "./PackageStats";
import PackageList from "./PackageList";
import PackageModal from "./PackageModal";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت لیست پکیج‌ها");
  }
  return res.json();
};

const formatNumber = (num: number) =>
  new Intl.NumberFormat("fa-IR").format(num || 0);

export default function PackagesManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<{ packages: Package[] }>("/api/admin/package", fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  const packages: Package[] = data?.packages || [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PackageFormData>();

  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-black/30  md:p-8 font-danaMed"
      dir="rtl"
    >
      <div className="container mx-auto pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl mb-2 text-white font-morabbaReg font-bold">
              مدیریت پکیج‌ها
            </h1>
            <p className="text-white/60 text-sm">
              مشاهده، ویرایش و مدیریت پکیج‌های اشتراک سیستم استار فیت
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingPackage(null);
              setShowCreateModal(true);
            }}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer text-sm"
          >
            <Plus className="w-5 h-5" />
            ایجاد پکیج جدید
          </button>
        </div>

        <PackageStats packages={packages} formatNumber={formatNumber} />

        <PackageList
          packages={packages}
          loading={isLoading}
          error={swrError ? swrError.message || "خطا در بارگذاری پکیج‌ها" : null}
          setEditingPackage={setEditingPackage}
          setShowCreateModal={setShowCreateModal}
          reset={reset}
          formatNumber={formatNumber}
          onDeleteSuccess={() => mutate()}
        />

        <PackageModal
          isOpen={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          editingPackage={editingPackage}
          setEditingPackage={setEditingPackage}
          reset={reset}
          handleSubmit={handleSubmit}
          onSuccess={() => mutate()}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          setValue={setValue}
        />
      </div>
    </div>
  );
}
