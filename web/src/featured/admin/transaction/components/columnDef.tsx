import { InvestmentDb } from "@/@types/investment";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
import { formatNumber } from "@/utils/formatNumber";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionCellMenu } from "./TransactionCellMenu";

export const transactionColumns: ColumnDef<InvestmentDb>[] = [
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <TransactionCellMenu row={row} />,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => formatDateTimeUTC(row.original.created_at),
  },
  {
    accessorKey: "order_id",
    header: "Order ID",
  },
  {
    accessorKey: "wallet_address",
    header: "Wallet Address",
  },
  {
    accessorKey: "pay_amount",
    header: "Pay Amount",
  },
  {
    accessorKey: "pay_currency",
    header: "Pay Currency",
  },
  {
    accessorKey: "invested_usd",
    header: "Invested USD",
    cell: ({ row }) =>
      formatCurrencyWithDecimals(row.original.invested_usd, "USD", "en-US", 2),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
