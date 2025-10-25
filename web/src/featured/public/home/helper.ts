import { getAccount } from "@wagmi/core";
import { wagmiConfig } from "@/services/wagmi/wagmiConfig";
import { Eip1193Provider } from "./interface";

export async function addTokenToActiveWallet(token: {
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
