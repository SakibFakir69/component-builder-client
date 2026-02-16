'use client';

import React from 'react';
import { MOCK_PAYMENTS, MOCK_USERS } from '@/lib/data/data';
import { LayoutDashboard, RefreshCcw, UserCheck, CreditCard as CardIcon } from 'lucide-react';
import AdminStatsGrid from './dashboard/page';


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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Analytics</h3>
            <p className="text-slate-500 max-w-sm mt-2 text-sm">
                Detailed data tables for your {MOCK_USERS.length} users will be rendered in this section.
            </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20">
            <CardIcon className="mb-4 opacity-80" size={32} />
            <h3 className="text-xl font-bold">Revenue Projections</h3>
            <p className="text-indigo-100 mt-2 text-sm leading-relaxed">
                Based on your {MOCK_PAYMENTS.length} recent transactions, your growth is steady. Keep track of failures in the payment logs.
            </p>
            <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-bold text-sm transition-colors">
                View Reports
            </button>
        </div>
      </div>
    </div>
  );
}