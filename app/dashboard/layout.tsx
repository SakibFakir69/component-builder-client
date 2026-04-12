"use client";

import React, { useEffect } from "react";
import { IChildren } from "@/types";
import { useGetMeQuery } from "@/lib/api/baseApi";
import { useRouter } from "next/navigation";
import LoadingStat from "@/components/admin/LoadingStat";

function DashboardLayout({ children }: IChildren) {
  const router = useRouter();

  const { data: currentUser, isLoading } = useGetMeQuery(null);

  const info = currentUser?.data ;

  useEffect(() => {
  if (!isLoading && !info) return;

  if (!isLoading && info?.role !== "User") {
    router.replace("/"); 
  }
}, [info, isLoading, router])


   if (isLoading) return <LoadingStat />;



  return <div>{children}</div>;
}

export default DashboardLayout;