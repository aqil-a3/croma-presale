"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Connector,
  CreateConnectorFn,
  useAccount,
  useConnect,
} from "wagmi";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- helper: detect injected wallet name dari window.ethereum ---
function detectInjectedName(): string | null {
  if (typeof window === "undefined") return null;
  const eth = window.ethereum;
  if (!eth) return null;
  if (eth.isMetaMask) return "MetaMask";
  if (eth.isTrust || eth.isTrustWallet) return "TrustWallet";
  if (eth.isOkxWallet || eth.isOKXWallet) return "OKX Wallet";
  if (eth.isCoinbaseWallet) return "Coinbase Wallet";
  return "Injected";
}

// --- helper: dapatkan logo berdasarkan connector atau provider ---
function getWalletLogo(connector: Connector) {
  const name = connector.name?.toLowerCase() ?? "";
  if (name.includes("meta")) return "/logo/metamask.png";
  if (name.includes("walletconnect")) return "/logo/walletconnect.png";
  if (name.includes("okx")) return "/logo/okx-wallet.png";
  if (name.includes("trust")) return "/logo/trust-wallet.png";

  // fallback cek provider injected
  const detected = detectInjectedName();
  if (detected === "MetaMask") return "/logo/metamask.png";
  if (detected === "TrustWallet") return "/logo/trust-wallet.png";
  if (detected === "OKX Wallet") return "/logo/okx-wallet.png";

  return "/logo/unknown.png";
}

export function MethodConnect({ open, setOpen }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected } = useAccount();

  const isWithReferral = pathname.startsWith("/ref/CROMA");

  const { connectAsync, connectors } = useConnect({
    mutation: {
      onError: (err) => {
        console.error(err);
        if (err.name === "UserRejectedRequestError") return;
        toast.error(err.message || "Failed to connect wallet");
      },
      onSuccess: async (data) => {
        try {
          const walletAddress = data.accounts?.[0];
          if (!walletAddress) {
            toast.error("Wallet address not found");
            return;
          }

          if (isWithReferral) {
            const referral_code = pathname.split("/")[2];
            await axios.post("/api/auth/new-user-with-referral", {
              walletAddress,
              referral_code,
            });
          } else {
            await axios.post("/api/auth/new-user", { address: walletAddress });
          }

          toast.success("Wallet Connected!");
          setOpen(false);
          router.push("/dashboard");
        } catch (e) {
          console.error(e);
          toast.error("Something went wrong while saving user");
        }
      },
    },
  });

  const items = connectors.map((connector) => ({
    connector,
    imageSrc: getWalletLogo(connector),
  })).filter((item) => item.connector.id.toLowerCase() !== "injected");

  const connectHandler = async (connector: Connector<CreateConnectorFn>) => {
    try {
      if (isConnected) return router.push("/dashboard");
      await connectAsync({ connector });
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className={cn(
          fontPoppins.className,
          "space-y-4 bg-black border-orange-500 p-6"
        )}
      >
        <SheetHeader>
          <SheetTitle className="text-white text-center">
            Connect Wallet With
          </SheetTitle>
          <SheetDescription className="text-white text-center">
            Choose a wallet to connect
          </SheetDescription>
        </SheetHeader>

        <div className="flex gap-6 justify-center flex-wrap">
          {items.map(({ imageSrc, connector }, i) => {
            if (imageSrc === "/logo/unknown.png") return null;

            return (
              <button
                key={i}
                onClick={() => connectHandler(connector)}
                className="hover:opacity-80 transition"
              >
                <Image
                  src={imageSrc}
                  alt={connector.name}
                  width={64}
                  height={64}
                />
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
