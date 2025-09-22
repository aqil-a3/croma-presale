import { Progress } from "@/components/ui/progress";
import { fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

export function RightSideProgress() {
  return (
    <div className="space-y-2">
      <p
        className={`${fontPoppins.className} text-base font-medium text-right text-white`}
      >
        Next Stage = $0.0455
      </p>
      <ProgressBar />
      <div className={`flex justify-between ${fontPoppins.className}`}>
        <p className="text-white text-base font-medium">Total Raised</p>
        <p className={`${mainGradientFont} text-base font-bold`}>
          27,047,287 OPZ = $894,723.98
        </p>
      </div>
    </div>
  );
}

const ProgressBar = () => {
  const value = 35;
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
