import { PaymentSettingValue, SettingAdminDb } from "@/@types/setting-admin";
import DashboardTemplate from "@/components/templates/dashboard/DashboardTemplate";
import { getWalletAuth } from "@/lib/auth/wallet";
import { getCryptoData } from "@/services/crypto/getCryptoPrices";
import { apiInvestment } from "@/services/db/investment";
import { apiPresale } from "@/services/db/presale";
import { apiReferrals } from "@/services/db/referrals";
import { apiSiteSettings } from "@/services/db/site-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { getActivePresale } = apiPresale;
  const { getInvestmentSummary } = apiInvestment;
  const { getReferralRewardById } = apiReferrals;
  const { getAllSiteSettings } = apiSiteSettings;

  const { address } = await getWalletAuth();
  const [
    cryptoData,
    activePresale,
    investSummary,
    siteSettings,
    referralReward,
  ] = await Promise.all([
    getCryptoData(),
    getActivePresale(),
    getInvestmentSummary(address.toLowerCase()),
    getAllSiteSettings(),
    getReferralRewardById(address.toLowerCase()),
  ]);

  const paymentMethods = siteSettings.find(
    (setting) => setting.key === "payment_methods"
  ) as SettingAdminDb<PaymentSettingValue>;

  return (
    <DashboardTemplate
      activePresale={activePresale}
      cryptoPrice={cryptoData}
      investment={investSummary}
      paymentMethods={paymentMethods.value}
      referralRewards={referralReward}
    />
  );
}
