import { CreatePaymentRequest, CreatePaymentResponse } from "@/@types/investment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/services/axios/server";
import React, { useState } from "react";

import { toast } from "sonner";
import { isAxiosError } from "axios";
import { PaymentQR } from "../QR/PaymentQR";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amountBuy: number;
  payCurrency: string;
}

export function BuyCRMDialog({ open, setOpen, amountBuy, payCurrency }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<CreatePaymentResponse | null>(null)

  const payload: CreatePaymentRequest = {
    pay_currency: payCurrency,
    price_amount: amountBuy,
    price_currency: "usd",
    order_description: "Testing USDT ETH via MetaMask",
    is_fixed_rate: true,
  };

  const payHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.post("/investment/payments", payload);
      setPaymentData(data)
    } catch (error) {
      console.error(error);
      if(isAxiosError(error)){
        const data = error.response?.data;
        toast.error(data.message ?? "Something error")
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            You will buy Cromachain Coin {amountBuy} USD with {payCurrency}.
          </DialogDescription>
          <PaymentQR payment={paymentData} />
          <Button onClick={payHandler} disabled={isLoading}>
            {isLoading ? "Processing..." : "Sure"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
