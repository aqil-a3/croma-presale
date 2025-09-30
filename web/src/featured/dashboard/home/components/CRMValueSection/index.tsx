"use client";

import { TitleBetweenAndDivider } from "@/components/atoms/title/TitleBetweenAndDivider";
import { PANEL_BG } from "@/config/variables";
import { ProgressBar } from "./ProgressBar";
import { PresaleEnds } from "./PresaleEnds";
import { motion } from "framer-motion";
import { cardContainerVariants, childVariants } from "../../variants";

export function CRMValueSection() {
  return (
    <motion.div
      style={{ background: PANEL_BG }}
      className="w-full rounded-2xl border-2 border-gray-600 p-4 space-y-2 backdrop-blur-xl h-full"
      variants={cardContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={childVariants}>
        <TitleBetweenAndDivider
          divider={true}
          leftSideText="CRM VALUE"
          rightSideText="Stage 27 - Phase 9"
        />
      </motion.div>

      <motion.div variants={childVariants}>
        <ProgressBar />
      </motion.div>

      <motion.div variants={childVariants}>
        <PresaleEnds />
      </motion.div>
    </motion.div>
  );
}
