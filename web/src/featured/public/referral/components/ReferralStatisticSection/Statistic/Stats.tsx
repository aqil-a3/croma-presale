import { PannelOrangeContainer } from "@/components/layout/container/PanelOrangeContainer";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { formatCurrency } from "@/utils/formatCurrency";

interface StatusType {
  value: string | number;
  label: string;
}

const items: StatusType[] = [
  {
    label: "Total Referrals",
    value: "11",
  },
  {
    label: "Total Earned",
    value: 51945,
  },
  {
    label: "Current Tier",
    value: "Silver",
  },
  {
    label: "Available to Claim",
    value: 71945,
  },
];

export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, i) => {
        return (
          <PannelOrangeContainer key={i}>
            <p
              className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-xl lg:text-3xl`}
            >
              {typeof item.value === "number"
                ? formatCurrency(item.value)
                : item.value}
            </p>
            <p
              className={`${fontPoppins.className} font-semibold text-white text-sm lg:text-base text-center`}
            >
              {item.label}
            </p>
          </PannelOrangeContainer>
        );
      })}
    </div>
  );
}
