import AdminSettingTemplate from "@/components/templates/admin/AdminSettingTemplate";
import { getDashboardSession } from "@/services/auth/server.auth";
import { apiSiteSettings } from "@/services/db/site-settings";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function AdminSettingPage() {
  const adminSession = await getDashboardSession();
  const { getAllSiteSettings } = apiSiteSettings;
  if (!adminSession) return notFound();

  const allSettings = await getAllSiteSettings();
  return <AdminSettingTemplate settings={allSettings} />;
}
