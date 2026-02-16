import { Users, CreditCard, Activity, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';

export default function AdminStatsGrid({ users, payments }: any) {
  
  // Logic to calculate totals from your Express API response
  const totalRevenue = payments?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;
  const userCount = users?.length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Users - tied to GET /users */}
      <StatCard 
        title="Total Customers"
        value={userCount.toLocaleString()}
        icon={<Users size={24} />}
        trend="12%"
        trendType="positive"
        color="blue"
      />

      {/* Total Revenue - tied to GET /payments */}
      <StatCard 
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={<CreditCard size={24} />}
        trend="8.4%"
        trendType="positive"
        color="emerald"
      />

      {/* Active Sessions - tied to Activity */}
      <StatCard 
        title="Active Now"
        value="42"
        icon={<Activity size={24} />}
        color="amber"
      />

      {/* Deletion/Churn Rate - relevant to your DELETE /users/:id route */}
      <StatCard 
        title="Churn Rate"
        value="2.1%"
        icon={<TrendingUp size={24} />}
        trend="0.5%"
        trendType="negative"
        color="rose"
      />
    </div>
  );
}