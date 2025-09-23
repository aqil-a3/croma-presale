import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";

export function HeaderCTAButton() {
  return (
    <div className="hidden md:inline-flex items-center gap-5 relative flex-[0_0_auto]">
      <Button className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 relative flex-[0_0_auto] rounded-[10px] shadow-[0px_2px_20px_#fc640080] bg-[linear-gradient(90deg,rgba(183,34,4,1)_0%,rgba(252,100,0,1)_100%)] hover:bg-[linear-gradient(90deg,rgba(183,34,4,0.9)_0%,rgba(252,100,0,0.9)_100%)] h-auto">
        <div className="relative w-fit mt-[-1.00px] [font-family:'Orbitron',Helvetica] font-semibold text-white text-lg text-center tracking-[0] leading-[normal]">
          Connect Wallet
        </div>
      </Button>

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
