"use client";

import { useState } from "react";
import useSWR from "swr";
import type { IAdminUser, AdminUsersApiResponse } from "@/types/user";
import UserEditModal from "./UserEditModal";
import UsersStats from "./UsersStats";
import UserTableList from "./UserTableList";

const statsFetcher = async (url: string): Promise<AdminUsersApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) return {};
  return res.json();
};

export default function UsersTable() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<IAdminUser | null>(null);

  const { data: statsData, mutate: mutateStats } = useSWR<AdminUsersApiResponse>(
    "/api/admin/user?page=1",
    statsFetcher,
    { revalidateOnFocus: true, dedupingInterval: 5000 }
  );

  const totalUsers = statsData?.totalUsers || 0;
  const activeUsers = statsData?.activeUsers || 0;
  const expiredUsers = statsData?.expiredUsers || 0;
  const blockedUsers = statsData?.blockedUsers || 0;

  const handleEdit = (user: IAdminUser) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  return (
    <>
      <UsersStats
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        expiredUsers={expiredUsers}
        blockedUsers={blockedUsers}
      />

      <UserTableList onEditUser={handleEdit} />

      {showEditModal && editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => {
            setShowEditModal(false);
            setEditingUser(null);
          }}
          onSaveSuccess={() => {
            mutateStats();
          }}
        />
      )}
    </>
  );
}
