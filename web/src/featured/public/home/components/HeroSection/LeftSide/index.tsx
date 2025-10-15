import { fadeRight } from "@/lib/variants";
import { LeftSideCountdown } from "./CountDown";
import { LeftSideText } from "./Text";
import { motion } from "motion/react";
import { AuditedBy } from "./AuditedBy";

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
      <AuditedBy />
    </motion.div>
  );
}
