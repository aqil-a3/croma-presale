import AdminPresaleTemplate from "@/components/templates/admin/AdminPresaleTemplate";
import { apiPresale } from "@/services/db/presale/index";
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

  const sortedPresales = [...presales].sort(
    (a, b) => new Date(a.end_at).getTime() - new Date(b.end_at).getTime()
  );

  return <AdminPresaleTemplate data={sortedPresales} />;
}
