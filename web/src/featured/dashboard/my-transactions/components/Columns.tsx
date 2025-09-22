import { ColumnDef } from "@tanstack/react-table";
import { TransactionHistory } from "../interface";
import { formatNumber } from "@/utils/formatNumber";
import { Badge } from "@/components/ui/badge";

export const textColorStatus: Record<TransactionHistory["status"], string> = {
  Failed: "text-[#FF4D4F]", //
  Pending: "text-[#FAAD14]",
  Success: "text-[#16BA00]",
};

export const borderColorStatus: Record<TransactionHistory["status"], string> = {
  Failed: "border-[#FF4D4F]",
  Pending: "border-[#FAAD14]",
  Success: "border-[#16BA00]",
};

export const myTransactionColumns: ColumnDef<TransactionHistory>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "pay",
    header: "Pay",
    cell: ({ row }) => {
      const amount = row.original.pay.amount;
      const currency = row.original.pay.currency;
      return `${amount} ${currency}`;
    },
  },
  {
    accessorKey: "receive",
    header: "Receive",
    cell: ({ row }) => {
      const amount = row.original.receive.amount;
      const currency = row.original.receive.currency;
      return `${formatNumber(amount)} ${currency}`;
    },
  },
  {
    accessorKey: "batch",
    header: "Batch",
    cell: ({ row }) => {
      const stage = row.original.batch.stage;
      const phase = row.original.batch.phase;
      return `Batch ${stage} - Phase ${phase}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          className={`backdrop-blur-md ${textColorStatus[status]} ${borderColorStatus[status]}`}
          variant={"outline"}
        >
          {status}
        </Badge>
      );
    },
  },
];
