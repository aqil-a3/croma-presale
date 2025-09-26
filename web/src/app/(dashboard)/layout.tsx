import type { Metadata } from "next";
import "../globals.css";
import { DashboardHeader } from "@/components/layout/header/dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/sidebar/dashboard";
import { cookies } from "next/headers";
import { WagmiCookie } from "@/@types/wagmi";
import { redirect } from "next/navigation";

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
  const cookieStore = await cookies();
  const wagmiStore = cookieStore.get("croma_presale_wallet_connect.store");

  let isConnected = false;
  if (wagmiStore?.value) {
    try {
      const parsed = JSON.parse(wagmiStore.value) as WagmiCookie;
      isConnected =
        parsed.state.connections.value.length > 0 && !!parsed.state.current;
    } catch (e) {
      console.error("Failed to parse croma_presale_wallet_connect.store:", e);
    }
  }

  if (!isConnected) {
    redirect("/home?error=must-login");
  }

  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <SidebarProvider>
          <DashboardSidebar />
          <main className="w-full max-w-screen min-h-screen">
            <DashboardHeader />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
