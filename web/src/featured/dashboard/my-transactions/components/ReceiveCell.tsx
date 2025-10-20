import { Row } from "@tanstack/react-table";
import { TransactionHistory } from "../interface";
import { formatNumberWithDecimal } from "@/utils/formatNumberWithDecimal";
import { useMyTransactionData } from "../provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";
import React from "react";
import { ReferralBuyBonusDb } from "@/@types/referrals";
import { InvestmentDb } from "@/@types/investment";
import { fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";

export function ReceiveCell({ row }: { row: Row<TransactionHistory> }) {
  const { receive, order_id } = row.original;
  const { amount, currency } = receive;
  const { userTransactions, referralBonus } = useMyTransactionData();
  const bonusData = referralBonus ? referralBonus[0] : null;

  const firstBuy = userTransactions.find(
    (utr) => utr.order_id === bonusData?.order_id
  );

  const isFirstBuy = firstBuy?.order_id === order_id;

  return (
    <div>
      <p>
        {formatNumberWithDecimal(amount)} {currency}{" "}
        {isFirstBuy && bonusData && (
          <GiftPopup data={bonusData} firstBuyData={firstBuy} />
        )}
      </p>
    </div>
  );
}

interface GiftPopupProps {
  data: ReferralBuyBonusDb;
  firstBuyData: InvestmentDb;
}

const GiftPopup: React.FC<GiftPopupProps> = ({ data, firstBuyData }) => {
  const total = data.crm_bonus + firstBuyData.crm_amount;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="outline"
          className="border-orange-500 text-orange-500 hover:bg-orange-500/10 cursor-pointer transition-all duration-200"
        >
          <Gift />
        </Badge>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className={cn(
          fontPoppins.className,
          "w-96 border-orange-400 bg-gradient-to-b from-zinc-900 to-black text-white shadow-lg rounded-xl p-4"
        )}
      >
        <div className="flex items-center gap-2 mb-3 border-b border-orange-400/40 pb-2">
          <Gift className="h-5 w-5 text-orange-400" />
          <h3 className="text-lg font-semibold">First Buy Bonus</h3>
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">With Referral</span>
            <span className="font-medium">{data.referral_code}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Receive Amount</span>
            <span className="font-medium">
              {formatNumberWithDecimal(firstBuyData.crm_amount)} CRM
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Bonus</span>
            <span className="font-medium text-orange-400">
              +{formatNumberWithDecimal(data.crm_bonus)} CRM
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-orange-400/40 mt-2">
            <span className="text-gray-300">Total</span>
            <span className="font-semibold text-orange-300">
              {formatNumberWithDecimal(total)} CRM
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
