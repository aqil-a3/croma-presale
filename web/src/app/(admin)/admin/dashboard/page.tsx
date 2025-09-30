import { getDashboardSession } from "@/services/auth/server.auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const dashboardSession = await getDashboardSession();

  if (!dashboardSession) redirect("/admin");
  return <div>Admin Dashboard</div>;
}
