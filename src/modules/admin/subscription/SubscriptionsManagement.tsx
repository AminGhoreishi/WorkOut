"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Users, Check, X, Clock } from "lucide-react";
import type {
  PackageInfo,
  SubscriptionItem,
  SubscriptionsTableRef,
} from "@/types/workout";
import { showAlert } from "@/utils/alert";
import CreateSubscriptionModal from "./CreateSubscriptionModal";
import SubscriptionsTable from "./SubscriptionsTable";
import WorkoutPlanModal from "./WorkoutPlanModal";
import EditSubscriptionModal from "./EditSubscriptionModal";

export default function SubscriptionsManagement() {
  const tableRef = useRef<SubscriptionsTableRef>(null);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    trial: 0,
    expired: 0,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionItem | null>(null);
  const [selectedPackageForPlan, setSelectedPackageForPlan] =
    useState<PackageInfo | null>(null);

  const [packages, setPackages] = useState<PackageInfo[]>([]);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/admin/package");
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setPackages(data.packages || []);
      } else {
        showAlert({
          title: "خطا",
          text: "دریافت لیست پکیج‌ها با خطا مواجه شد",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در برقراری ارتباط با سرور",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleOpenPlanModal = (pkg: PackageInfo) => {
    setSelectedPackageForPlan(pkg);
    setShowPlanModal(true);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num || 0);
  };

  return (
    <div
      className="min-h-screen bg-black/30 p-4 md:p-8 font-danaMed"
      dir="rtl"
    >
      <div className="container mx-auto pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-morabbaReg">
              مدیریت اشتراک‌ها
            </h1>
            <p className="text-white/60 text-sm md:text-base">
              تخصیص برنامه‌های ورزشی و مدیریت فعال‌سازی اشتراک‌های استار فیت
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 transition-all text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              ثبت اشتراک دستی
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">کل اشتراک‌ها</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-sm sm:text-3xl text-white font-bold font-morabbaReg ss02">
              {formatNumber(stats.total)}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">فعال</span>
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-sm sm:text-3xl text-white font-bold font-morabbaReg ss02">
              {formatNumber(stats.active)}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">آزمایشی (Trial)</span>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-sm sm:text-3xl text-white font-bold font-morabbaReg ss02">
              {formatNumber(stats.trial)}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">منقضی شده</span>
              <X className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-sm sm:text-3xl text-white font-bold font-morabbaReg ss02">
              {formatNumber(stats.expired)}
            </div>
          </div>
        </div>

        <SubscriptionsTable
          ref={tableRef}
          onOpenPlanModal={handleOpenPlanModal}
          onEdit={(sub) => {
            setSelectedSubscription(sub);
            setShowEditModal(true);
          }}
          onStatsUpdate={setStats}
        />

        {showCreateModal && (
          <CreateSubscriptionModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => tableRef.current?.refresh()}
            packages={packages}
          />
        )}

        {showEditModal && selectedSubscription && (
          <EditSubscriptionModal
            selectedSubscription={selectedSubscription}
            onClose={() => setShowEditModal(false)}
            onSuccess={() => tableRef.current?.refresh()}
          />
        )}

        {showPlanModal && selectedPackageForPlan && (
          <WorkoutPlanModal
            selectedPackageForPlan={selectedPackageForPlan}
            onClose={() => setShowPlanModal(false)}
            videos={[]}
            setWatchingVideo={() => {}}
          />
        )}
      </div>
    </div>
  );
}
