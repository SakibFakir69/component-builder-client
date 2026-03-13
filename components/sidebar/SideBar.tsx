  "use client";

  import Link from "next/link";
  import React from "react";
  import { usePathname } from "next/navigation";
  import { 
    Home, 
    Users, 
    CreditCard, 
    LayoutDashboard, 
    Menu, 
    X, 
    ChevronLeft, 
    ChevronRight,
    LogOut,
    Settings
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

  interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    isMobileOpen: boolean;
    setIsMobileOpen: (value: boolean) => void;
  }

  export default function AdminSidebar({ 
    isOpen, 
    setIsOpen, 
    isMobileOpen, 
    setIsMobileOpen 
  }: SidebarProps) {
    const pathname = usePathname();

    return (
      <>
        {/* --- MOBILE TOGGLE BUTTON --- */}
        <div className="lg:hidden fixed top-4 left-4 z-[60]">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 bg-slate-900 text-emerald-500 rounded-lg border border-slate-700 shadow-xl active:scale-95 transition-transform"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- MOBILE OVERLY --- */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* --- SIDEBAR CONTAINER --- */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50
            bg-slate-950 border-r border-slate-800 text-slate-300
            transition-all duration-300 ease-in-out
            flex flex-col
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            ${isOpen ? "w-64" : "w-20"}
          `}
        >
          {/* --- HEADER / LOGO --- */}
          <div className="h-20 flex items-center px-5 mb-4 relative border-b border-slate-900">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="min-w-[40px] h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Home size={22} className="text-slate-950" />
              </div>
              {isOpen && (
                <span className="font-bold text-xl tracking-tight text-white whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-300">
                  Admin<span className="text-emerald-500">Pro</span>
                </span>
              )}
            </div>
            
            {/* Desktop Collapse Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-slate-800 border border-slate-700 rounded-full p-1.5 text-slate-400 hover:bg-emerald-500 hover:text-slate-950 transition-all z-10 shadow-lg"
            >
              {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>

          {/* --- NAVIGATION --- */}
          <nav className="flex-1 px-3 space-y-1.5 mt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
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
                    <span className="font-medium text-sm whitespace-nowrap animate-in fade-in duration-300">
                      {link.title}
                    </span>
                  )}

                  {/* Active Indicator Pip */}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full" />
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="absolute left-16 bg-slate-800 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-slate-700">
                      {link.title}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* --- FOOTER / USER PROFILE --- */}
          <div className="p-4 border-t border-slate-900 bg-slate-950/50">
            <div className={`
              flex items-center gap-3 p-2 rounded-2xl transition-colors
              ${isOpen ? "bg-slate-900/40 border border-slate-800/50" : "justify-center"}
            `}>
              <div className="min-w-[36px] h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-slate-900 shadow-inner">
                AD
              </div>
              {isOpen && (
                <div className="overflow-hidden flex-1 animate-in fade-in duration-300">
                  <p className="text-sm font-semibold text-white truncate text-left">Alex Dev</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold text-left">Super Admin</p>
                </div>
              )}
              {isOpen && (
                <button className="text-slate-500 hover:text-rose-500 transition-colors">
                    <LogOut size={16} />
                </button>
              )}
            </div>
          </div>
        </aside>
      </>
    );
  }