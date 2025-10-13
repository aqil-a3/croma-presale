import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { apiUser } from "@/services/db/users";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Connector, CreateConnectorFn, useAccount, useConnect } from "wagmi";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MethodConnect({ open, setOpen }: Props) {
  const { createNewUser, createNewUserWithReferral } = apiUser;
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected } = useAccount();

  const isWithReferral = pathname.startsWith("/ref/CROMA");

  const { connect, connectors } = useConnect({
    mutation: {
      onError: (err) => {
        console.error(err);
        if (err.name === "UserRejectedRequestError") return;
        toast.error(err.message);
      },
      onSuccess: async (data) => {
        const walletAddress = data.accounts[0] as string;
        if (isWithReferral) {
          const referral_code = pathname.split("/")[2];
          await createNewUserWithReferral(walletAddress, referral_code);
        } else {
          await createNewUser(walletAddress);
        }

        toast.success("Wallet Connected!");
        router.push("/dashboard");
      },
    },
  });

  const items = connectors.map((connector) => ({
    imageSrc:
      connector.name === "MetaMask"
        ? "/logo/metamask.png"
        : connector.name === "WalletConnect"
        ? "/logo/walletconnect.png"
        : connector.name.includes("OKX")
        ? "/logo/okx-wallet.png"
        : connector.name ==="TrustWallet" ? "/logo/trust-wallet.png" :"/logo/unknown.png",
    connector,
  }));

  const connectHandler = (connector: Connector<CreateConnectorFn>) => {
    if (isConnected) return router.push("/dashboard");
    connect({ connector });
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
            Connect to your wallet with?
          </SheetDescription>
        </SheetHeader>
        <div className="flex gap-4 justify-center">
          {items.map(({ imageSrc, connector }, i) => {
            if (imageSrc === "/logo/unknown.png") return null;

            return (
              <button key={i} onClick={() => connectHandler(connector)}>
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
