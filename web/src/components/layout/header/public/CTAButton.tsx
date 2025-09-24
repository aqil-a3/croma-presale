import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";
import { WalletDialog } from "./WalletDialog";

export function HeaderCTAButton() {
  return (
    <div className="hidden md:inline-flex items-center gap-5 relative flex-[0_0_auto]">
      <WalletDialog />

      <Button
        className={`relative inline-flex items-center justify-center px-[2px] py-[2px] h-[51px] ${fontOrbitron.className} bg-gradient-to-l from-[#B72204] to-[#FC6400] rounded-md`}
      >
        <div className="flex items-center justify-center w-full h-full bg-black rounded-md px-8 py-3.5">
          Buy Now
        </div>
      </Button>
    </div>
  );
}