
"use client"
import AdminDashBoardSideBar from "@/components/sidebar/SideBar";
import { IChildren } from "@/types";
import { usePathname } from "next/navigation";
import React from "react";

function AdminLayouts({ children }: IChildren) {

  const path = usePathname();
  console.log(path , 'path');


  return (
    <div>
      <aside>
        <AdminDashBoardSideBar />
      </aside>

      {/* side bar */}

      <main className="px-36">{children}</main>

    </div>
  );
}

export default AdminLayouts;
