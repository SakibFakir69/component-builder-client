"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const session_id = params.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" >(
    "loading"
  );
  const [ isPaymentDone , setIsPaymentDone ] = useState(false);

  useEffect(() => {

  

    const confirm = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/v1/payment/confirm-payment",
          {
            sessionId: session_id,
          }
        );

        setStatus("success");
        setIsPaymentDone(true);
      } catch(error) {
        console.log(error);
        
      }
    };

    if (session_id) confirm();
  }, [session_id]);
  console.log(status , 'payment status');

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">

        {status === "loading" && (
          <>
            <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-black rounded-full mx-auto mb-6"></div>
            <h1 className="text-lg font-medium">Confirming your payment...</h1>
          </>
        )}

        {status === "success" && isPaymentDone && (
          <>
            <div className="text-green-500 text-5xl mb-4">✔</div>
            <h1 className="text-2xl font-semibold mb-2">
              Payment Successful
            </h1>
            <p className="text-gray-500 mb-6">
              Your payment has been confirmed.
            </p>

            <button
              onClick={() => router.push("/dashboard")}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Go to Dashboard
            </button>
          </>
        )}

      
      </div>
    </div>
  );
}