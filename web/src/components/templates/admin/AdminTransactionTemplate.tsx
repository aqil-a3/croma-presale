"use client";

import { InvestmentDb } from "@/@types/investment";
import { RefreshButton } from "@/components/atoms/buttons/RefreshButton";
import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { DataTable } from "@/components/organisms/data-table";
import { transactionColumns } from "@/featured/admin/transaction/components/columnDef";
import { SearchData } from "@/featured/admin/transaction/components/Controllers/SearchData";
import {
  AdminTransactionProvider,
  useAdminTransactionContext,
} from "@/featured/admin/transaction/provider";
import { BadgeCent, Wallet } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  data: InvestmentDb[];
}

export default function AdminTransactionTemplate({ data }: Props) {
  return (
    <AdminTransactionProvider transaction={data}>
      <InnerTemplate />
    </AdminTransactionProvider>
  );
}

const InnerTemplate = () => {
  const { trxData } = useAdminTransactionContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPage(currentPage);
    setIsLoading(false); // selesai loading setelah server render data baru
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setIsLoading(true); // tampilkan indikator loading
    router.replace(`/admin/transaction?page=${newPage}`);
  };

  return (
    <AdminContainer className="space-y-4">
      <TitleAndSub title="Transaction" sub="Manage Transaction" />

      {/* 🔍 Controllers */}
      <div className="flex gap-4">
        <RefreshButton />
        <SearchData
          apiRoute={`/api/investment/address`}
          TriggerIcon={Wallet}
          inputId="search-by-wallet"
          label="Search By Wallet"
        />
        <SearchData
          apiRoute={`/api/investment/order`}
          TriggerIcon={BadgeCent}
          inputId="search-by-order-id"
          label="Search By Order Id"
        />
      </div>

      {/* 📊 Table or Loader */}
      {isLoading ? (
        <div className="text-center text-white/60 py-10 italic">
          Loading transactions...
        </div>
      ) : (
        <DataTable columns={transactionColumns} data={trxData} />
      )}

      {/* 📄 Pagination Controls */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1 || isLoading}
          className="px-4 py-2 rounded-lg border border-orange-500 text-orange-400 hover:bg-orange-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <span className="text-white/70 text-sm">
          Page <span className="font-semibold text-orange-400">{page}</span>
        </span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg border border-orange-500 text-orange-400 hover:bg-orange-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </AdminContainer>
  );
};
