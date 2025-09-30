import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { fadeUp } from "@/lib/variants";
import { motion } from "motion/react";

export function Title() {
  return (
    <div className="space-y-4 lg:max-w-4xl mx-auto">
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`${fontOrbitron.className} ${mainGradientFont} text-center font-black text-5xl lg:text-[80px]`}
      >
        Referral Program
      </motion.h1>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
        className={`${fontPoppins.className} text-white text-center font-medium text-sm lg:text-xl`}
      >
        Earn up to 15% commission by referring friends to CROMACHAIN. The more
        you refer, the higher your tier and rewards!
      </motion.p>
    </div>
  );
}
