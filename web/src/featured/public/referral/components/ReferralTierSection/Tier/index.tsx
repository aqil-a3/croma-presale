"use client";

import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { TierStep } from "./TierStep";
import { parentVariants } from "@/lib/variants";
import { motion } from "motion/react";

export function ReferralTier() {
  return (
    <motion.div
      className="h-full items-stretch"
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <PannelContainer className="h-full">
        <TitleAndSub
          title="Referral Tiers & Rewards"
          sub="how your tier is determined"
        />
        <TierStep />
      </PannelContainer>
    </motion.div>
  );
}
