import AdminFAQTemplate from "@/components/templates/admin/AdminFAQTemplate";
import { apiFAQ } from "@/services/db/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

export default async function FAQPage() {
  const { getAllFAQ } = apiFAQ;

  const faqData = await getAllFAQ();
  return <AdminFAQTemplate data={faqData} />;
}
