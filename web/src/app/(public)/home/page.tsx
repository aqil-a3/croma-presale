import { PaymentSettingValue, SettingAdminDb } from "@/@types/setting-admin";
import HomeTemplate from "@/components/templates/public/HomeTemplate";
import { getCryptoData } from "@/services/crypto/getCryptoPrices";
import { apiFAQ } from "@/services/db/faq";
import { apiPresale } from "@/services/db/presale";
import { apiSiteSettings } from "@/services/db/site-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const { getActivePresale } = apiPresale;
  const { getAllFAQ } = apiFAQ;
  const { getAllSiteSettings } = apiSiteSettings;

  const [cryptoData, activePresale, faqData, siteSettings] = await Promise.all([
    getCryptoData(),
    getActivePresale(),
    getAllFAQ(),
    getAllSiteSettings(),
  ]);

  const paymentMethods = siteSettings.find(
    (setting) => setting.key === "payment_methods"
  ) as SettingAdminDb<PaymentSettingValue>;

  return (
    <HomeTemplate
      activePresale={activePresale}
      cryptoPrice={cryptoData}
      faqData={faqData}
      paymentMethods={paymentMethods.value}
    />
  );
}
