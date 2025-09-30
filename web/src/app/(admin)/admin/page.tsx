import AdminVerifyTemplate from "@/components/templates/admin/AdminVerifyTemplate";
import { getDashboardSession } from "@/services/auth/server.auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify Action",
};

export default async function AdminPage() {
  const dashboardSession = await getDashboardSession();

  if (dashboardSession) redirect("/admin/dashboard");
  return <AdminVerifyTemplate />;
}
