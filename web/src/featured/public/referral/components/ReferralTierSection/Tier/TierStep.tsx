"use client";

import { fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR, PANEL_BG, PANEL_BG_TW } from "@/config/variables";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";

interface TierStepItemTypes {
  tierName: "Bronze" | "Silver" | "Gold";
  minimumReferral: number;
  commisionPercentage: number;
}

const tierStepItems: TierStepItemTypes[] = [
  { tierName: "Bronze", minimumReferral: 0, commisionPercentage: 5 },
  { tierName: "Silver", minimumReferral: 11, commisionPercentage: 7 },
  { tierName: "Gold", minimumReferral: 20, commisionPercentage: 10 },
];

const tierContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

// card: fade + lift
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// optional: micro-pop untuk badge "Your Tier"
const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut", delay: 0.05 },
  },
};

export function TierStep() {
  const currentTier: TierStepItemTypes["tierName"] = "Silver";

  return (
    <motion.div className="space-y-4" variants={tierContainerVariants}>
      {tierStepItems.map((tier, i) => {
        const isZeroReferral = tier.minimumReferral === 0;
        const isYourTier = tier.tierName === currentTier;

        return (
          <motion.div
            key={i}
            variants={cardVariants}
            style={{ background: isYourTier ? GRADIENT_MAIN_COLOR : PANEL_BG }}
            className={cn(
              "flex justify-between px-2 lg:px-4 py-2 rounded-2xl",
              "backdrop-blur-3xl border border-gray-600 items-center"
            )}
            // opsional: hover feedback ringan
            whileHover={{ scale: 1.01 }}
            transition={{ type: "tween" }}
          >
            <div className="space-y-0.5 lg:space-y-2">
              <div className="flex gap-2 items-center">
                <p
                  className={`${fontPoppins.className} font-semibold text-white text-xl lg:text-2xl my-auto`}
                >
                  {tier.tierName}
                </p>

                {isYourTier && (
                  <motion.span
                    variants={badgeVariants}
                    className="font-medium text-black text-sm bg-white px-4 py-0.5 my-auto rounded-full"
                  >
                    Your Tier
                  </motion.span>
                )}
              </div>

              <p
                className={cn(
                  `${fontPoppins.className} font-semibold text-[#79869B] text-xs lg:text-base`,
                  isYourTier && "text-white"
                )}
              >
                {isZeroReferral ? "No minimum" : tier.minimumReferral} referral
                needed
              </p>
            </div>

            <p
              className={`${fontPoppins.className} text-white font-semibold text-xs lg:text-base ${PANEL_BG_TW} border border-gray-600 px-2 lg:px-4 py-2 rounded-full`}
            >
              {tier.commisionPercentage}% Commision
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
