"use client";
import { InvestmentDb } from "@/@types/investment";
import { Decor } from "@/components/atoms/Decor";
import { HorizontalFireImage } from "@/components/atoms/image-decorations/HorizontalFireImage";
import { Separator } from "@/components/ui/separator";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { myTransactionColumns } from "@/featured/dashboard/my-transactions/components/Columns";
import { DataTable } from "@/featured/dashboard/my-transactions/components/DataTable";
import { FilterButton } from "@/featured/dashboard/my-transactions/components/FilterButton";
import { SearchInput } from "@/featured/dashboard/my-transactions/components/SearchInput";
import { mapToTransactionHistory } from "@/featured/dashboard/my-transactions/mapper";
import { MyTransactionProvider } from "@/featured/dashboard/my-transactions/provider";

interface Props {
  userTransactions: InvestmentDb[];
}

export default function MyTransactionTemplate({ userTransactions }: Props) {
  const tableData = userTransactions.map(mapToTransactionHistory)
  
  return (
    <MyTransactionProvider userTransactions={userTransactions}>
      <div className="space-y-4 relative px-2 lg:px-12 py-24 min-h-screen h-full bg-black text-white overflow-x-hidden">
        <Decor
          width={812}
          height={812}
          className="top-0 right-0 translate-x-[40%] -translate-y-[40%]"
        />
        <HorizontalFireImage className="inset-0 bg-cover bg-top bg-fixed opacity-50" />

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
          <DataTable columns={myTransactionColumns} data={tableData} />
        </div>
      </div>
    </MyTransactionProvider>
  );
}
