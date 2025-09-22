import { fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";

interface Props {
  logoSrc: string;
  currencyName: string;
  type: "CRM" | "USD";
  amount: number;
}

export function CurrencyCard({ amount, currencyName, logoSrc, type }: Props) {
  const amountFormatted =
    type === "CRM" ? `${amount} CRM` : formatCurrency(amount);
  return (
    <div
      style={{ background: PANEL_BG }}
      className="rounded-2xl border-2 border-gray-500 p-4 space-y-4 backdrop-blur-xl"
    >
      <div className="flex gap-4 items-center">
        <Image src={logoSrc} alt={currencyName} width={42} height={42} />
        <p
          className={`${fontPoppins.className} font-medium text-base text-[#FFFFFFCC]`}
        >
          {currencyName}
        </p>
      </div>
      <p
        className={`${fontPoppins.className} font-semibold text-white text-4xl`}
      >
        {amountFormatted}
      </p>
    </div>
  );
}
