import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { useState } from "react";
import { Wallet, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReferralWithdrawRequestUser } from "@/@types/referrals";
import { toast } from "sonner";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  maxAmount: number;
  walletAddress: string;
}

export function WithdrawDialog({
  open,
  setOpen,
  maxAmount,
  walletAddress,
}: Props) {
  const [amount, setAmount] = useState<number>(maxAmount);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isDisabled = amount <= 0 || amount > maxAmount || isLoading;

  const confirmHandler = async () => {
    const payload: ReferralWithdrawRequestUser = {
      amount,
      wallet_address: walletAddress,
    };

    try {
      setIsLoading(true);
      await axios.post("/api/referral/withdraw", payload);
      toast.success("Success");
    } catch (error) {
      console.error(error);
      toast.error("Something error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          fontPoppins.className,
          "bg-gradient-to-b from-zinc-900 to-black text-white border border-orange-500/60 shadow-xl rounded-2xl p-6 space-y-5"
        )}
      >
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl font-semibold text-orange-400">
            Withdraw
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Transfer your earned balance securely to your wallet
          </DialogDescription>
        </DialogHeader>

        <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">Available to Claim</span>
            <span className="font-medium text-orange-400">
              {formatCurrencyWithDecimals(maxAmount, "USD", "en-US", 2)}
            </span>
          </div>
          <div className="items-center text-sm">
            <span className="text-zinc-400 flex items-center gap-1">
              <Wallet className="h-4 w-4" /> Wallet Address
            </span>
            <span className="font-mono text-xs truncate max-w-[180px] text-zinc-300">
              {walletAddress}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <Label htmlFor="withdraw-amount" className="text-sm text-zinc-300">
              Withdraw Amount
            </Label>
            <Badge
              className="border-orange-500 cursor-pointer hover:scale-105 active:scale-100 duration-200"
              onClick={() => setAmount(maxAmount)}
            >
              Max
            </Badge>
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
            <Input
              type="number"
              id="withdraw-amount"
              value={amount}
              min={0}
              max={maxAmount}
              onChange={(e) => setAmount(e.target.valueAsNumber)}
              className="pl-8 bg-zinc-900/60 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all selection:bg-orange-500"
            />
          </div>
          {amount > maxAmount && (
            <p className="text-xs text-red-400">
              ⚠️ Amount exceeds available balance.
            </p>
          )}
        </div>

        <Button
          disabled={isDisabled}
          onClick={confirmHandler}
          className={cn(
            "w-full py-2 font-semibold rounded-xl transition-all",
            isDisabled
              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
          )}
        >
          {isLoading ? (
            <>
              <Spinner /> Please Wait...
            </>
          ) : (
            "Confirm Withdraw"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
