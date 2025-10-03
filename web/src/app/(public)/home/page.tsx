import HomeTemplate from "@/components/templates/public/HomeTemplate";
import { getCryptoData } from "@/services/crypto/getCryptoPrices";
import { apiFAQ } from "@/services/db/faq";
import { apiPresale } from "@/services/db/presale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const { getActivePresale } = apiPresale;
  const {getAllFAQ} = apiFAQ;

  const [cryptoData, activePresale, faqData] = await Promise.all([getCryptoData(), getActivePresale(), getAllFAQ()])

  return <HomeTemplate activePresale={activePresale} cryptoPrice={cryptoData} faqData={faqData} />;
}
