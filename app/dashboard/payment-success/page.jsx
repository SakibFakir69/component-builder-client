"use client";

import { Suspense } from "react";
import SuccessPage from '../../../components/payment/payment-success'

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SuccessPage/>
      
    </Suspense>
  );
}
