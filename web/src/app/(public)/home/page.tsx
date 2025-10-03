import HomeTemplate from "@/components/templates/public/HomeTemplate";
import { getCryptoData } from "@/services/crypto/getCryptoPrices";
import { apiPresale } from "@/services/db/presale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const { getActivePresale } = apiPresale;
  const cryptoData = await getCryptoData();

  const activePresale = await getActivePresale();

  return <HomeTemplate activePresale={activePresale} cryptoPrice={cryptoData} />;
}
