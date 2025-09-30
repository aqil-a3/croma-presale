"use client";

import { TitleBetweenAndDivider } from "@/components/atoms/title/TitleBetweenAndDivider";
import { PANEL_BG } from "@/config/variables";
import { PriceSection } from "./PriceSection";
import { DetailSection } from "./DetailSection";
import { motion } from "framer-motion";
import { cardContainerVariants, childVariants } from "../../variants";

export function CRMTokenSection() {
  return (
    <motion.section
      style={{ background: PANEL_BG }}
      className="w-full rounded-2xl border-2 border-gray-600 p-4 space-y-4 backdrop-blur-xl"
      variants={cardContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={childVariants}>
        <TitleBetweenAndDivider
          divider={true}
          leftSideText="CRM TOKEN VALUE"
        />
      </motion.div>

      <motion.div variants={childVariants}>
        <PriceSection />
      </motion.div>

      <motion.div variants={childVariants}>
        <DetailSection />
      </motion.div>
    </motion.section>
  );
}
