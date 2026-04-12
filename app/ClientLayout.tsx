"use client";
import { usePathname } from "next/navigation";
import ReduxProvider from "./ReduxProvider";
import MenuBar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];

  const isHiddenLayout =
    segment === "dashboard" || segment === "admin" || segment === "auth";

  return (
    <ReduxProvider>
      {!isHiddenLayout && <MenuBar />}
      {children}
      {!isHiddenLayout && <Footer />}
    </ReduxProvider>
  );
}
