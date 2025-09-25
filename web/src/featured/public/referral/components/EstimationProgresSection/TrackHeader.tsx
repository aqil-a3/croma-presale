import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatNumber } from "@/utils/formatNumber";

interface Props {
  clients: number;
  income: number;
}

export function TrackHeader({ clients, income }: Props) {
  return (
    <div className="mt-4 flex items-start justify-between gap-4">
      <div className={`${fontPoppins.className} text-white/85`}>
        <div className="text-sm">Total accumulated clients</div>
        <div
          className={`${fontOrbitron.className} text-2xl lg:text-5xl text-[#FF6A00] leading-none`}
        >
          {formatNumber(clients)}
        </div>
      </div>
      <div className="text-right">
        <div className={`${fontPoppins.className} text-sm text-white/80`}>
          Your Income Per Month
        </div>
        <div className={`${fontOrbitron.className} text-2xl lg:text-4xl text-[#FF6A00]`}>
          {formatCurrency(income)}
        </div>
      </div>
    </div>
  );
}
