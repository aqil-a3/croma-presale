import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WagmiCookie } from "@/@types/wagmi";

export interface WalletAuthResult {
  isConnected: boolean;
  address: string;
  isAdmin: boolean;
}

export async function getWalletAuth(options?: { requireAuth?: boolean }): Promise<WalletAuthResult> {
  const cookieStore = await cookies();
  const wagmiStore = cookieStore.get("croma_presale_wallet_connect.store");

  let isConnected = false;
  let loggedWalletAddress = "";

  if (wagmiStore?.value) {
    try {
      const parsed = JSON.parse(wagmiStore.value) as WagmiCookie;

      if (parsed.state.connections.value.length > 0 && parsed.state.current) {
        isConnected = true;
        const currentId = parsed.state.current;
        const connection = parsed.state.connections.value.find(
          ([id]) => id === currentId
        );
        loggedWalletAddress = connection?.[1].accounts[0] ?? "";
      }
    } catch (e) {
      console.error("Failed to parse croma_presale_wallet_connect.store:", e);
    }
  }

  if (options?.requireAuth && !isConnected) {
    redirect("/home?error=must-login");
  }

  const adminAddresses: string[] = [
    process.env.DEVELOPER_WALLET_ADDRESS,
    process.env.ADMIN_WALLET_ADDRESS,
  ]
    .filter(Boolean)
    .map((addr) => addr!.toLowerCase());

  const isAdmin = !!loggedWalletAddress && adminAddresses.includes(loggedWalletAddress.toLowerCase());

  return { isConnected, address: loggedWalletAddress, isAdmin };
}
