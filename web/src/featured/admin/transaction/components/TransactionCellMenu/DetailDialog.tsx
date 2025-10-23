"use client";

import { InvestmentDb } from "@/@types/investment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function DetailDialog({ data }: { data: InvestmentDb }) {
  const statusColor: Record<string, string> = {
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
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left px-2 py-1 hover:bg-orange-500/10 text-orange-400">
          View Details
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-black text-white border-orange-500">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-orange-400">
            Transaction Details
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Complete information for order <strong>{data.order_id}</strong>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] mt-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Wallet Address</span>
              <span className="font-mono text-orange-400">
                {data.wallet_address}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Pay Currency</span>
              <span>{data.pay_currency.toUpperCase()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Pay Amount</span>
              <span className="text-orange-300 font-semibold">
                {data.pay_amount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Invested (USD)</span>
              <span className="text-green-400 font-semibold">
                {formatCurrencyWithDecimals(data.invested_usd, "USD", "en-US", 2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Receive (CRM)</span>
              <span>{data.crm_amount.toFixed(3)} CRM</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Network</span>
              <span className="uppercase">{data.network}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Stage</span>
              <span>{data.stage}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Phase</span>
              <span>{data.phase}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Created At</span>
              <span>{formatDateTimeUTC(data.created_at)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Updated At</span>
              <span>{formatDateTimeUTC(data.updated_at)}</span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-white/60">Status</span>
              <Badge
                variant="outline"
                className={cn(
                  "px-3 py-1 text-xs capitalize",
                  statusColor[data.status] || "bg-gray-700 text-gray-300"
                )}
              >
                {data.status.replace("_", " ")}
              </Badge>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
