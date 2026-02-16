
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendType?: 'positive' | 'negative';
  color: 'blue' | 'emerald' | 'rose' | 'amber';
}

const colorMap = {
  blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

export const StatCard = ({ title, value, icon, trend, trendType, color }: StatCardProps) => {
  return (
    <div className="relative overflow-hidden group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Decorative background glow */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 rounded-full ${colorMap[color].split(' ')[0]}`} />
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h3>
          
          {trend && (
            <p className={`text-xs mt-2 font-semibold ${trendType === 'positive' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trendType === 'positive' ? '↑' : '↓'} {trend} <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </p>
          )}
        </div>

        <div className={`p-4 rounded-xl border ${colorMap[color]} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
};