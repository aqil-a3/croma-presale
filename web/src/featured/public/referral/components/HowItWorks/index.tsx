"use client";

import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { Title } from "./Title";
import { WorksStep } from "./WorksStep";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

export function HowItWorksSection() {
  return (
    <PannelContainer className="h-full">
      <motion.div
        className="h-full"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <Title />
        <WorksStep />
      </motion.div>
    </PannelContainer>
  );
}
