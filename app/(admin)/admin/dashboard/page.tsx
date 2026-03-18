"use client"

import { Users, CreditCard, Activity, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { useAdminDashboardInfoQuery } from "@/lib/api/baseApi";
import LoadingStat from "@/components/admin/LoadingStat";

export default function AdminStatsGrid({ users, payments }: any) {
  const { data: adminInfo, isLoading } = useAdminDashboardInfoQuery(null);

  const activePlan = adminInfo?.data?.activePlan || 0;
  const totalPayment = adminInfo?.data?.totalPayment || 0;
  const paymentCount = adminInfo?.data?.totalPaymentCount || 0;
  const totalUser = adminInfo?.data?.totalUser || 0;

  if (isLoading) return <LoadingStat />;

  // Logic to calculate totals from your Express API response
  const totalRevenue =
    payments?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Users - tied to GET /users */}
      <StatCard
        title="Total Customers"
        value={totalUser}
        icon={<Users size={24} />}
        color="blue"
      />

      {/* Total Revenue - tied to GET /payments */}
      <StatCard
        title="Total Revenue"
        value={`$${totalPayment}`}
        icon={<CreditCard size={24} />}
        trend="8.4%"
        trendType="positive"
        color="emerald"
      />

      {/* Active Sessions - tied to Activity */}
      <StatCard
        title="Active Now"
        value={activePlan}
        icon={<Activity size={24} />}
        color="amber"
      />

      {/* Deletion/Churn Rate - relevant to your DELETE /users/:id route */}
      <StatCard
        title="Active Plan"
        value={activePlan}
        icon={<TrendingUp size={24} />}
        trend="0.5%"
        trendType="negative"
        color="rose"
      />
    </div>
  );
}
