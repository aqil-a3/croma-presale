import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAccount, useConnect } from "wagmi";

export function HeaderCTAButton() {
  const router = useRouter();
  const { connectors, connect } = useConnect({
    mutation: {
      onError: (err) => {
        console.error(err);
        toast.error("Something Error");
      },
      onSuccess: () => {
        toast.success("Wallet Connected!");
        router.push("/dashboard");
      },
    },
  });
  const { isConnected } = useAccount();

  const walletConnect = connectors.find(
    (conn) => conn.type === "walletConnect"
  );

  const connectHandler = () => {
    if (isConnected) return router.push("/dashboard");
    if (!walletConnect) return;
    connect({ connector: walletConnect });
  };

  return (
    <div className="hidden lg:flex items-center gap-2 lg:gap-5 relative flex-[0_0_auto]">
      <Button
        onClick={connectHandler}
        className="inline-flex items-center justify-center gap-2.5 px-4 lg:px-8 py-3.5 relative flex-[0_0_auto] rounded-[10px] shadow-[0px_2px_20px_#fc640080] bg-[linear-gradient(90deg,rgba(183,34,4,1)_0%,rgba(252,100,0,1)_100%)] hover:bg-[linear-gradient(90deg,rgba(183,34,4,0.9)_0%,rgba(252,100,0,0.9)_100%)] h-auto"
      >
        <div className="relative w-fit mt-[-1.00px] [font-family:'Orbitron',Helvetica] font-semibold text-white text-base lg:text-lg text-center tracking-[0] leading-[normal]">
          Connect Wallet
        </div>
      </Button>

      <Button
        className={`relative inline-flex items-center justify-center px-[2px] py-[2px] h-[51px] ${fontOrbitron.className} bg-gradient-to-l from-[#B72204] to-[#FC6400] rounded-md`}
      >
        <div className="flex items-center justify-center w-full h-full bg-black rounded-md px-4 lg:px-8 py-3.5">
          Buy Now
        </div>
      </Button>
    </div>
  );
}