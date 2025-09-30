import { getWalletAuth } from "@/lib/auth/wallet";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Croma Presale",
    default: "Admin Croma Presale",
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = await getWalletAuth();

  if (!isAdmin) return notFound();

  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}
