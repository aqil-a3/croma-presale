import AdminFAQTemplate from "@/components/templates/admin/AdminFAQTemplate";
import { getDashboardSession } from "@/services/auth/server.auth";
import { apiFAQ } from "@/services/db/faq";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "FAQ",
};

export default async function FAQPage() {
  const { getAllFAQ } = apiFAQ;
  const dashboardSession = await getDashboardSession();

  if (!dashboardSession) redirect("/admin");

  const faqData = await getAllFAQ();
  return <AdminFAQTemplate data={faqData} />;
}
