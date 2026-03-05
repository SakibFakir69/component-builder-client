// page route vs app route
"use client";


import { useParams } from "next/navigation";


function UserPaymentDetails() {
  const userId = useParams();
  console.log(userId);

  return (
    <div>
        <h1>User payment details</h1>
      {userId && userId._id }
    
    </div>
  );
}

export default UserPaymentDetails;
