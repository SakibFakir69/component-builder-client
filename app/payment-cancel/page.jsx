"use client"

import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
      <p>You cancelled the payment.</p>
      <Link href={'/dashboard'}>Go Dashboard</Link>
    </div>
  );
}
