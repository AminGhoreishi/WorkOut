"use client";

import { Trash2, Users, DollarSign, Edit } from "lucide-react";
import { showAlert, showConfirm } from "@/utils/alert";
import { formatToPersianWithCommas } from "@/utils/price";
import type { Package, PackageListProps } from "@/types/package";
import {
  getPackageIcon,
  getPackageBadge,
  getStatusBadge,
} from "./packageHelpers";

export default function PackageList({
  packages = [],
  loading = false,
  error = null,
  setEditingPackage,
  setShowCreateModal,
  reset,
  formatNumber,
  onDeleteSuccess,
}: PackageListProps) {
  const handleDeletePackage = async (id: string) => {
    const confirmed = await showConfirm({
      title: "آیا مطمئن هستید؟",
      text: "این پکیج و ویژگی‌های آن به طور کامل حذف خواهند شد!",
      confirmButtonText: "بله، حذف شود",
      icon: "warning",
    });
    if (confirmed) {
      try {
        const res = await fetch(`/api/admin/package/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || err.message || "خطا در حذف پکیج");
        }
        showAlert({
          title: "موفقیت",
          text: "پکیج با موفقیت حذف شد",
          icon: "success",
        });
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : "حذف پکیج ناموفق بود";
        showAlert({
          title: "خطا",
          text: errMessage,
          icon: "error",
        });
      }
    }
  };

  const handleEditClick = (pkg: Package) => {
    setEditingPackage(pkg);
    setShowCreateModal(true);
    const featuresText = pkg.features
      ? pkg.features
          .map((f) => (typeof f === "string" ? f : f.name))
          .join("\n")
      : "";
    reset({
      name: pkg.name || "",
      slug: pkg.slug || "",
      tagline: pkg.tagline || "",
      description: pkg.description || "",
      icon: pkg.icon || "",
      colorClass: pkg.colorClass || "",
      tier: pkg.tier || "basic",
      isPopular: pkg.isPopular || false,
      isActive: pkg.isActive !== false,
      price: {
        monthly: formatToPersianWithCommas(pkg.price?.monthly || ""),
        quarterly: formatToPersianWithCommas(pkg.price?.quarterly || ""),
        biannual: formatToPersianWithCommas(pkg.price?.biannual || ""),
      },
      originalPrice: {
        monthly: formatToPersianWithCommas(pkg.originalPrice?.monthly || ""),
        quarterly: formatToPersianWithCommas(
          pkg.originalPrice?.quarterly || "",
        ),
        biannual: formatToPersianWithCommas(pkg.originalPrice?.biannual || ""),
      },
      featuresText,
    });
  };

  return (
    <>
      {loading ? (
        <div className="p-12 text-center text-white/50 bg-white/5 border border-white/10 rounded-2xl font-danaMed">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            در حال بارگذاری اطلاعات پکیج‌ها...
          </div>
        </div>
      ) : error ? (
        <div className="p-12 text-center text-red-400 bg-white/5 border border-white/10 rounded-2xl font-danaMed text-sm">
          {error}
        </div>
      ) : packages.length === 0 ? (
        <div className="p-12 text-center text-white/40 bg-white/5 border border-white/10 rounded-2xl font-danaMed text-sm">
          هیچ پکیجی یافت نشد. پکیج جدیدی ایجاد کنید.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-danaMed">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-white/5 flex flex-col justify-between"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center">
                    {getPackageIcon(pkg.tier)}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getPackageBadge(pkg.tier)}
                    {getStatusBadge(pkg.isActive)}
                  </div>
                </div>

                <h3 className="text-2xl text-white mb-2 font-morabbaReg font-bold">
                  {pkg.name}
                </h3>
                <p className="text-white/60 text-sm mb-4 min-h-[40px] line-clamp-2 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">یک ماهه:</span>
                    <span className="text-white font-medium ss02 font-sans">
                      {formatNumber(pkg.price?.monthly || 0)} تومان
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">سه ماهه:</span>
                    <span className="text-white font-medium ss02 font-sans">
                      {formatNumber(pkg.price?.quarterly || 0)} تومان
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">شش ماهه:</span>
                    <span className="text-white font-medium ss02 font-sans">
                      {formatNumber(pkg.price?.biannual || 0)} تومان
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                      <Users className="w-4 h-4 text-amber-400" />
                      کاربران فعال
                    </div>
                    <div className="text-white font-medium ss02 font-sans">
                      {formatNumber(pkg.studentCount || 0)}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                      <DollarSign className="w-4 h-4 text-amber-400" />
                      درآمد ماهانه
                    </div>
                    <div className="text-white font-medium text-sm ss02 font-sans">
                      {formatNumber(
                        (pkg.price?.monthly || 0) * (pkg.studentCount || 0),
                      )}{" "}
                      تومان
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-white text-sm font-medium mb-3">
                  امکانات:
                </h4>
                <ul className="space-y-2 mb-6 min-h-[120px]">
                  {pkg.features
                    ?.slice(0, 4)
                    .map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-white/70 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-2 flex-shrink-0" />
                        <span>
                          {typeof feature === "string" ? feature : feature.name}
                        </span>
                      </li>
                    ))}
                  {(!pkg.features || pkg.features.length === 0) && (
                    <li className="text-white/40 text-xs">
                      بدون ویژگی ثبت شده
                    </li>
                  )}
                  {pkg.features && pkg.features.length > 4 && (
                    <li className="text-amber-400 text-sm font-semibold">
                      +{pkg.features.length - 4} مورد دیگر
                    </li>
                  )}
                </ul>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditClick(pkg)}
                    className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer font-bold"
                  >
                    <Edit className="w-4 h-4" />
                    ویرایش
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePackage(pkg._id)}
                    className="bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-400 px-3.5 py-2.5 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                    title="حذف پکیج"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
