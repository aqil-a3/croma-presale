import { Progress } from "@/components/ui/progress";
import { fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { usePublicPresaleContext } from "../../../provider";
import { formatNumber } from "@/utils/formatNumber";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";

export function RightSideProgress() {
  const { activePresale } = usePublicPresaleContext();

  const totalRaised = formatNumber(activePresale.total_raised);
  const raisedEqual = formatCurrencyWithDecimals(
    activePresale.total_raised * activePresale.current_price_usd,
    "USD",
    "en-US",
    2
  );
  const nextPriceUsd = formatCurrencyWithDecimals(activePresale.next_price_usd);
  return (
    <div className="space-y-2">
      <p
        className={`${fontPoppins.className} text-sm lg:text-base font-medium text-right text-white`}
      >
        Next Stage = {nextPriceUsd}
      </p>
      <ProgressBar />
      <div className={`flex justify-between ${fontPoppins.className}`}>
        <p className="text-white text-sm lg:text-base font-medium">
          Total Raised
        </p>
        <p className={`${mainGradientFont} text-xs lg:text-base font-bold`}>
          {totalRaised} CRM = {raisedEqual}
        </p>
      </div>
    </div>
  );
}

const ProgressBar = () => {
  const { activePresale } = usePublicPresaleContext();
  const value = Math.ceil(
    (activePresale.total_raised / activePresale.target_raised) * 100
  );
  return (
    <div className="relative">
      <Progress value={value} className="h-[27px] bg-[#323336]" />
      <p
        className={`${fontPoppins.className} text-white text-base font-semibold absolute left-3 top-0.5`}
      >
        {value}%
      </p>
    </div>
  );
};
