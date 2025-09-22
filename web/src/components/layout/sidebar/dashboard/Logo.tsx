import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function LogoSidebar({ open }: { open: boolean }) {
  return (
    <div
      className={cn(
        `flex items-center gap-3 p-2 rounded-md hover:bg-neutral-800 cursor-pointer transition-colors`,
        open ? "justify-start" : "justify-center"
      )}
    >
      <Image
        src={"/images/logo.png"}
        alt="Logo Cromachain"
        height={64}
        width={52}
        className="object-cover"
      />

      {open && (
        <div className="flex flex-col">
          <p className={`${fontOrbitron.className} ${mainGradientFont} font-extrabold text-xl whitespace-nowrap`}>Cromachain</p>
          <p className={`${fontPoppins.className} text-[#B72204] font-semibold text-sm tracking-[0.3rem]`}>PRESALE</p>
        </div>
      )}
    </div>
  );
}
