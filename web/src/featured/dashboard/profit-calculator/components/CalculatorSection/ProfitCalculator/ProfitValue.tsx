import { PannelOrangeContainer } from "@/components/layout/container/PanelOrangeContainer";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { cn } from "@/lib/utils";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { formatNumberWithDecimal } from "@/utils/formatNumberWithDecimal";

interface Props {
  currentPrice: number;
  invest: number;
}
export function ProfitValue({ currentPrice, invest }: Props) {
  // TODO : Ini nanti diseting admin
  const futurePrice = 0.01;

  const token = invest / currentPrice;
  const futureValue = token * futurePrice;
  const roi = ((futureValue - invest) / invest) * 100;

  const values: { value: string; label: string }[] = [
    {
      value: formatNumberWithDecimal(token),
      label: "TOKENS",
    },
    {
      value: formatCurrencyWithDecimals(futureValue, "USD", "en-US", 2),
      label: "FUTURE VALUE",
    },
    // {
    //   value: "$100.00",
    //   label: "FUTURE VALUE",
    // },
    {
      value: `${formatNumberWithDecimal(roi)}%`,
      label: "ROI",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {values.map((val, i) => (
        <PannelOrangeContainer key={i} className={cn(i === 2 && "col-span-2")}>
          <p
            className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-2xl`}
          >
            {val.value}
          </p>
          <p
            className={`${fontPoppins.className} text-[#E9E9E9] font-semibold`}
          >
            {val.label}
          </p>
        </PannelOrangeContainer>
      ))}
    </div>
  );
}
