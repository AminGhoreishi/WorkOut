"use client";

import { useState, useRef } from "react";
import type {
  PackageInfo,
  SubscriptionItem,
  SubscriptionsTableRef,
} from "@/types/workout";
import type { SubscriptionsManagementProps } from "@/types/subscription";
import SubscriptionsTable from "./SubscriptionsTable";
import WorkoutPlanModal from "./WorkoutPlanModal";
import EditSubscriptionModal from "./EditSubscriptionModal";
import SubscriptionStats from "./SubscriptionStats";

export default function SubscriptionsManagement({
  stats,
}: SubscriptionsManagementProps) {
  const tableRef = useRef<SubscriptionsTableRef>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionItem | null>(null);
  const [selectedPackageForPlan, setSelectedPackageForPlan] =
    useState<PackageInfo | null>(null);

  const handleOpenPlanModal = (pkg: PackageInfo) => {
    setSelectedPackageForPlan(pkg);
    setShowPlanModal(true);
  };

  return (
    <div
      className="min-h-screen bg-black/30 p-4 md:p-8 font-danaMed"
      dir="rtl"
    >
      <div className="container mx-auto pt-8">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2 font-morabbaReg">
            مدیریت اشتراک‌ها
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            تخصیص برنامه‌های ورزشی و مدیریت فعال‌سازی اشتراک‌های استار فیت
          </p>
        </div>

        <SubscriptionStats stats={stats} />

        <SubscriptionsTable
          ref={tableRef}
          onOpenPlanModal={handleOpenPlanModal}
          onEdit={(sub) => {
            setSelectedSubscription(sub);
            setShowEditModal(true);
          }}
        />

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
