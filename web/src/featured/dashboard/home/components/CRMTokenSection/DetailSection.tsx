import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_ORANGE, mainGradientFont } from "@/config/variables";

const dummyData = [
  {
    value: "18 CRM",
    label: "TOTAL SUPPLY",
  },
  {
    value: "40%",
    label: "PRESALE",
  },
  {
    value: "25%",
    label: "STAKING APY",
  },
  {
    value: "4+",
    label: "FEATURES",
  },
];

export function DetailSection() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {dummyData.map((data, i) => (
        <div
          key={i}
          style={{ background: GRADIENT_ORANGE }}
          className="border border-orange-500 backdrop-blur-lg rounded-2xl p-4 text-center space-y-2"
        >
          <p className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-2xl`}>{data.value}</p>
          <p className={`${fontPoppins.className} text-[#E9E9E9] font-semibold`}>{data.label}</p>
        </div>
      ))}
    </div>
  );
}
