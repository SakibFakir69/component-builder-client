"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  CreditCard, 
  LayoutDashboard, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

interface ILink {
  id: number;
  title: string;
  href: string;
  icon: React.ElementType; 
}

const navLinks: ILink[] = [
  { id: 0, title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { id: 1, title: "Users", href: "/admin/user", icon: Users },
  { id: 2, title: "Payments", href: "/admin/payment", icon: CreditCard },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true); 
  const [isMobileOpen, setIsMobileOpen] = useState(false); 
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
     
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobile}
          className="p-2 bg-slate-900 text-emerald-500 rounded-lg border border-slate-700 shadow-xl"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden "
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          bg-slate-950 border-r border-slate-800 text-slate-300
          transition-all duration-300 ease-in-out
          flex flex-col mt-10
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isOpen ? "w-64" : "w-20"}
        `}
      >
        {/* --- HEADER / LOGO --- */}
        <div className="h-20 flex items-center px-6 mb-4 relative">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-[40px] h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Home size={22} className="text-slate-950" />
            </div>
            {isOpen && (
              <span className="font-bold text-xl tracking-tight text-white whitespace-nowrap">
                Admin<span className="text-emerald-500">Pro</span>
              </span>
            )}
          </div>
          
          {/* Desktop Collapse Toggle */}
          <button 
            onClick={toggleSidebar}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-slate-800 border border-slate-700 rounded-full p-1 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
          >
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* --- NAVIGATION --- */}
        <nav className="flex-1 px-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.id}
                href={link.href}
                className={`
                  flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "hover:bg-slate-800/50 hover:text-white"
                  }
                `}
              >
                <div className={`
                  transition-transform duration-200 
                  ${isActive ? "scale-110" : "group-hover:scale-110"}
                `}>
                  <Icon size={22} />
                </div>

                {isOpen && (
                  <span className="font-medium text-sm whitespace-nowrap">
                    {link.title}
                  </span>
                )}

                {/* Active Indicator Pip */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full" />
                )}
                
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {link.title}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* --- FOOTER / USER PROFILE --- */}
        <div className="p-4 border-t border-slate-800/50">
          <div className={`
            flex items-center gap-3 p-2 rounded-2xl transition-colors
            ${isOpen ? "bg-slate-900/50" : "justify-center"}
          `}>
            <div className="min-w-[36px] h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-slate-900 shadow-inner">
              AD
            </div>
            {isOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">Alex Dev</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Super Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}