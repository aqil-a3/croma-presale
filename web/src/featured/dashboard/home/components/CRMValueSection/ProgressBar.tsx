import { Progress } from "@/components/ui/progress";
import { fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { usePublicPresaleContext } from "@/featured/public/home/provider";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";

export function ProgressBar() {
  const { activePresale } = usePublicPresaleContext();
  const currentValue = activePresale.total_raised;
  const targetValue = activePresale.target_raised;
  const targetPercent = Math.round((currentValue / targetValue) * 100);

  return (
    <div className="space-y-4">
      <Title />
      <ProgressBarIndicator value={targetPercent} />
      <USDTRaised />
    </div>
  );
}

const Title = () => {
  const {activePresale} = usePublicPresaleContext()
  // TODO : Ini masih statis
  const currentStage = 1;
  const totalStage = 30;
  
  const nextConvert = activePresale.next_price_usd;

  return (
    <div className="flex justify-between items-center">
      <p
        className={`${fontPoppins.className} ${mainGradientFont} text-base lg:text-2xl font-bold`}
      >
        1 CRM = {formatCurrencyWithDecimals(activePresale.current_price_usd, "USD", "en-US", 4)}
      </p>
      <p className={`${fontPoppins.className} font-medium text-sm lg:text-xl`}>
        {" "}
        <span className="text-[#FFFFFF80]">
          Stage {currentStage}/{totalStage}
        </span>{" "}
        • Next: {nextConvert}
      </p>
    </div>
  );
};

const USDTRaised = () => {
  const { activePresale } = usePublicPresaleContext();
  const usdtData = activePresale.total_raised;
  return (
    <div
      className={`${fontPoppins.className} flex justify-between items-center`}
    >
      <p className="text-[#FFFFFF99] font-medium text-base lg:text-xl">
        USDT RAISED
      </p>
      <p className={`${mainGradientFont} text-2xl lg:text-3xl font-bold`}>
        {formatCurrency(usdtData)}
      </p>
    </div>
  );
};

const ProgressBarIndicator: React.FC<{ value: number }> = ({ value }) => {
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
