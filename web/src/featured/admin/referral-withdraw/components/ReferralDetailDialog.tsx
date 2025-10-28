"use client";

import { useState } from "react";
import { ReferralWithdrawRequestDb, ReferralRewardsDB } from "@/@types/referrals";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Copy, Wallet, Users } from "lucide-react";
import { mockReferralRewards } from "../dummy";

interface ReferralDetailDialogProps {
  withdraw: ReferralWithdrawRequestDb;
}

export function ReferralDetailDialog({ withdraw }: ReferralDetailDialogProps) {
  const [open, setOpen] = useState(false);

  const relatedRewards: ReferralRewardsDB[] = mockReferralRewards.filter(
    (r) => r.referrer_id === withdraw.user_id
  );

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "-";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Users className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg sm:max-w-2xl bg-[#0A0A0A]/95 text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle>Referral Detail</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Wallet Info */}
          <div className="rounded-lg border border-gray-700 p-3 bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="font-semibold text-sm">Wallet Information</span>
              </div>
              <Badge
                variant="outline"
                className={`capitalize ${
                  withdraw.status === "success"
                    ? "text-green-400 border-green-400/30"
                    : withdraw.status === "pending"
                    ? "text-yellow-400 border-yellow-400/30"
                    : "text-red-400 border-red-400/30"
                }`}
              >
                {withdraw.status}
              </Badge>
            </div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Wallet:</span>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(withdraw.wallet_address);
                    toast.success("Wallet copied!");
                  }}
                  className="flex items-center gap-1 hover:underline"
                >
                  {withdraw.wallet_address.slice(0, 8)}...{withdraw.wallet_address.slice(-6)}
                  <Copy className="h-3 w-3 opacity-60" />
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span>{withdraw.amount.toLocaleString()} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Created:</span>
                <span>{formatDate(withdraw.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reviewed:</span>
                <span>{formatDate(withdraw.reviewed_at)}</span>
              </div>
              {withdraw.tx_hash && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Tx Hash:</span>
                  <a
                    href={`https://etherscan.io/tx/${withdraw.tx_hash}`}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    {withdraw.tx_hash.slice(0, 10)}...
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Referral List */}
          <div className="rounded-lg border border-gray-700 p-3 bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4" />
              <span className="font-semibold text-sm">
                Invited Referrals ({relatedRewards.length})
              </span>
            </div>

            {relatedRewards.length === 0 ? (
              <p className="text-gray-400 text-sm">No referrals found.</p>
            ) : (
              <ScrollArea className="max-h-56">
                <ul className="space-y-2 text-sm">
                  {relatedRewards.map((r) => (
                    <li
                      key={r.id}
                      className="flex justify-between items-center bg-white/10 rounded-md px-3 py-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{r.referral_id}</span>
                        <span className="text-gray-400 text-xs">
                          Bonus: {r.bonus_amount} USDT
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          r.claimed
                            ? "text-green-400 border-green-400/30"
                            : "text-yellow-400 border-yellow-400/30"
                        }`}
                      >
                        {r.claimed ? "Claimed" : "Unclaimed"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
