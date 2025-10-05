import { ColumnDef } from "@tanstack/react-table";
import { PresaleDb } from "../interface";
import { StatusCell } from "./StatusCell";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { DropdownMenuCell } from "./DropdownCell";

export const adminPresaleColumns: ColumnDef<PresaleDb>[] = [
  {
    accessorKey: "action",
    header: "ACtions",
    cell: ({ row }) => <DropdownMenuCell row={row} />,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell:({row}) => `Stage ${row.original.stage} - Phase ${row.original.phase}`
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    accessorKey: "end_at",
    header: "End At",
    cell: ({ row }) => formatDateTimeUTC(row.original.end_at),
  },
  {
    accessorKey: "total_raised",
    header: "Total Raised",
    cell: ({ row }) => formatCurrency(row.original.total_raised),
  },
  {
    accessorKey: "target_raised",
    header: "Target Raised",
    cell: ({ row }) => formatCurrency(row.original.target_raised),
  },
  {
    accessorKey: "current_price_usd",
    header: "Current Price",
    cell: ({ row }) =>
      formatCurrencyWithDecimals(row.original.current_price_usd),
  },
  {
    accessorKey: "next_price_usd",
    header: "Next Price",
    cell: ({ row }) => formatCurrencyWithDecimals(row.original.next_price_usd),
  },
];
