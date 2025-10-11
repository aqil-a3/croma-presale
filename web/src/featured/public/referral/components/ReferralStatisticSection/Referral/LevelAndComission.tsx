import { fontPoppins } from "@/config/fonts";
import { useReferralContext } from "../../../provider";
import { comission } from "../../../comission";

export function LevelAndComission() {
  const { userStatistic } = useReferralContext();
  const level = userStatistic ? userStatistic.current_tier : "Not Loged In";
  const commission = userStatistic ? comission[userStatistic.current_tier] : 0;
  
  return (
    <div className="space-y-4">
      <p
        className={`${fontPoppins.className} text-[#E9E9E9CC] font-medium text-base lg:text-xl`}
      >
        Your level and commission
      </p>
      <div className="flex gap-4">
        <p
          className={`${fontPoppins.className} font-semibold text-sm lg:text-base bg-[#FFFFFF12] py-2 px-6 rounded-2xl border border-gray-600`}
        >
          {level}
        </p>
        <p
          className={`${fontPoppins.className} font-semibold text-sm lg:text-base bg-[#FFFFFF12] py-2 px-6 rounded-2xl border border-gray-600`}
        >
          {commission}% Comission
        </p>
      </div>
    </div>
  );
}
