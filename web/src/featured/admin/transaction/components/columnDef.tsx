import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TransactionCellMenu } from "./TransactionCellMenu";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
import { cn } from "@/lib/utils";
import { InvestmentDb } from "@/@types/investment";

export const transactionColumns: ColumnDef<InvestmentDb>[] = [
  // ACTIONS
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <TransactionCellMenu row={row} />,
    enableSorting: false,
  },

  // DATE
  {
    accessorKey: "created_at",
    header: "DATE",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateTimeUTC(row.original.created_at)}
      </span>
    ),
  },

  // ORDER ID
  {
    accessorKey: "order_id",
    header: "ORDER ID",
    cell: ({ row }) => (
      <span className="font-medium text-white/90">
        {row.original.order_id || "-"}
      </span>
    ),
  },

  // WALLET
  {
    accessorKey: "wallet_address",
    header: "WALLET",
    cell: ({ row }) => {
      const addr = row.original.wallet_address;
      const shortAddr = `${addr.slice(0, 6)}...${addr.slice(-4)}`;
      return <code className="text-orange-400">{shortAddr}</code>;
    },
  },

  // PAY AMOUNT
  {
    accessorKey: "pay_amount",
    header: "PAY AMOUNT",
    cell: ({ row }) => (
      <span className="font-semibold text-orange-300">
        {row.original.pay_amount.toFixed(4)}
      </span>
    ),
  },

  // PAY CURRENCY
  {
    accessorKey: "pay_currency",
    header: "CURRENCY",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="border-orange-500/40 text-orange-400 bg-orange-500/10 capitalize"
      >
        {row.original.pay_currency.toUpperCase()}
      </Badge>
    ),
  },

  // INVESTED USD
  {
    accessorKey: "invested_usd",
    header: "INVESTED (USD)",
    cell: ({ row }) => (
      <span className="font-semibold text-green-400">
        {formatCurrencyWithDecimals(
          row.original.invested_usd,
          "USD",
          "en-US",
          2
        )}
      </span>
    ),
  },

  // STATUS
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.original.status;
      const colorMap: Record<string, string> = {
        waiting: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        confirming: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        sending: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        partially_paid: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        finished: "bg-green-500/20 text-green-400 border-green-500/30",
        failed: "bg-red-500/20 text-red-400 border-red-500/30",
        refunded: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        expired: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      };
      return (
        <Badge
          variant="outline"
          className={cn(
            "px-2 py-1 capitalize text-xs font-medium",
            colorMap[status] || "bg-gray-700/30 text-gray-300"
          )}
        >
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
];
