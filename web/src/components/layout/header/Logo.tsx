import { fontOrbitron } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link
      href={"/"}
      className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
    >
      <Image
        className="relative aspect-[1.24] object-cover"
        alt="Image"
        src="/images/logo.png"
        width={44}
        height={35}
      />

      <div
        className={`relative w-fit bg-[linear-gradient(90deg,rgba(183,34,4,1)_0%,rgba(252,100,0,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] ${fontOrbitron.className} font-normal text-transparent text-xl tracking-[0] leading-[normal]`}
      >
        <span className="text-black">CROMA</span>

        <span className="font-bold text-black">CHAIN</span>
      </div>
    </Link>
  );
}
