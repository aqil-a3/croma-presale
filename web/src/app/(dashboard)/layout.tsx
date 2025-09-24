import type { Metadata } from "next";
import "../globals.css";
import { DashboardHeader } from "@/components/layout/header/dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/sidebar/dashboard";
import { wagmiConfig } from "@/services/wagmi/wagmiConfig";
import { getAccount } from "@wagmi/core";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Cromachain Presale",
    default: "Cromachain Presale",
  },
  description:
    "The world's most advanced Layer 2 solution combining AI-powered development, quantum-resistant security, and lightning-fast performance.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isConnected } = getAccount(wagmiConfig);

  if (!isConnected) redirect("/home");
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <SidebarProvider>
          <DashboardSidebar />
          <main className="w-full overflow-hidden">
            <DashboardHeader />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
