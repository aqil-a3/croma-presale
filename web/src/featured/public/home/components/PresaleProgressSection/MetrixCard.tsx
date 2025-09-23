import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_ORANGE, mainGradientFont } from "@/config/variables";

const values: { value: string; label: string }[] = [
  {
    label: "$CRM Sold",
    value: "$1M+",
  },
  {
    label: "$CMC Sold",
    value: "$2M+",
  },
  {
    label: "Potential Value (Global)",
    value: "$18M+",
  },
  {
    label: "Holders Count",
    value: "12,453",
  },
];

export function MetrixCard() {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4`}>
      {values.map((val, index) => (
        <div
          style={{
            background: GRADIENT_ORANGE,
          }}
          key={index}
          className="text-center p-4 border border-orange-500 rounded-2xl backdrop-blur-lg"
        >
          <p
            className={`${mainGradientFont} ${fontOrbitron.className} text-[40px] font-bold`}
          >
            {val.value}
          </p>
          <p className={`${fontPoppins.className} font-semibold text-white`}>
            {val.label}
          </p>
        </div>
      ))}
    </div>
  );
}
