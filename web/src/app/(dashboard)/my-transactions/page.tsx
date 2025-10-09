import MyTransactionTemplate from "@/components/templates/dashboard/MyTransactionTemplate";
import { getWalletAuth } from "@/lib/auth/wallet";
import { getAllTransactionByAddress } from "@/services/db/investment/getAllTransactionByAddress";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Transactions",
};

export default async function MyTransactionPage() {
  const { address } = await getWalletAuth();
  const userTransactions = await getAllTransactionByAddress(
    address.toLowerCase()
  );

  return <MyTransactionTemplate userTransactions={userTransactions} />;
}
