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
          <div
            style={{
              background: `linear-gradient(0deg, rgba(40, 50, 65, 0), rgba(40, 50, 65, 0)), linear-gradient(0deg, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.34)), linear-gradient(0deg, rgba(252, 100, 0, 0.08), rgba(252, 100, 0, 0.08))`,
              backdropFilter: "blur(20px)",
            }}
            key={i}
            className="text-center p-4 border border-orange-500 rounded-2xl space-y-2"
          >
            <p
              className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-3xl`}
            >
              {typeof item.value === "number"
                ? formatCurrency(item.value)
                : item.value}
            </p>
            <p
              className={`${fontPoppins.className} font-semibold text-white text-base`}
            >
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
