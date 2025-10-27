import { getWalletAuth } from "@/lib/auth/wallet";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AdminDashboardSidebar } from "@/components/layout/sidebar/admin";
import { getDashboardSession } from "@/services/auth/server.auth";
import { AdminHeader } from "@/components/layout/header/admin/AdminHeader";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Croma Presale",
    default: "Admin Croma Presale",
  },
  robots: {
    index: false,
  },
};

export const dynamic = "force-dynamic";
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = await getWalletAuth();
  const adminSession = await getDashboardSession();

  if (!isAdmin) return notFound();

  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <SidebarProvider>
          {adminSession && <AdminDashboardSidebar />}
          <main className="w-full max-w-screen min-h-screen">
            {adminSession && <AdminHeader />}
            {children}
          </main>
          <Toaster position="top-center" richColors={true} />
        </SidebarProvider>
      </body>
    </html>
  );
}
