import { createNewInvestment } from "@/services/db/investment/createNewInvestment";
import { apiNowPayments } from "@/services/nowpayments";
import { buildInvestmentData } from "@/utils/buildInvestmentData";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount, useSendTransaction } from "wagmi";
import { usePublicPresaleContext } from "../provider";
import {
  CreatePaymentRequest,
} from "@/services/nowpayments/interface";
import { serverEndpoint } from "@/config/endpoint";
import { isAxiosError } from "axios";
import { parseEther } from "viem";

export function useRightSideCTAButton(amountBuy: number, payCurrency: string) {
  const { createNewPayment } = apiNowPayments;

  const { activePresale } = usePublicPresaleContext();
  const { address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const payload: CreatePaymentRequest = {
    pay_currency: payCurrency,
    price_amount: amountBuy,
    price_currency: "usd",
    order_description: "Buy Cromachain Coin",
    is_fixed_rate: true,
    ipn_callback_url: `${serverEndpoint}/investment/payments/webhook`,
  };

  const payHandler = async () => {
    if (!address) 
      return toast.error("You have to connect your wallet to continue this action")
    try {
      setIsLoading(true);
      const data = await createNewPayment(payload);
      const investmentData = buildInvestmentData(address, activePresale, data);
      await createNewInvestment(investmentData);
      await sendTransactionAsync({
        to: data.pay_address,
        value: parseEther(String(data.pay_amount)),
      });
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

  return { payHandler, isLoading, openSheet, setOpenSheet };
}
