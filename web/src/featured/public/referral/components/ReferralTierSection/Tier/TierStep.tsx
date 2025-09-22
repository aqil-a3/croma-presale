import { fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR, PANEL_BG, PANEL_BG_TW } from "@/config/variables";
import { cn } from "@/lib/utils";

interface TierStepItemTypes {
  tierName: "Bronze" | "Silver" | "Gold";
  minimumReferral: number;
  commisionPercentage: number;
}

const tierStepItems: TierStepItemTypes[] = [
  {
    tierName: "Bronze",
    minimumReferral: 0,
    commisionPercentage: 5,
  },
  {
    tierName: "Silver",
    minimumReferral: 11,
    commisionPercentage: 7,
  },
  {
    tierName: "Gold",
    minimumReferral: 20,
    commisionPercentage: 10,
  },
];

export function TierStep() {
  const currentTier: TierStepItemTypes["tierName"] = "Silver";

  return (
    <div className="space-y-4">
      {tierStepItems.map((tier, i) => {
        const isZeroReferral = tier.minimumReferral === 0;
        const isYourTier = tier.tierName === currentTier;

        return (
          <div
            key={i}
            style={{ background: isYourTier ? GRADIENT_MAIN_COLOR : PANEL_BG }}
            className={cn(
              `flex justify-between px-4 py-2 rounded-2xl backdrop-blur-3xl border border-gray-600 items-center`
            )}
          >
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <p
                  className={`${fontPoppins.className} font-semibold text-white text-2xl my-auto`}
                >
                  {tier.tierName}
                </p>
                {isYourTier && (
                  <span className="font-medium text-black text-sm bg-white px-4 py-0.5 my-auto rounded-full">
                    Your Tier
                  </span>
                )}
              </div>
              <p
                className={cn(
                  `${fontPoppins.className} font-semibold text-[#79869B] text-base`,
                  isYourTier && "text-white"
                )}
              >
                {isZeroReferral ? "No minimum" : tier.minimumReferral} referral
                needed
              </p>
            </div>

            <p
              className={`${fontPoppins.className} text-white font-semibold text-base ${PANEL_BG_TW} border border-gray-600 px-4 py-2 rounded-full`}
            >
              {tier.commisionPercentage}% Commision
            </p>
          </div>
        );
      })}
    </div>
  );
}
