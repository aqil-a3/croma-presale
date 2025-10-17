import { buildInvestmentData } from "@/utils/buildInvestmentData";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount, useSendTransaction } from "wagmi";
import { usePublicPresaleContext } from "../provider";
import axios, { isAxiosError } from "axios";
import { parseEther } from "viem";

export function useRightSideCTAButton(amountBuy: number, payCurrency: string) {
  const { activePresale } = usePublicPresaleContext();
  const { address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const payHandler = async () => {
    if (!address)
      return toast.error(
        "You have to connect your wallet to continue this action"
      );
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/payments", {
        payCurrency,
        amountBuy,
      });
      const investmentData = buildInvestmentData(address, activePresale, data);
      await axios.post("/api/investment", investmentData);
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
