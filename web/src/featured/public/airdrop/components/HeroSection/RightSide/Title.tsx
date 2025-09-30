import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { fadeDown } from "@/lib/variants";
import { motion } from "motion/react";

export function Title() {
  return (
    <div className="space-y-2">
      <motion.h3
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut", delay: 1 }}
        className={`${fontOrbitron.className} text-white font-semibold text-2xl lg:text-4xl text-center`}
      >
        Get Started Now
      </motion.h3>
      <motion.p
      variants={fadeDown}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut", delay: 1.2 }}
        className={`${fontPoppins.className} text-[#E9E9E9CC] text-base lg:text-xl font-medium text-center`}
      >
        Enter your Ethereum address to check
      </motion.p>
    </div>
  );
}
