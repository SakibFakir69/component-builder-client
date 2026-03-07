"use client";

import React, { useState } from "react";
import { 
  Search, 
  Loader2, 
  Eye, 
  ShieldAlert, 
  Trash2, 
  ChevronRight, 
  RotateCcw, 
  Info,
  CreditCard,
  Calendar
} from "lucide-react";
import { format } from 'date-and-time';
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

// Updated Interface to match the detailed UX
export interface IPayment {
  _id: string;
  userName: string;
  userEmail: string;
  planName: string;
  price: number | string;
  expiresAt: string;
  status: "Active" | "Expired" | "Pending";
}

const PaymentManagement = ({ paymentData }: { paymentData: IPayment[] }) => {

  // add user , name 
  //  gave pagination button  , load more
  console.log(paymentData , ' payment data')
 

  return (
    <div className="p-8 bg-slate-950 min-h-screen font-sans text-slate-200">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <CreditCard className="text-indigo-500" size={32} />
          Payment Transactions
        </h1>
      </div>

     

      {/* Table Container */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/40 border-b border-slate-800">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Plan & Price</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Expiry Detail (H:M:S)</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
             
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {paymentData?.map((payment) => {
                const dateObj = new Date(payment.expiresAt);
                // Enhanced Date Formatting with Minutes and Seconds
                const formattedDate = format(dateObj, 'ddd, MMM DD YYYY');
                const formattedTime = format(dateObj, 'HH:mm:ss A');

                return (
                  <tr key={payment._id} className="hover:bg-indigo-500/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {payment.userName}
                        </div>
                        <div className="text-sm text-slate-500">{payment.userEmail}</div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-indigo-400 font-semibold">{payment.planName}</span>
                        <span className="text-emerald-400 text-sm font-mono">${Number(payment.price).toFixed(2)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-slate-600" size={16} />
                        <div>
                          <div className="text-sm text-slate-200 font-medium">{formattedDate}</div>
                          <div className="text-xs text-indigo-400/70 font-mono tracking-tighter">
                            {formattedTime}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                        payment.status === "Active" 
                          ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" 
                          : "bg-rose-500/10 text-rose-400 ring-rose-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${payment.status === "Active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                        {payment.status}
                      </span>
                    </td>

                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
     
    </div>
  );
};

export default PaymentManagement;