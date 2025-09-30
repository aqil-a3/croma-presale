import { fadeRight } from "@/lib/variants";
import { LeftSideCountdown } from "./CountDown";
import { LeftSideText } from "./Text";
import { motion } from "motion/react";

export function LeftSide() {
  return (
    <motion.div
      variants={fadeRight}
      initial="hidden"
      animate="visible"
    >
      <LeftSideText />
      <LeftSideCountdown />
    </motion.div>
  );
}
