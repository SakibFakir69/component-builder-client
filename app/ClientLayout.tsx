"use client";

import { usePathname } from "next/navigation";
import ReduxProvider from "./ReduxProvider";

import MenuBar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <ReduxProvider>
      {!isDashboard && <MenuBar />}
      {children}
      {!isDashboard && <Footer />}
    </ReduxProvider>
  );
}
