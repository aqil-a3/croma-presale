import AdminTransactionTemplate from "@/components/templates/admin/AdminTransactionTemplate";
import { apiInvestment } from "@/services/db/investment";
import { AdminInvestmentQuery } from "@/services/db/investment/getTransactions";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Transaction",
};

export default async function AdminTransactionPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1; // default page = 1
  const limit = 100;

  const query: AdminInvestmentQuery = {
    from: (pageNumber - 1) * limit + 1,
    to: pageNumber * limit,
  };

  const { getAllTransactions } = apiInvestment;
  const data = await getAllTransactions(query);

  return <AdminTransactionTemplate data={data} />;
}
