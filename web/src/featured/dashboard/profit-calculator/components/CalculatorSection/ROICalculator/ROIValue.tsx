import { PannelOrangeContainer } from "@/components/layout/container/PanelOrangeContainer";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

const items: { value: string; label: string }[] = [
  {
    value: "$495.00",
    label: "FUTURE VALUE",
  },
  {
    value: "$395.00",
    label: "FUTURE VALUE",
  },
  {
    value: "395.0%",
    label: "ROI",
  },
];

export function ROIValue() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, i) => (
        <PannelOrangeContainer className="px-0.5 py-6 lg:p-4" key={i}>
          <p
            className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-base lg:text-2xl`}
          >
            {item.value}
          </p>
          <p
            className={`${fontPoppins.className} text-[#E9E9E9] text-center text-xs lg:text-base font-semibold`}
          >
            {item.label}
          </p>
        </PannelOrangeContainer>
      ))}
    </div>
  );
}
