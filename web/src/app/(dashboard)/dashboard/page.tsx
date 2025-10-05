import DashboardTemplate from "@/components/templates/dashboard/DashboardTemplate";
import { getWalletAuth } from "@/lib/auth/wallet";
import { getCryptoData } from "@/services/crypto/getCryptoPrices";
import { apiInvestment } from "@/services/db/investment";
import { apiPresale } from "@/services/db/presale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { getActivePresale } = apiPresale;
  const { getInvestmentSummary } = apiInvestment;
  const { address } = await getWalletAuth();
  const [cryptoData, activePresale, investSummary] = await Promise.all([
    getCryptoData(),
    getActivePresale(),
    getInvestmentSummary(address.toLowerCase()),
  ]);

  return (
    <DashboardTemplate activePresale={activePresale} cryptoPrice={cryptoData} investment={investSummary} />
  );
}
