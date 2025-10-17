import AdminTransactionTemplate from "@/components/templates/admin/AdminTransactionTemplate";
import { apiInvestment } from "@/services/db/investment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction",
};

export default async function AdminTransactionPage() {
  const { getAllTransactions } = apiInvestment;
  const data = await getAllTransactions({ from: 0, to: 100 });

  return <AdminTransactionTemplate data={data} />;
}
