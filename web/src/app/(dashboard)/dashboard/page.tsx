import DashboardTemplate from "@/components/templates/dashboard/DashboardTemplate";
import { getCryptoData } from "@/services/crypto/getCryptoPrices";
import { apiPresale } from "@/services/db/presale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { getActivePresale } = apiPresale;
    const cryptoData = await getCryptoData();
  
    const activePresale = await getActivePresale();

  return <DashboardTemplate activePresale={activePresale} cryptoPrice={cryptoData} />
}
