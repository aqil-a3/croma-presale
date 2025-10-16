import { fontPoppins } from "@/config/fonts";
import Image from "next/image";
import { usePublicPresaleContext } from "../../../provider";

export function RightSidePaymentMethod() {
  const { paymentMethods } = usePublicPresaleContext();

  return (
    <div className="space-y-4">
      <p
        className={`text-white text-center ${fontPoppins.className} font-semibold`}
      >
        We Accepting
      </p>
      <div className="flex justify-center gap-2 lg:gap-4">
        {paymentMethods.value.map((icon, i) => (
          <Image
            src={`https://nowpayments.io${icon.icon}`}
            alt={`${icon.icon} Logo`}
            width={24}
            height={24}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
