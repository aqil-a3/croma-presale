import { ColumnDef } from "@tanstack/react-table";
import { PresaleDb } from "../interface";
import { StatusCell } from "./StatusCell";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";

export const adminPresaleColumns: ColumnDef<PresaleDb>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => <StatusCell row={row} /> ,
  },
  {
    accessorKey: "end_at",
    header: "End At",
    cell:({row}) => formatDateTimeUTC(row.original.end_at)
  },
  {
    accessorKey: "total_raised",
    header: "Total Raised",
    cell:({row}) => formatCurrency(row.original.total_raised)
  },
  {
    accessorKey: "target_raised",
    header: "Target Raised",
    cell:({row}) => formatCurrency(row.original.target_raised)
  },
  {
    accessorKey: "current_price_usd",
    header: "Current Price",
    cell:({row}) => formatCurrencyWithDecimals(row.original.current_price_usd)
  },
];
