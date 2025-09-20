import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

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
    <div className={`grid grid-cols-4 gap-4`}>
      {values.map((val, index) => (
        <div
          style={{
            background: `linear-gradient(0deg, rgba(40, 50, 65, 0), rgba(40, 50, 65, 0)), linear-gradient(0deg, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.34)), linear-gradient(0deg, rgba(252, 100, 0, 0.08), rgba(252, 100, 0, 0.08))`,
            backdropFilter: "blur(20px)"
          }}
          key={index}
          className="text-center p-4 border border-orange-500 rounded-2xl"
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
