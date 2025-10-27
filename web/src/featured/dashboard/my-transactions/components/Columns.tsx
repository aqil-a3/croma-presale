import { ColumnDef } from "@tanstack/react-table";
import { TransactionHistory } from "../interface";
import { Badge } from "@/components/ui/badge";
import { InvestmentPayStatus } from "@/@types/investment";
import { ReceiveCell } from "./ReceiveCell";

export const textColorStatus: Record<InvestmentPayStatus, string> = {
  waiting: "text-[#FAAD14]",        // kuning - menunggu pembayaran
  confirming: "text-[#1890FF]",     // biru - sedang dikonfirmasi blockchain
  confirmed: "text-[#2F54EB]",      // biru tua - sudah dikonfirmasi tapi belum dikirim
  sending: "text-[#13C2C2]",        // toska - sedang dikirim ke wallet
  partially_paid: "text-[#722ED1]", // ungu - sebagian terbayar
  finished: "text-[#16BA00]",       // hijau - transaksi selesai/success
  failed: "text-[#FF4D4F]",         // merah - gagal
  refunded: "text-[#A8071A]",       // merah tua - refund
  expired: "text-[#8C8C8C]",        // abu - expired
};

export const borderColorStatus: Record<InvestmentPayStatus, string> = {
  waiting: "border-[#FAAD14]",
  confirming: "border-[#1890FF]",
  confirmed: "border-[#2F54EB]",
  sending: "border-[#13C2C2]",
  partially_paid: "border-[#722ED1]",
  finished: "border-[#16BA00]",
  failed: "border-[#FF4D4F]",
  refunded: "border-[#A8071A]",
  expired: "border-[#8C8C8C]",
};


export const myTransactionColumns: ColumnDef<TransactionHistory>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "order_id",
    header: "Order Id",
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
    cell: ({ row }) => <ReceiveCell row={row} />
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
