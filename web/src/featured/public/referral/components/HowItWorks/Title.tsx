"use client";

import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { motion, type Variants } from "framer-motion";

const titleBlockVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.35, ease: "easeOut",
      when: "beforeChildren", staggerChildren: 0.12,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const subVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

export function Title() {
  return (
    <motion.div className="space-y-4" variants={titleBlockVariants}>
      <motion.h3
        variants={headingVariants}
        className={`${fontOrbitron.className} ${mainGradientFont} font-semibold text-2xl lg:text-4xl text-center`}
      >
        How It Works
      </motion.h3>

      <motion.p
        variants={subVariants}
        className={`${fontPoppins.className} font-medium text-base lg:text-xl text-center`}
      >
        How it Referral program works and yo can get earn from here
      </motion.p>
    </motion.div>
  );
}
