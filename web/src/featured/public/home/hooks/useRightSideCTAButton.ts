import { buildInvestmentData } from "@/utils/buildInvestmentData";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAccount,
  useSendTransaction,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { usePublicPresaleContext } from "../provider";
import axios, { isAxiosError } from "axios";
import { erc20Abi, parseEther, parseUnits } from "viem";
import {
  isNativeCurrency,
  isNonEVMCurrency,
  isTokenCurrency,
} from "@/utils/paymentType";
import { TOKENS, TokenSymbol } from "@/services/wagmi/tokens";
import { addTokenToActiveWallet } from "../helper";
import { CreatePaymentResponse } from "@/services/nowpayments/interface";

export function useRightSideCTAButton(amountBuy: number, payCurrency: string) {
  const { activePresale } = usePublicPresaleContext();
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [payment, setPayment] = useState<CreatePaymentResponse | null>(null);

  const payHandler = async () => {
    if (!address)
      return toast.error(
        "You have to connect your wallet to continue this action"
      );
    if (!payCurrency) return toast.error("Pay currency");
    const symbol = payCurrency.toUpperCase() as TokenSymbol;
    const token = TOKENS[symbol];

    const isNative = isNativeCurrency(payCurrency);
    const isToken = isTokenCurrency(payCurrency);
    const isNonEvm = isNonEVMCurrency(payCurrency);

    if (!isNative && !isToken && !isNonEvm)
      return toast.error("Unsupported payment token");
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/payments", {
        payCurrency,
        amountBuy,
      });
      const investmentData = buildInvestmentData(address, activePresale, data);
      await axios.post("/api/investment", investmentData);

      // Pembayaran native coin
      if (isNative && token.type === "native") {
        if (chainId !== token.chainId) {
          await switchChainAsync({ chainId: token.chainId });
        }

        await sendTransactionAsync({
          to: data.pay_address,
          value: parseEther(String(data.pay_amount)),
        });
      }
      // Pembayaran token currency
      else if (isToken && token.type === "token") {
        if (chainId !== token.chainId) {
          await switchChainAsync({ chainId: token.chainId });
        }

        await addTokenToActiveWallet({
          address: token.address,
          decimals: token.decimals,
          symbol:
            payCurrency.toLowerCase() === "usdcbase"
              ? "USDC"
              : payCurrency.toLowerCase() === "usdtbsc"
              ? "USDT"
              : symbol,
        });

        await writeContractAsync({
          address: token.address,
          abi: erc20Abi,
          functionName: "transfer",
          args: [
            data.pay_address,
            parseUnits(String(data.pay_amount), token.decimals),
          ],
        });
      }
      // Pembayaran NonEVM
      else if (isNonEvm) {
        setOpenSheet(true);
        setPayment(data);
      }
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

  return { payHandler, isLoading, openSheet, setOpenSheet, payment };
}
