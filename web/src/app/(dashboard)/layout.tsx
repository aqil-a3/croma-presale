import type { Metadata } from "next";
import "../globals.css";
import { DashboardHeader } from "@/components/layout/header/dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/sidebar/dashboard";
import { Toaster } from "@/components/ui/sonner";
import { getWalletAuth } from "@/lib/auth/wallet";

export const metadata: Metadata = {
  title: {
    template: "%s | Cromachain Presale",
    default: "Cromachain Presale",
  },
  description:
    "The world's most advanced Layer 2 solution combining AI-powered development, quantum-resistant security, and lightning-fast performance.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAdmin } = await getWalletAuth({ requireAuth: true });

  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <SidebarProvider>
          <DashboardSidebar isAdmin={isAdmin} />
          <main className="w-full max-w-screen min-h-screen">
            <DashboardHeader />
            {children}
          </main>
          <Toaster position="top-center" richColors={true} />
        </SidebarProvider>
      </body>
    </html>
  );
}
