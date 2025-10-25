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
import { isNativeCurrency, isTokenCurrency } from "@/utils/paymentType";
import { TOKENS, TokenSymbol } from "@/services/wagmi/tokens";
import { getAccount } from "@wagmi/core";
import { wagmiConfig } from "@/services/wagmi/wagmiConfig";

// definisikan tipe minimal EIP-1193 provider
interface Eip1193Provider {
  request: (args: {
    method: string;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}

async function addTokenToActiveWallet(token: {
  address: string;
  decimals: number;
  symbol: string;
}) {
  try {
    // Ambil akun aktif dari wagmi
    const account = getAccount(wagmiConfig);

    if (!account.connector) {
      console.warn("❌ No active connector found");
      return;
    }

    // Ambil provider dari connector (bisa MetaMask, WalletConnect, dsb)
    const provider = (await account.connector.getProvider()) as
      | Eip1193Provider
      | undefined;

    if (!provider?.request) {
      console.warn("❌ Provider does not support request()");
      return;
    }

    // Kirim RPC wallet_watchAsset langsung ke wallet yang sedang aktif
    await provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
        },
      },
    });

    console.log(`✅ Added ${token.symbol} to wallet`);
  } catch (error) {
    console.error("Failed to add token:", error);
  }
}

export function useRightSideCTAButton(amountBuy: number, payCurrency: string) {
  const { activePresale } = usePublicPresaleContext();
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const payHandler = async () => {
    if (!address)
      return toast.error(
        "You have to connect your wallet to continue this action"
      );
    if (!payCurrency) return toast.error("Pay currency");
    const symbol = payCurrency.toUpperCase() as TokenSymbol;
    const token = TOKENS[symbol];

    if (!token) return toast.error("Unsupported payment token");

    const isNative = isNativeCurrency(payCurrency);
    const isToken = isTokenCurrency(payCurrency);

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/payments", {
        payCurrency,
        amountBuy,
      });
      const investmentData = buildInvestmentData(address, activePresale, data);
      await axios.post("/api/investment", investmentData);

      if (isNative && token.type === "native") {
        if (chainId !== token.chainId) {
          await switchChainAsync({ chainId: token.chainId });
        }

        await sendTransactionAsync({
          to: data.pay_address,
          value: parseEther(String(data.pay_amount)),
        });
      } else if (isToken && token.type === "token") {
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
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const data = error.response?.data;
        console.log(data);
        toast.error(data?.message ?? "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { payHandler, isLoading, openSheet, setOpenSheet };
}
