import { fontOrbitron } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link
      href={"/home"}
      className="inline-flex items-center gap-2 md:gap-1 lg:gap-2 relative flex-[0_0_auto]"
    >
      <Image
        className="relative aspect-[1.24] object-cover"
        alt="Image"
        // src="/images/logo.png"
        src="/images/new-logo.png"
        sizes="(max-width: 640px) 28px, (max-width: 768px) 36px, 44px"
        width={44}
        height={35}
      />

      <div className={`${mainGradientFont} ${fontOrbitron.className}`}>
        <span>CROMA</span>

        <span className="font-bold">CHAIN</span>
      </div>
    </Link>
  );
}
