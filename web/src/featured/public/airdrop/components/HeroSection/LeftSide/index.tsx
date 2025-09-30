import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { fadeUp } from "@/lib/variants";
import { motion } from "motion/react";

export function LeftSide() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`${fontOrbitron.className} ${mainGradientFont} font-black text-center md:text-start text-5xl lg:text-7xl leading-16 lg:leading-24`}
      >
        Check Your Airdrop Eligibility
      </motion.h1>
      <motion.p
      variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
        className={`${fontPoppins.className} text-white font-medium lg:text-base text-sm text-center lg:text-start`}
      >
        Enter your Ethereum address to check if you are eligible for the
        CromaChain Airdrop.
      </motion.p>
    </div>
  );
}
