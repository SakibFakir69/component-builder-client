import React from 'react';
import { 
  Bar, 
  BarChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { useUserGraphQuery } from '@/lib/api/baseApi';
import LoadingStat from '@/components/admin/LoadingStat';

const getMonthName = (monthNum: any) => {
  if (!monthNum) return 'Other';
  const date = new Date();
  date.setMonth(monthNum - 1);
  return date.toLocaleString('en-US', { month: 'short' });
};

// Dark Mode Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] p-3 shadow-2xl rounded-lg border border-slate-700">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
          {payload[0].payload.fullDate}
        </p>
        <p className="text-lg font-extrabold text-[#00BC7D]">
          {payload[0].value.toLocaleString()} <span className="text-xs font-medium text-slate-400">Users</span>
        </p>
      </div>
    );
  }
  return null;
};

function UserGrowthChart() {
  const { data: userData, isLoading } = useUserGraphQuery('');

  const chartData = userData?.data?.map((item: any) => ({
    name: item._id.month ? getMonthName(item._id.month) : 'Total',
    users: item.totalUsers,
    fullDate: item._id.month ? `${getMonthName(item._id.month)} ${item._id.year || 2026}` : 'All Time'
  })) || [];

  if (isLoading) return <LoadingStat />;

  return (
    <div className="w-full p-6 bg-[#1e293b] rounded-xl border border-slate-700 shadow-sm">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">User Analytics</h3>
        <p className="text-sm text-slate-400">Monthly registration performance</p>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00BC7D" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#00BC7D" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#334155" 
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            
            <Tooltip 
              cursor={{ fill: '#334155', opacity: 0.3 }}
              content={<CustomTooltip />}
            />
            
            <Bar 
              dataKey="users" 
              fill="url(#userGradient)" 
              radius={[6, 6, 0, 0]} 
              barSize={40}
              animationDuration={1500}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserGrowthChart;