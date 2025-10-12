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

  const items: { imageSrc: string; id: string }[] = [
    {
      imageSrc: "/logo/metamask.png",
      id: "metaMaskSDK",
    },
    {
      imageSrc: "/logo/walletconnect.png",
      id: "walletConnect",
    },
  ];

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
          {items.map((item, i) => {
            const connector = connectors.find((conn) => conn.id === item.id);
            if (!connector) return null;

            return (
              <button
                key={i}
                className="group rounded-2xl cursor-pointer"
                onClick={() => connectHandler(connector)}
              >
                <Image
                  src={item.imageSrc}
                  alt={`${item.id} logo`}
                  width={64}
                  height={64}
                  className="group-hover:scale-110 group-active:scale-100 duration-200 aspect-auto"
                />
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
