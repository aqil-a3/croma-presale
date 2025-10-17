"use client";

import { InvestmentDb } from "@/@types/investment";
import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { DataTable } from "@/components/organisms/data-table";
import { transactionColumns } from "@/featured/admin/transaction/components/columnDef";
import { AdminTransactionProvider } from "@/featured/admin/transaction/provider";

interface Props {
  data: InvestmentDb[];
}

export default function AdminTransactionTemplate({ data }: Props) {
  return (
    <AdminTransactionProvider transaction={data}>
      <AdminContainer>
        <TitleAndSub title="Transaction" sub="Manage Transaction" />
        <DataTable columns={transactionColumns} data={data} />
      </AdminContainer>
    </AdminTransactionProvider>
  );
}
