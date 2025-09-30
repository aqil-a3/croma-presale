import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { History } from "./History";
import { parentVariants } from "@/lib/variants";
import { motion } from "motion/react";

export function RecentReferral() {
  return (
    <motion.div
      className="h-full"
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <PannelContainer>
        <TitleAndSub
          title="Recent Referrals"
          sub="list of the latest referrals you have received"
        />
        <History />
      </PannelContainer>
    </motion.div>
  );
}
