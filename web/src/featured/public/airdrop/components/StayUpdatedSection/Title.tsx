import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { fadeLeft, fadeRight } from "@/lib/variants";
import { motion } from "motion/react";

export function Title() {
  return (
    <div className="space-y-4">
      <motion.h4
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className={`${fontOrbitron.className} ${mainGradientFont} font-semibold text-xl lg:text-3xl text-center`}
      >
        Stay Updated on Airdrop Distribution
      </motion.h4>
      <motion.p
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className={`${fontPoppins.className} text-white text-sm lg:text-xl font-medium text-center`}
      >
        Airdrop distribution details will be announced on our official social
        channels. Join us to get the latest news!
      </motion.p>
    </div>
  );
}
