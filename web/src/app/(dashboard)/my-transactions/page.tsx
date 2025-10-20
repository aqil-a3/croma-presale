import MyTransactionTemplate from "@/components/templates/dashboard/MyTransactionTemplate";
import { getWalletAuth } from "@/lib/auth/wallet";
import { apiInvestment } from "@/services/db/investment";
import { apiReferrals } from "@/services/db/referrals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Transactions",
};

export default async function MyTransactionPage() {
  const { address } = await getWalletAuth();
  const { getReferralBuyBonusByAddress } = apiReferrals;
  const { getAllTransactionByAddress } = apiInvestment;
  const [userTransactions, referralBonus] = await Promise.all([
    getAllTransactionByAddress(address.toLowerCase()),
    getReferralBuyBonusByAddress(address.toLowerCase()),
  ]);

  return (
    <MyTransactionTemplate
      userTransactions={userTransactions}
      referralBonus={referralBonus}
    />
  );
}
