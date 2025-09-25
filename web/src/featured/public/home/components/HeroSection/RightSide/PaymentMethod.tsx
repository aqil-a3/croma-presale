import { fontPoppins } from "@/config/fonts";
import Image from "next/image";

const paymentMethodIcons: { src: string; alt: string }[] = [
  {
    src: "/logo/binance.png",
    alt: "logo binance",
  },
  {
    src: "/logo/bitcoin.png",
    alt: "logo bitcoin",
  },
  {
    src: "/logo/compound.png",
    alt: "logo compound",
  },
  {
    src: "/logo/eth.png",
    alt: "logo eth",
  },
  {
    src: "/logo/fabric.png",
    alt: "logo fabric",
  },
  {
    src: "/logo/ox.png",
    alt: "logo ox",
  },
  {
    src: "/logo/solana.png",
    alt: "logo solana",
  },
  {
    src: "/logo/trx.png",
    alt: "logo trx",
  },
  {
    src: "/logo/tusd.png",
    alt: "logo tusd",
  },
  {
    src: "/logo/xrp.png",
    alt: "logo xrp",
  },
];

export function RightSidePaymentMethod() {
  return (
    <div className="space-y-4">
      <p
        className={`text-white text-center ${fontPoppins.className} font-semibold`}
      >
        We Accepting
      </p>
      <div className="flex justify-center gap-2 lg:gap-4">
        {paymentMethodIcons.map((icon) => (
          <Image
            height={32}
            width={32}
            src={icon.src}
            alt={icon.alt}
            key={icon.alt}
          />
        ))}
      </div>
    </div>
  );
}
