// "use client";

// import { InvestmentDb } from "@/@types/investment";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
// import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import axios from "axios";

// export function DetailDialog({ data }: { data: InvestmentDb }) {
//   const statusColor: Record<string, string> = {
//     waiting: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//     confirming: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//     confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
//     sending: "bg-purple-500/20 text-purple-400 border-purple-500/30",
//     partially_paid: "bg-orange-500/20 text-orange-400 border-orange-500/30",
//     finished: "bg-green-500/20 text-green-400 border-green-500/30",
//     failed: "bg-red-500/20 text-red-400 border-red-500/30",
//     refunded: "bg-gray-500/20 text-gray-400 border-gray-500/30",
//     expired: "bg-gray-500/20 text-gray-400 border-gray-500/30",
//   };

//   const getNowpaymentsStatus = async () => {
//     try {
//       const {data:resData} = await axios.get("/api/payments/status", {
//         params: {
//           payment_id: data.order_id?.toString(),
//         },
//       });
      
//       console.log(resData)
//     } catch (error) {
//       console.error(error);
//       toast.error("Something wrong");
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button className="w-full text-left px-2 py-1 hover:bg-orange-500/10 text-orange-400">
//           View Details
//         </button>
//       </DialogTrigger>
//       <DialogContent className="max-w-lg bg-black text-white border-orange-500">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-semibold text-orange-400">
//             Transaction Details
//           </DialogTitle>
//           <DialogDescription className="text-white/60">
//             Complete information for order <strong>{data.order_id}</strong>
//           </DialogDescription>
//         </DialogHeader>

//         <ScrollArea className="max-h-[70vh] mt-4">
//           <button onClick={getNowpaymentsStatus}>test</button>
//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-white/60">Wallet Address</span>
//               <span className="font-mono text-orange-400">
//                 {data.wallet_address}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Pay Currency</span>
//               <span>{data.pay_currency.toUpperCase()}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Pay Amount</span>
//               <span className="text-orange-300 font-semibold">
//                 {data.pay_amount}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Invested (USD)</span>
//               <span className="text-green-400 font-semibold">
//                 {formatCurrencyWithDecimals(
//                   data.invested_usd,
//                   "USD",
//                   "en-US",
//                   2
//                 )}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Receive (CRM)</span>
//               <span>{data.crm_amount.toFixed(3)} CRM</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Network</span>
//               <span className="uppercase">{data.network}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Stage</span>
//               <span>{data.stage}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Phase</span>
//               <span>{data.phase}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Created At</span>
//               <span>{formatDateTimeUTC(data.created_at)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/60">Updated At</span>
//               <span>{formatDateTimeUTC(data.updated_at)}</span>
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <span className="text-white/60">Status</span>
//               <Badge
//                 variant="outline"
//                 className={cn(
//                   "px-3 py-1 text-xs capitalize",
//                   statusColor[data.status] || "bg-gray-700 text-gray-300"
//                 )}
//               >
//                 {data.status.replace("_", " ")}
//               </Badge>
//             </div>
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

// ================= Interface dari kamu =================
export interface NowPaymentsPayment {
  payment_id: number;
  invoice_id: number | null;
  payment_status:
    | "waiting"
    | "confirming"
    | "confirmed"
    | "finished"
    | "failed"
    | "expired";
  pay_address: string;
  payin_extra_id: string | null;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  actually_paid: number;
  pay_currency: string;
  order_id: string | null;
  order_description: string | null;
  purchase_id: number;
  outcome_amount: number;
  outcome_currency: string;
  payout_hash: string | null;
  payin_hash: string | null;
  created_at: string;
  updated_at: string;
  burning_percent: string | null;
  type: "crypto2crypto" | "fiat2crypto" | "crypto2fiat";
  payment_extra_ids: number[] | null;
}

