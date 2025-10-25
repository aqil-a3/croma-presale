import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";
import { useRightSideCTAButton } from "../../../hooks/useRightSideCTAButton";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect, useState } from "react";
import { CreatePaymentResponse } from "@/services/nowpayments/interface";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Clock, Copy } from "lucide-react";

interface Props {
  amountBuy: number;
  payCurrency: string;
}

export function RightSideCTAButton({ amountBuy, payCurrency }: Props) {
  const { isLoading, payHandler, openSheet, setOpenSheet, payment } =
    useRightSideCTAButton(amountBuy, payCurrency);

  return (
    <>
      <Button
        style={{
          background: "linear-gradient(90deg, #B72204 0%, #FC6400 100%)",
        }}
        disabled={isLoading}
        className={`${fontOrbitron.className} text-white w-full h-[60px]`}
        onClick={payHandler}
      >
        {isLoading ? (
          <>
            <Spinner /> PROCESSING...
          </>
        ) : (
          "BUY NOW"
        )}
      </Button>
      <NonEVMPaymentDialog
        open={openSheet}
        payment={payment}
        setOpen={setOpenSheet}
      />
    </>
  );
}

// const NonEVMPaymentDialog: React.FC<{
//   payment: CreatePaymentResponse | null;
//   open: boolean;
//   setOpen: (state: boolean) => void;
// }> = ({ payment, open, setOpen }) => {
//   if (!payment) return null;
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="text-white bg-black border border-orange-500">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold">
//             Continue Your Payment
//           </DialogTitle>
//           <DialogDescription>Send payment to this address:</DialogDescription>
//         </DialogHeader>
//         <p className="font-mono text-orange-400">{payment.pay_address}</p>

//         <div className="flex justify-center p-2 bg-white">
//           <QRCodeSVG value={payment.pay_address} size={180} />
//         </div>
//         <p className="text-sm text-gray-400 mt-2">
//           Network: {payment.network.toUpperCase()}
//         </p>
//         <p className="text-sm text-yellow-400">
//           This payment will be verified automatically once confirmed on the
//           blockchain.
//         </p>
//       </DialogContent>
//     </Dialog>
//   );
// };

const NonEVMPaymentDialog: React.FC<{
  payment: CreatePaymentResponse | null;
  open: boolean;
  setOpen: (state: boolean) => void;
}> = ({ payment, open, setOpen }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  // 🕒 countdown timer
  useEffect(() => {
    if (!payment?.expiration_estimate_date) return;

    const interval = setInterval(() => {
      const expire = new Date(payment.expiration_estimate_date).getTime();
      const now = Date.now();
      const diff = Math.max(0, expire - now);

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${minutes}m ${seconds}s`);
      if (diff <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [payment?.expiration_estimate_date]);

  if (!payment) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(payment.pay_address);
    toast.success("Address copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-white bg-[#0B0B0B] border border-orange-500 rounded-2xl p-5 max-w-md mx-auto space-y-4">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="text-xl font-bold text-orange-400">
            Complete Your Payment
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Send exactly the amount shown below to the address provided.
          </DialogDescription>
        </DialogHeader>

        {/* Payment Info */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Amount</span>
            <span className="text-orange-300 font-semibold">
              {payment.pay_amount} {payment.pay_currency.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network</span>
            <span className="uppercase text-gray-200">{payment.network}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Expires in</span>
            <span className="flex items-center gap-1 text-yellow-400">
              <Clock size={14} /> {timeLeft || "expired"}
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Recipient Address</p>
          <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 font-mono text-orange-400 text-xs border border-orange-500/30">
            <span className="truncate">{payment.pay_address}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopy}
              className="text-orange-400 hover:bg-orange-500/20 hover:text-white"
            >
              <Copy size={16} />
            </Button>
          </div>
        </div>

        {/* QR */}
        <div className="flex justify-center mt-2">
          <div className="bg-white p-3 rounded-xl shadow-lg">
            <QRCodeSVG value={payment.pay_address} size={140} />
          </div>
        </div>

        {/* Footer text */}
        <p className="text-xs text-yellow-400 text-center leading-relaxed mt-2">
          Your payment will be automatically verified once confirmed on the
          blockchain.
          <br />
          Make sure you send using the correct network.
        </p>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border-orange-500 text-orange-400 hover:bg-orange-500/10 mt-2"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
