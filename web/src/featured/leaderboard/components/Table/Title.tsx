import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { formatNumber } from "@/utils/formatNumber";

export function TableTitle() {
  const totalBuyers = 17_618;
  return (
    <div className="space-y-4">
      <h3
        className={`${fontOrbitron.className} font-semibold text-white text-center text-4xl`}
      >
        Rankings Top Buyers
      </h3>
      <p
        className={`${fontPoppins.className} text-white font-medium text-xl text-center`}
      >
        From{" "}
        <span className={`${mainGradientFont} font-bold text-[32px]`}>
          {formatNumber(totalBuyers)}
        </span>{" "}
        All time Buyers
      </p>
    </div>
  );
}
