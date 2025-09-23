import { Progress } from "@/components/ui/progress";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

export function ProgressBar() {
  const currentValue = 6_450_000;
  const targetValue = 20_450_000;
  const value = Math.round((currentValue / targetValue) * 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className={`${fontOrbitron.className}`}>
          <p className="text-white text-base lg:text-xl font-medium">Current</p>
          <p className={`${mainGradientFont} text-xl lg:text-4xl font-bold`}>
            {formatCurrency(currentValue)}
          </p>
        </div>
        <div className={`${fontOrbitron.className}`}>
          <p className="text-white text-base lg:text-xl font-medium text-right">
            Target Raise
          </p>
          <p className={`${mainGradientFont} text-xl lg:text-4xl font-bold`}>
            {formatCurrency(targetValue)}
          </p>
        </div>
      </div>
      <ProgressBarIndicator value={value} />
    </div>
  );
}

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
