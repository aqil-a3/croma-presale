import { fontPoppins } from "@/config/fonts";

export function LevelAndComission() {
  const level = "Silver";
  const commission = 7;
  return (
    <div className="space-y-4">
      <p
        className={`${fontPoppins.className} text-[#E9E9E9CC] font-medium text-xl`}
      >
        Your level and commission
      </p>
      <div className="flex gap-4">
        <p
          className={`${fontPoppins.className} font-semibold text-base bg-[#FFFFFF12] py-2 px-6 rounded-2xl border border-gray-600`}
        >
          {level}
        </p>
        <p
          className={`${fontPoppins.className} font-semibold text-base bg-[#FFFFFF12] py-2 px-6 rounded-2xl border border-gray-600`}
        >
          {commission}% Comission
        </p>
      </div>
    </div>
  );
}
