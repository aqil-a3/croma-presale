import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { fadeLeft, fadeRight } from "@/lib/variants";
import { motion } from "motion/react";

export function Title() {
  return (
    <div className="space-y-4">
      <motion.h1
        variants={fadeRight}
        whileInView="visible"
        initial="hidden"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${fontOrbitron.className} ${mainGradientFont} font-black text-4xl lg:text-7xl text-center`}
      >
        Top Buyers
      </motion.h1>
      <motion.p
        variants={fadeLeft}
        whileInView="visible"
        initial="hidden"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${fontPoppins.className} text-sm lg:text-xl text-white font-medium text-center`}
      >
        Discover the biggest CROMACHAIN supporters and their investment journey
      </motion.p>
    </div>
  );
}