export function DetailDialog({ data }: { data: InvestmentDb }) {
  const [npData, setNpData] = useState<NowPaymentsPayment | null>(null);
  const [loading, setLoading] = useState(false);

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

  const getNowpaymentsStatus = async () => {
    try {
      setLoading(true);
      const { data: res } = await axios.get(
        "/api/payments/status",
        {
          params: { payment_id: data.order_id?.toString() },
        }
      );
      setNpData(res.payment);
      toast.success("Fetched from NowPayments");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch NowPayments data");
    } finally {
      setLoading(false);
    }
  };

  const renderValue = (val?: string | number | null) =>
    val !== undefined && val !== null && val !== "" ? val.toString() : "–";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left px-2 py-1 hover:bg-orange-500/10 text-orange-400">
          View Details
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-4/5 bg-black text-white border-orange-500">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-orange-400">
            Transaction Details
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Complete information for order <strong>{data.order_id}</strong>
          </DialogDescription>
        </DialogHeader>

        {/* Button fetch + status badge */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={getNowpaymentsStatus}
            disabled={loading}
            className={cn(
              "px-4 py-2 rounded-lg border border-orange-500 text-orange-400 hover:bg-orange-500/10 transition",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            {loading ? "Fetching..." : "Fetch from NowPayments"}
          </button>
          {npData && (
            <Badge
              variant="outline"
              className={cn(
                "px-3 py-1 text-xs capitalize",
                statusColor[npData.payment_status] ||
                  "bg-gray-700 text-gray-300"
              )}
            >
              {npData.payment_status}
            </Badge>
          )}
        </div>

        {/* Data Grid */}
        <ScrollArea className="max-h-[70vh] mt-4">
          <div className="grid grid-cols-2 gap-6">
            {/* ================= Left: Database Data ================= */}
            <div>
              <h3 className="text-lg text-orange-400 font-semibold mb-2">
                Database Record
              </h3>
              <div className="space-y-3 text-sm">
                <Item label="Wallet Address" value={data.wallet_address} />
                <Item label="Pay Currency" value={data.pay_currency} />
                <Item label="Pay Amount" value={data.pay_amount} />
                <Item
                  label="Invested (USD)"
                  value={formatCurrencyWithDecimals(
                    data.invested_usd,
                    "USD",
                    "en-US",
                    2
                  )}
                  color="text-green-400"
                />
                <Item
                  label="Receive (CRM)"
                  value={`${data.crm_amount.toFixed(3)} CRM`}
                />
                <Item label="Network" value={data.network} />
                <Item label="Stage" value={data.stage} />
                <Item label="Phase" value={data.phase} />
                <Item
                  label="Created At"
                  value={formatDateTimeUTC(data.created_at)}
                />
                <Item
                  label="Updated At"
                  value={formatDateTimeUTC(data.updated_at)}
                />
                <Item
                  label="Status"
                  value={
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-3 py-1 text-xs capitalize",
                        statusColor[data.status] ||
                          "bg-gray-700 text-gray-300"
                      )}
                    >
                      {data.status.replace("_", " ")}
                    </Badge>
                  }
                />
              </div>
            </div>

            {/* ================= Right: NowPayments Data ================= */}
            <div>
              <h3 className="text-lg text-orange-400 font-semibold mb-2">
                NowPayments Data
              </h3>

              {npData ? (
                <div className="space-y-3 text-sm">
                  <Item label="Payment ID" value={npData.payment_id} />
                  <Item label="Pay Address" value={npData.pay_address} />
                  <Item label="Pay Currency" value={npData.pay_currency} />
                  <Item label="Pay Amount" value={npData.pay_amount} />
                  <Item label="Actually Paid" value={npData.actually_paid} />
                  <Item label="Price Amount (USD)" value={npData.price_amount} />
                  <Item
                    label="Outcome Amount"
                    value={renderValue(npData.outcome_amount)}
                  />
                  <Item
                    label="Outcome Currency"
                    value={renderValue(npData.outcome_currency)}
                  />
                  <Item
                    label="Tx Hash"
                    value={
                      npData.payin_hash ? (
                        <a
                          href={`https://bscscan.com/tx/${npData.payin_hash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 underline"
                        >
                          {npData.payin_hash.slice(0, 10)}...
                        </a>
                      ) : (
                        "–"
                      )
                    }
                  />
                  <Item label="Created At" value={npData.created_at} />
                  <Item label="Updated At" value={npData.updated_at} />
                  <Item label="Type" value={npData.type} />
                </div>
              ) : (
                <div className="text-center text-white/50 italic mt-10">
                  No NowPayments data fetched yet.
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function Item({
  label,
  value,
  color,
}: {
  label: string;
  value: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/60">{label}</span>
      <span className={cn("font-semibold break-all text-right", color)}>
        {value}
      </span>
    </div>
  );
}
