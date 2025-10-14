import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";
import React, { useState } from "react";
import { MethodConnect } from "./MethodConnect";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export function HeaderCTAButton() {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const { isConnected } = useAccount();
  const router = useRouter();

  const clickHandler = () => {
    if (isConnected) {
      router.push("/dashboard");
      return;
    }

    setOpenSheet(true)
  };

  return (
    <div className="hidden lg:flex items-center gap-2 lg:gap-5 relative flex-[0_0_auto]">
      <Button
        onClick={clickHandler}
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
      <MethodConnect open={openSheet} setOpen={setOpenSheet} />
    </div>
  );
}
