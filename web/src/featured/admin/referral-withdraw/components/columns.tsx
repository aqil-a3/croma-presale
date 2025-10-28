"use client";

import { ReferralWithdrawRequestDb } from "@/@types/referrals";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, EllipsisVertical, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { ReferralStatusCell } from "./ReferralStatusCell";
import { ReferralDetailDialog } from "./ReferralDetailDialog";

function formatDate(dateString?: string) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number) {
  return `${amount.toLocaleString()} USDT`;
}

export const referralWithdrawColumns: ColumnDef<ReferralWithdrawRequestDb>[] = [
  {
    accessorKey: "wallet_address",
    header: "Wallet Address",
    cell: ({ row }) => {
      const address = row.getValue("wallet_address") as string;
      const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
      return (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{short}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={async () => {
              await navigator.clipboard.writeText(address);
              toast.success("Wallet address copied!");
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-semibold text-white/90">
        {formatAmount(row.getValue("amount"))}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <ReferralStatusCell
        id={row.original.id}
        initialStatus={row.original.status}
      />
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-white/70 text-sm">
        {formatDate(row.getValue("created_at"))}
      </span>
    ),
  },
  {
    accessorKey: "reviewed_at",
    header: "Reviewed",
    cell: ({ row }) => (
      <span className="text-white/70 text-sm">
        {formatDate(row.getValue("reviewed_at"))}
      </span>
    ),
  },
  {
  id: "actions",
  header: "",
  cell: ({ row }) => {
    const txHash = row.original.tx_hash;
    const address = row.original.wallet_address;
    const withdraw = row.original;

    return (
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={async () => {
                await navigator.clipboard.writeText(address);
                toast.success("Wallet copied!");
              }}
            >
              <Copy className="h-3 w-3 mr-2" />
              Copy Address
            </DropdownMenuItem>
            {txHash && (
              <DropdownMenuItem
                onClick={() =>
                  window.open(
                    `https://etherscan.io/tx/${txHash}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                View Tx
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ReferralDetailDialog withdraw={withdraw} />
      </div>
    );
  },
},

];
