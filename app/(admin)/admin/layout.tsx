"use client"
import AdminSidebar from "@/components/sidebar/SideBar";
import AdminDashBoardSideBar from "@/components/sidebar/SideBar";
import { IChildren } from "@/types";
import { useState } from "react";



function AdminLayouts({ children }: IChildren) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      
      <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden lg:block border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
       <AdminSidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen}
      />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="container mx-auto p-4 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayouts;