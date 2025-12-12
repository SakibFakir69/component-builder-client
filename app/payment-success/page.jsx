'use client'
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  const params = useSearchParams();
  const session_id = params.get("session_id");
  const [msg, setMsg] = useState("Confirming payment...");

  useEffect(() => {
    const confirm = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/v1/payment/confirm-payment", {
          sessionId: session_id
        });

        setMsg("Payment successful! 🎉");
      } catch {
        setMsg("Failed to confirm payment.");
      }
    };
    if (session_id) confirm();
  }, [session_id]);

  return (
    <div className="p-10 text-center">
      <h1>{msg}</h1>
      
    </div>
  );
}
