import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { Stats } from "./Stats";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/variants";

export function Statistic() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.9 }}
    >
      <PannelContainer>
        <TitleAndSub title="Your Statistic" sub="let's improve your stats" />
        <Stats />
      </PannelContainer>
    </motion.div>
  );
}
