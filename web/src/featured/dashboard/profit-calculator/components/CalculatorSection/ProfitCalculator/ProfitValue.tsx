import { PannelOrangeContainer } from "@/components/layout/container/PanelOrangeContainer";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

const dummyValues: { value: string; label: string }[] = [
  {
    value: "111",
    label: "TOKENS",
  },
  {
    value: "$200.00",
    label: "FUTURE VALUE",
  },
  {
    value: "$100.00",
    label: "FUTURE VALUE",
  },
  {
    value: "100%",
    label: "ROI",
  },
];

export function ProfitValue() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {dummyValues.map((val, i) => (
        <PannelOrangeContainer key={i}>
          <p
            className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-2xl`}
          >
            {val.value}
          </p>
          <p
            className={`${fontPoppins.className} text-[#E9E9E9] font-semibold`}
          >
            {val.label}
          </p>
        </PannelOrangeContainer>
      ))}
    </div>
  );
}
