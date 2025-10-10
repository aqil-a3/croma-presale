import { createNewInvestment } from "@/services/db/investment/createNewInvestment";
import { apiNowPayments } from "@/services/nowpayments";
import { buildInvestmentData } from "@/utils/buildInvestmentData";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { usePublicPresaleContext } from "../provider";
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
} from "@/services/nowpayments/interface";
import { serverEndpoint } from "@/config/endpoint";
import { isAxiosError } from "axios";
import { buildCryptoPaymentURI } from "@/utils/buildCryptoPaymentURI";
import { parseEther } from "viem";
import { isMobile } from "@/utils/isMobile";

export function useRightSideCTAButton(amountBuy: number, payCurrency: string) {
  const { createNewPayment } = apiNowPayments;

  const { activePresale } = usePublicPresaleContext();
  const { address } = useAccount();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<CreatePaymentResponse | null>(
    null
  );

//   const clickHandler = () => {
//     if (!address)
//       return toast.error(
//         "You have to connect your wallet to continue this action"
//       );
//   };
  const clickHandler = async () => {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts)
  };

  const payload: CreatePaymentRequest = {
    pay_currency: payCurrency,
    price_amount: amountBuy,
    price_currency: "usd",
    order_description: "Buy Cromachain Coin",
    is_fixed_rate: true,
    ipn_callback_url: `${serverEndpoint}/investment/payments/webhook`,
  };

  const payHandler = async () => {
    if (!address) return;
    try {
      setIsLoading(true);
      const data = await createNewPayment(payload);
      const investmentData = buildInvestmentData(address, activePresale, data);
      await createNewInvestment(investmentData);

      setPaymentData(data);

      const mobile = isMobile();

      if (mobile) {
        mobileHandler();
      } else {
        await desktopHandler();
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

  const mobileHandler = () => {
    if (!paymentData) return;

    const uri = buildCryptoPaymentURI(paymentData);

    window.location.href = uri;
  };

  const desktopHandler = async () => {
    if (!paymentData) return;
    console.log("Data payment tersedia");
    if (typeof window === "undefined" || !window.ethereum) return;
    try {
        console.log("Meminta izin akses akun")
        // 1️⃣ Minta izin akses akun
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        
        console.log("Meminta izin akses akun diizinkan")
      const userAddress = accounts[0];
      console.log("Connected wallet:", userAddress);

      // 2️⃣ Kirim transaksi langsung dari extension
      const tx = {
        from: userAddress,
        to: paymentData.pay_address, // alamat penerima dari paymentData
        value: parseEther(String(paymentData.pay_amount), "wei"), // dalam wei, pastikan sudah dikonversi
      };

      console.log(tx);

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [tx],
      });

      console.log("Transaction sent:", txHash);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return { clickHandler, payHandler, isLoading };
}
