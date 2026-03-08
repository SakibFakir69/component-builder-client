// page route vs app route
"use client";

import LoadingStat from "@/components/admin/LoadingStat";
import { useGetSingleUserPaymentDetailsQuery } from "@/lib/api/baseApi";
import { useParams } from "next/navigation";


function UserPaymentDetails() {
  const params = useParams();

  const userId = params?.id;

  const { data, isLoading } = useGetSingleUserPaymentDetailsQuery(
    { userId },
    { skip: !userId },

  );
  console.log(data ,  ' data')

  if (isLoading) return <LoadingStat />;

  return (
    <div>
      <h1>User payment details</h1>
      {userId}
    </div>
  );
}

export default UserPaymentDetails;
