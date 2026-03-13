'use client';

import React from 'react';
import { MOCK_PAYMENTS, MOCK_USERS } from '@/lib/data/data';
import { LayoutDashboard, RefreshCcw, UserCheck, CreditCard as CardIcon } from 'lucide-react';
import AdminStatsGrid from './dashboard/page';
import { useUserGraphQuery } from '@/lib/api/baseApi';
import LoadingStat from '@/components/admin/LoadingStat';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import UserGrowthChart from '@/components/admin/BarChart';
import PaymentGraph from '@/components/admin/PaymentGraph';


export default function DashboardPage() {
 

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
            <LayoutDashboard size={18} />
            <span className="text-xs uppercase tracking-[0.2em]">Administration</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            System Overview
          </h1>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <RefreshCcw size={16} />
          Refresh Stats
        </button>
      </div>

      {/* The Stats Grid */}
      <AdminStatsGrid 
        users={MOCK_USERS} 
        payments={MOCK_PAYMENTS} 
      />

      {/* Quick Actions / Recent Activity Section */}
      <div className="md:flex justify-between gap-6 ">
       
      
      <div className='flex flex-1 ' >
        <UserGrowthChart/>
      </div>

      <div className='flex flex-1 md:mt-0 mt-10'>
        <PaymentGraph/>
      </div>

       
      </div>
    </div>
  );
}