"use client";

import { fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { motion, type Variants } from "framer-motion";

interface WorksStepItemType {
  title: string;
  description: string;
}

const worksStepItems: WorksStepItemType[] = [
  {
    title: "Share Your Link",
    description:
      "Copy your unique referral link and share it with friends, family, or on social media.",
  },
  {
    title: "Friends Purchase",
    description:
      "When someone uses your link to buy CROMA tokens, you earn a commission based on your tier.",
  },
  {
    title: "Earn Rewards",
    description:
      "Claim your earnings anytime and watch your tier level increase with more referrals.",
  },
];

const stepsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.12 },
  },
};

const stepCardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: -2, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.22, ease: "easeOut", delay: 0.04 },
  },
};

export function WorksStep() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={stepsContainerVariants}
    >
      {worksStepItems.map((item, i) => (
        <motion.div
          key={i}
          variants={stepCardVariants}
          style={{ background: PANEL_BG }}
          className={`border border-gray-600 rounded-2xl px-4 py-8 ${fontPoppins.className} space-y-2 lg:space-y-4`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween" }}
        >
          <motion.p
            variants={badgeVariants}
            className="backdrop-blur-2xl bg-[#FFFFFF12] w-fit px-4.5 py-2 rounded-full border border-gray-600 font-medium text-xl"
          >
            {i + 1}
          </motion.p>

          <p className="font-semibold text-xl lg:text-2xl">{item.title}</p>
          <p className="font-medium text-base lg:text-xl text-[#E9E9E999]">
            {item.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
