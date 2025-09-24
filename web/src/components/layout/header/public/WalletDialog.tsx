import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { WalletOptions } from "@/services/wagmi/WalletOptions";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";

export function WalletDialog() {
  const hasHydrated = useHasHydrated();
  const { isConnected, address } = useAccount();

  if (!hasHydrated) {
    return (
      <Button
        disabled
        className="animate-pulse w-40 h-10 rounded-md bg-gray-300"
      >
        &nbsp;
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 relative flex-[0_0_auto] rounded-[10px] shadow-[0px_2px_20px_#fc640080] bg-[linear-gradient(90deg,rgba(183,34,4,1)_0%,rgba(252,100,0,1)_100%)] hover:bg-[linear-gradient(90deg,rgba(183,34,4,0.9)_0%,rgba(252,100,0,0.9)_100%)] h-auto">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Orbitron',Helvetica] font-semibold text-white text-lg text-center tracking-[0] leading-[normal]">
            {isConnected ? "Connected" : "Connect Wallet"}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{ background: PANEL_BG }}
        className="backdrop-blur-3xl"
      >
        <DialogHeader>
          <DialogTitle
            className={`${fontOrbitron.className} text-white text-center`}
          >
            {isConnected ? "Connected Wallet" : "Connect Wallet"}
          </DialogTitle>
          <DialogDescription
            className={`${fontPoppins.className} text-white/80 text-center`}
          >
            {isConnected
              ? `You've connected to wallet address ${address}`
              : "Select connection method that you want to use"}
          </DialogDescription>
        </DialogHeader>

        {isConnected ? <ConnectedComp /> : <WalletOptions />}
      </DialogContent>
    </Dialog>
  );
}

const ConnectedComp = () => {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push("/dashboard")} variant={"outline"}>
        Dashboard
      </Button>
      <Button onClick={() => disconnect()} variant={"outline"}>
        Disconnect Wallet
      </Button>
    </>
  );
};
