import { PannelOrangeContainer } from "@/components/layout/container/PanelOrangeContainer";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { formatNumberWithDecimal } from "@/utils/formatNumberWithDecimal";

interface Props {
  price: number;
  invest: number;
  tokenCRM: number;
}
export function ROIValue({ invest, price, tokenCRM }: Props) {
  const futureValue = tokenCRM * price;
  const roi = ((futureValue - invest) / invest) * 100;

  const items: { value: string; label: string }[] = [
    {
      value: formatCurrencyWithDecimals(futureValue, "USD", "en-US", 2),
      label: "FUTURE VALUE",
    },
    // {
    //   value: "$395.00",
    //   label: "FUTURE VALUE",
    // },
    {
      value: `${formatNumberWithDecimal(roi)}%`,
      label: "ROI",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, i) => (
        <PannelOrangeContainer className="px-0.5 py-6 lg:p-4" key={i}>
          <p
            className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-base lg:text-2xl`}
          >
            {item.value}
          </p>
          <p
            className={`${fontPoppins.className} text-[#E9E9E9] text-center text-xs lg:text-base font-semibold`}
          >
            {item.label}
          </p>
        </PannelOrangeContainer>
      ))}
    </div>
  );
}
