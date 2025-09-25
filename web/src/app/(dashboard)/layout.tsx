import type { Metadata } from "next";
import "../globals.css";
import { DashboardHeader } from "@/components/layout/header/dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/sidebar/dashboard";

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
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <SidebarProvider>
          <DashboardSidebar />
          <main className="w-full min-h-screen overflow-hidden">
            <DashboardHeader />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
