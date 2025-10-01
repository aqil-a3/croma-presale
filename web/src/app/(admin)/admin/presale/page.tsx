import AdminPresaleTemplate from "@/components/templates/admin/AdminPresaleTemplate";
import { apiPresale } from "@/featured/admin/presale/utils";
import { getDashboardSession } from "@/services/auth/server.auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Presale",
};

export default async function AdminPresalePage() {
  const dashboardSession = await getDashboardSession();
  const { getAllPresale } = apiPresale;

  if (!dashboardSession) redirect("/admin");
  const presales = await getAllPresale();

  return <AdminPresaleTemplate data={presales} />;
}
