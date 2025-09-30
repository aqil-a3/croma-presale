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
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <LeftSideText />
      <LeftSideCountdown />
    </motion.div>
  );
}
