"use client"

import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        
        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          No worries! Your transaction was cancelled and no charges were made. 
          You can return to your dashboard or try the checkout again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
         
          <Link 
            href="/dashboard" 
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-200 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        
      </div>
    </div>
  );
}