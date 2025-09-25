"use client";
import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { Separator } from "@/components/ui/separator";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { myTransactionColumns } from "@/featured/dashboard/my-transactions/components/Columns";
import { DataTable } from "@/featured/dashboard/my-transactions/components/DataTable";
import { FilterButton } from "@/featured/dashboard/my-transactions/components/FilterButton";
import { SearchInput } from "@/featured/dashboard/my-transactions/components/SearchInput";
import { dummyTransactions } from "@/featured/dashboard/my-transactions/dummy";

export default function MyTransactionTemplate() {
  return (
    <DashboardContainer className="space-y-4">
      <h1
        className={`${fontOrbitron.className} text-white text-xl lg:text-3xl font-semibold z-10 relative`}
      >
        My Transactions
      </h1>
      <div
        style={{ background: PANEL_BG }}
        className="backdrop-blur-xl border pver border-gray-600 p-4 rounded-2xl space-y-4 w-full"
      >
        <p
          className={`${fontPoppins.className} font-bold text-lg lg:text-2xl text-[#FFFFFFCC]`}
        >
          All Transaction
        </p>
        <Separator className="bg-slate-600" />
        <div className="lg:flex lg:flex-row flex-col justify-between items-center gap-4">
          <FilterButton />
          <SearchInput />
        </div>
        {/* TODO : PR TABELNYA. SEMENTARA BEGINI. MASIH BELUM BEST PRACTICE */}
        <DataTable columns={myTransactionColumns} data={dummyTransactions} />
      </div>
    </DashboardContainer>
  );
}
