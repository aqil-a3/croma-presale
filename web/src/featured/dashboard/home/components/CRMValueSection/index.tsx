"use client";

import { TitleBetweenAndDivider } from "@/components/atoms/title/TitleBetweenAndDivider";
import { PANEL_BG } from "@/config/variables";
import { ProgressBar } from "./ProgressBar";
import { PresaleEnds } from "./PresaleEnds";
import { motion } from "framer-motion";
import { cardContainerVariants, childVariants } from "../../variants";
import { usePublicPresaleContext } from "@/featured/public/home/provider";
import { Lock } from "lucide-react";

export function CRMValueSection() {
  const { activePresale, isLive } = usePublicPresaleContext();
  const { phase, stage } = activePresale;

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
          rightSideText={`Stage ${stage} - Phase ${phase}`}
          isBlur={!isLive}
        />
      </motion.div>

      <motion.div variants={childVariants} className="relative">
        {!isLive && <LockedOverlay /> }
        <ProgressBar />
      </motion.div>

      <motion.div variants={childVariants}>
        <PresaleEnds />
      </motion.div>
    </motion.div>
  );
}

const LockedOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-3xl bg-black/80"
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="bg-white/10 p-4 rounded-full border border-white/20">
          <Lock size={40} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
};
