import { fontOrbitron } from "@/config/fonts";
import Image from "next/image";

export function Logo() {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <Image
        src={"/images/cromacoin-1.png"}
        width={148}
        height={116}
        alt="Cromachoin logo"
      />
      <div
        className={`relative w-fit bg-[linear-gradient(90deg,rgba(183,34,4,1)_0%,rgba(252,100,0,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] ${fontOrbitron.className} font-normal text-transparent text-xl tracking-[0] leading-[normal]`}
      >
        <span className="text-black">CROMA</span>

        <span className="font-bold text-black">CHAIN</span>
      </div>
    </div>
  );
}
