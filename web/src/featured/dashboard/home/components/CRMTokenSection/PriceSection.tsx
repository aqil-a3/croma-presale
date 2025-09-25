import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_ORANGE, mainGradientFont } from "@/config/variables";

export function PriceSection() {
  const dummyData = [
    {
      price: "$0.108",
      desc: "Stage 27 - Phase 9",
      textColor: mainGradientFont,
      priceName: "CURRENT PRICE",
    },
    {
      price: "$0.300",
      desc: "+177% ROI",
      textColor: "text-[#21DB10]",
      priceName: "LAUNCH PRICE",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {dummyData.map((data, i) => (
        <div
          key={i}
          style={{ background: GRADIENT_ORANGE }}
          className="border border-orange-500 backdrop-blur-lg rounded-2xl p-2 lg:p-4 text-center space-y-2"
        >
          <p
            className={`${fontOrbitron.className} ${mainGradientFont} text-lg lg:text-2xl font-bold`}
          >
            {data.price}
          </p>
          <p
            className={`${fontPoppins.className} ${data.textColor} font-semibold text-xs`}
          >
            {data.desc}
          </p>
          <p
            className={`${fontPoppins.className} text-white font-semibold text-base`}
          >
            {data.priceName}
          </p>
        </div>
      ))}
    </div>
  );
}
