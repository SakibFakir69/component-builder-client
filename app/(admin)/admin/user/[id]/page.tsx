// page route vs app route
"use client";

import { IChildren } from "@/types";
import { useParams } from "next/navigation";
import React from "react";

interface IParams {
  userId: string;
}

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
