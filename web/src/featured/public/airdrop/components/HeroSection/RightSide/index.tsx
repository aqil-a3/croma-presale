import { PANEL_BG } from "@/config/variables";
import { Title } from "./Title";
import { FormCheckAirdrop } from "./Form";
import { fadeUp } from "@/lib/variants";
import { motion } from "motion/react";

export function RightSide() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
      style={{ background: PANEL_BG }}
      className="backdrop-blur-3xl border border-orange-500 rounded-2xl p-4 lg:p-8 space-y-4 lg:space-y-8"
    >
      <Title />
      <FormCheckAirdrop />
    </motion.div>
  );
}
