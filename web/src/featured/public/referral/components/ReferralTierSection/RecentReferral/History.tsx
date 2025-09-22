import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";
import { mainGradientFont, PANEL_BG } from "@/config/variables";
import { dummyReferralHistories } from "@/featured/public/referral/dummy/referralHistory";
import { formatDate } from "@/utils/formatDate";
import { shortenAddress } from "@/utils/shortenAddress";

export interface ReferralHistoryTypes {
  address: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

const statusLabel: Record<ReferralHistoryTypes["status"], string> = {
  completed: "Confirmed",
  failed: "Failed",
  pending: "Pending",
};

const textColor: Record<ReferralHistoryTypes["status"], string> = {
  completed: "text-green-500",
  failed: "text-red-500",
  pending: "text-amber-500",
};

const borderColor: Record<ReferralHistoryTypes["status"], string> = {
  completed: "border-green-500",
  failed: "border-red-500",
  pending: "border-amber-500",
};

export function History() {
  return (
    <div className="space-y-4">
      {dummyReferralHistories.slice(0, 3).map((history, i) => {
        return (
          <div
            style={{ background: PANEL_BG }}
            className="border border-gray-600 rounded-2xl p-4 flex justify-between items-center"
            key={i}
          >
            <div className="space-y-1">
              <p
                className={`${fontPoppins.className} text-white text-xl font-semibold`}
              >
                {shortenAddress(history.address)}
              </p>
              <p
                className={`${fontPoppins.className} text-[#79869B] text-base font-medium`}
              >
                {formatDate(history.date)}
              </p>
            </div>
            <p
              style={{ background: PANEL_BG }}
              className={`${textColor[history.status]} ${
                borderColor[history.status]
              } ${
                fontPoppins.className
              } border rounded-2xl px-4 py-2 font-semibold`}
            >
              {statusLabel[history.status]}
            </p>
          </div>
        );
      })}
      <Button
      variant={"link"}
        className={`${fontPoppins.className} ${mainGradientFont} font-medium text-base mx-auto block`}
      >
        View More
      </Button>
    </div>
  );
}
