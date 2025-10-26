"use client";

import { TitleBetweenAndDivider } from "@/components/atoms/title/TitleBetweenAndDivider";
import { PANEL_BG } from "@/config/variables";
import { Logo } from "./Logo";
import { BuyCRM } from "./BuyCRM";
import { motion } from "framer-motion";
import { cardContainerVariants, childVariants } from "../../variants";
import { usePublicPresaleContext } from "@/featured/public/home/provider";
import { Lock } from "lucide-react";

export function BuyCRMSection() {
  const { activePresale, isLive } = usePublicPresaleContext();

  return (
    <motion.section
      style={{ background: PANEL_BG }}
      className="relative w-full rounded-2xl border-2 border-gray-600 p-4 space-y-4 backdrop-blur-xl overflow-hidden"
      variants={cardContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={childVariants}>
        <TitleBetweenAndDivider
          divider={true}
          leftSideText="CRM TOKEN VALUE"
          rightSideText={`Stage ${activePresale.stage} - Phase ${activePresale.phase}`}
        />
      </motion.div>

      <motion.div variants={childVariants}>
        <Logo />
      </motion.div>

      <motion.div variants={childVariants}>
        <BuyCRM />
      </motion.div>

      {/* 🔒 Overlay when presale is not live */}
      {!isLive && <LockedOverlay /> }
    </motion.section>
  );
}

const LockedOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-md bg-black/80"
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="bg-white/10 p-4 rounded-full border border-white/20">
          <Lock size={40} className="text-white" />
        </div>
        <p className="text-white font-semibold text-lg">
          Presale has not started yet
        </p>
        <p className="text-white/70 text-sm">Please wait until the live time</p>
      </div>
    </motion.div>
  );
};
