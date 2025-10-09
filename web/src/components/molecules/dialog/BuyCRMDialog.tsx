// import { CreatePaymentRequest, CreatePaymentResponse } from "@/@types/investment";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { api } from "@/services/axios/server";
// import React, { useState } from "react";

// import { toast } from "sonner";
// import { isAxiosError } from "axios";
// import { PaymentQR } from "../QR/PaymentQR";

// interface Props {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   amountBuy: number;
//   payCurrency: string;
// }

// export function BuyCRMDialog({ open, setOpen, amountBuy, payCurrency }: Props) {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [paymentData, setPaymentData] = useState<CreatePaymentResponse | null>(null)

//   const payload: CreatePaymentRequest = {
//     pay_currency: payCurrency,
//     price_amount: amountBuy,
//     price_currency: "usd",
//     order_description: "Testing USDT ETH via MetaMask",
//     is_fixed_rate: true,
//   };

//   const payHandler = async () => {
//     try {
//       setIsLoading(true);
//       const { data } = await api.post("/investment/payments", payload);
//       setPaymentData(data)
//     } catch (error) {
//       console.error(error);
//       if(isAxiosError(error)){
//         const data = error.response?.data;
//         toast.error(data.message ?? "Something error")
//       }
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Are You Sure?</DialogTitle>
//           <DialogDescription>
//             You will buy Cromachain Coin {amountBuy} USD with {payCurrency}.
//           </DialogDescription>
//           <PaymentQR payment={paymentData} />
//           <Button onClick={payHandler} disabled={isLoading}>
//             {isLoading ? "Processing..." : "Sure"}
//           </Button>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }

import {
  CreatePaymentRequest,
  CreatePaymentResponse,
} from "@/services/nowpayments/interface";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/services/axios/server";
import React, { useState } from "react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { PaymentQR } from "../QR/PaymentQR";
import { buildCryptoPaymentURI } from "@/utils/buildCryptoPaymentURI";
import { apiNowPayments } from "@/services/nowpayments";
import { buildInvestmentData } from "@/utils/buildInvestmentData";
import { useAccount } from "wagmi";
import { usePublicPresaleContext } from "@/featured/public/home/provider";
import { createNewInvestment } from "@/services/db/investment/createNewInvestment";
import { serverEndpoint } from "@/config/endpoint";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amountBuy: number;
  payCurrency: string;
}

type StatusPayment = "confirm" | "payment" | "status";

export function BuyCRMDialog({ open, setOpen, amountBuy, payCurrency }: Props) {
  const { address } = useAccount();
  const { activePresale } = usePublicPresaleContext();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<CreatePaymentResponse | null>(
    null
  );

  const [activeTab, setActiveTab] = useState<StatusPayment>("confirm");

  const payload: CreatePaymentRequest = {
    pay_currency: payCurrency,
    price_amount: amountBuy,
    price_currency: "usd",
    order_description: "Buy Cromachain Coin",
    is_fixed_rate: true,
    ipn_callback_url: `${serverEndpoint}/investment/payments/webhook`,
  };

  const { createNewPayment } = apiNowPayments;

  const payHandler = async () => {
    if (!address) return;
    try {
      setIsLoading(true);
      const data = await createNewPayment(payload);
      const investmentData = buildInvestmentData(address, activePresale, data);
      await createNewInvestment(investmentData);

      setPaymentData(data);
      setActiveTab("payment");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const data = error.response?.data;
        toast.error(data?.message ?? "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!paymentData) return;
    try {
      const { data } = await api.get(
        `/investment/payments/${paymentData.payment_id}`
      );
      setPaymentData(data);
      setActiveTab("status");
    } catch (error) {
      console.error(error);
      toast.error("Failed to check payment status");
    }
  };

  const sendTransactionHandler = () => {
    if (!paymentData) return;

    const uri = buildCryptoPaymentURI(paymentData);

    window.location.href = uri;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Cromachain Coin</DialogTitle>
          <DialogDescription>
            {activeTab === "confirm" &&
              `You will buy Cromachain Coin worth ${amountBuy} USD using ${payCurrency}.`}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as StatusPayment)}
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="confirm">Confirm</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          {/* --- TAB CONFIRM --- */}
          <TabsContent value="confirm">
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <p>
                You will buy <strong>{amountBuy} USD</strong> worth of
                Cromachain Coin using{" "}
                <strong>{payCurrency.toUpperCase()}</strong>.
              </p>
              <Button onClick={payHandler} disabled={isLoading}>
                {isLoading ? "Processing..." : "Buy Now"}
              </Button>
            </div>
          </TabsContent>

          {/* --- TAB PAYMENT --- */}
          <TabsContent value="payment">
            {paymentData ? (
              <div className="flex flex-col items-center space-y-3 py-4">
                <PaymentQR payment={paymentData} />
                <Button onClick={sendTransactionHandler}>
                  Send Transaction
                </Button>
                <Button onClick={handleCheckStatus}>
                  Check Payment Status
                </Button>
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                No payment created yet.
              </p>
            )}
          </TabsContent>

          {/* --- TAB STATUS --- */}
          <TabsContent value="status">
            {paymentData ? (
              <div className="text-center py-4 space-y-2">
                <p>
                  <strong>Status:</strong> {paymentData.payment_status}
                </p>
                <p>
                  <strong>Amount:</strong> {paymentData.pay_amount}{" "}
                  {paymentData.pay_currency.toUpperCase()}
                </p>
                <p>
                  <strong>Address:</strong> {paymentData.pay_address}
                </p>
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                No status available yet.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
