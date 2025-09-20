import { TopBuyerWithRanks } from "@/@types/user";
import { fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { shortenAddress } from "@/utils/shortenAddress";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TopBuyerWithRanks>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      const data = row.original;
      const isNotBold = data.rank > 3;

      return (
        <p
          className={cn(
            `${fontPoppins.className} font-bold`,
            isNotBold && "font-medium"
          )}
        >
          #{row.original.rank}
        </p>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "smartContract",
    header: "Smart Contract",
    cell: ({ row }) => shortenAddress(row.original.smartContract),
  },
  {
    accessorKey: "totalPurchased",
    header: "Total Purchased",
    cell: ({ row }) => {
      const isNotGradient = row.original.rank < 4;
      return (
        <p className={cn(`${mainGradientFont} font-bold`, isNotGradient && "text-white font-medium")}>
          {formatCurrency(row.original.totalPurchased)}
        </p>
      );
    },
  },
];
