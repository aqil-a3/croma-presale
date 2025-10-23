"use client";

import { InvestmentDb } from "@/@types/investment";
import { RefreshButton } from "@/components/atoms/buttons/RefreshButton";
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
      <AdminContainer className="space-y-4">
        <TitleAndSub title="Transaction" sub="Manage Transaction" />
        <div>
          <RefreshButton />
        </div>
        <DataTable columns={transactionColumns} data={data} />
      </AdminContainer>
    </AdminTransactionProvider>
  );
}
