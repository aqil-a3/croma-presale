import { ColumnDef } from "@tanstack/react-table";
import { TransactionHistory } from "../interface";
import { formatNumber } from "@/utils/formatNumber";
import { Badge } from "@/components/ui/badge";

export const textColorStatus: Record<TransactionHistory["status"], string> = {
  failed: "text-[#FF4D4F]",
  waiting: "text-[#FAAD14]",
  success: "text-[#16BA00]",
  expired: "text-[#8C8C8C]",
};

export const borderColorStatus: Record<TransactionHistory["status"], string> = {
  failed: "border-[#FF4D4F]",
  waiting: "border-[#FAAD14]",
  success: "border-[#16BA00]",
  expired: "border-[#8C8C8C]",
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
