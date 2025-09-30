import { LinkAndQR } from "./LinkAndQR";
import { LevelAndComission } from "./LevelAndComission";
import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/variants";

export function Referral() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
    >
      <PannelContainer>
        <TitleAndSub title="Your Referral Link" sub="Share and earn" />
        <LinkAndQR />
        <LevelAndComission />
      </PannelContainer>
    </motion.div>
  );
}
