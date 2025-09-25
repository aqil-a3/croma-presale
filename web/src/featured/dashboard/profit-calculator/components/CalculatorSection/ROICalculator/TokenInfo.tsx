import { fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";

interface Props {
  title: string;
  value: number;
  currency: string;
}

export function TokenInfo({ title, value, currency }: Props) {
  return (
    <div className="space-y-2">
      <p className={`${fontPoppins.className} font-medium text-base lg:text-xl`}>{title}</p>
      <div
        style={{ background: PANEL_BG }}
        className="backdrop-blur-3xl border border-gray-600 rounded-2xl py-2 px-4 flex justify-between items-center"
      >
        <p className={`${fontPoppins.className} font-bold text-sm lg:text-base`}>
          {value}
        </p>
        <p
          className={`${fontPoppins.className} font-bold text-xs lg:text-sm px-4 py-2 bg-[#FFFFFF12] rounded-full border border-gray-600`}
        >
          {currency}
        </p>
      </div>
    </div>
  );
}
