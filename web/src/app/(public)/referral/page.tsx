import ReferralTemplate from "@/components/templates/public/ReferralTemplate";
import { getWalletAuth } from "@/lib/auth/wallet";
import { apiReferrals } from "@/services/db/referrals";
import { apiSiteSettings } from "@/services/db/site-settings";
import { apiUser } from "@/services/db/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral",
};

export default async function ReferralPage() {
  const { address } = await getWalletAuth();

  const { getUserByAddress, getUserStatisticByAddress } = apiUser;
  const { getReferralAverageBuyAmount } = apiSiteSettings;
  const { getNewestReferrals } = apiReferrals;

  const [userData, referralBuyAverage, userStatistic, referrals] =
    await Promise.all([
      getUserByAddress(address.toLowerCase()),
      getReferralAverageBuyAmount(),
      getUserStatisticByAddress(address.toLowerCase()),
      getNewestReferrals(),
    ]);

  return (
    <ReferralTemplate
      userData={userData}
      referralBuyAverage={referralBuyAverage}
      userStatistic={userStatistic}
      referrals={referrals}
    />
  );
}
