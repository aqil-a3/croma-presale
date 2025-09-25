import { Progress } from "@/components/ui/progress";
import { fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { formatCurrency } from "@/utils/formatCurrency";

export function ProgressBar() {
  return (
    <div className="space-y-4">
      <Title />
      <ProgressBarIndicator value={32} />
      <USDTRaised />
    </div>
  );
}

const Title = () => {
  const currentStage = 27;
  const totalStage = 30;
  const nextConvert = "$0.112";

  return (
    <div className="flex justify-between items-center">
      <p
        className={`${fontPoppins.className} ${mainGradientFont} text-base lg:text-2xl font-bold`}
      >
        1 CRM = $0.108
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
  const usdtData = 10248273;
  return (
    <div
      className={`${fontPoppins.className} flex justify-between items-center`}
    >
      <p className="text-[#FFFFFF99] font-medium text-base lg:text-xl">USDT RAISED</p>
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
