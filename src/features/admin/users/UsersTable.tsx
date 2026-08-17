"use client";

import type { UsersStatsProps } from "@/types/user";
import UsersStats from "./UsersStats";
import UserTableList from "./UserTableList";

export default function UsersTable({
  initialStats,
}: {
  initialStats?: UsersStatsProps;
}) {
  return (
    <>
      <UsersStats {...initialStats} />
      <UserTableList />
    </>
  );
}
