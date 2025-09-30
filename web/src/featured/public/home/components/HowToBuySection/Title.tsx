import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { fadeLeft, fadeRight } from "@/lib/variants";
import { motion } from "motion/react";

export function Title() {
  return (
    <>
      <motion.h3
        variants={fadeRight}
        whileInView="visible"
        initial="hidden"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${fontOrbitron.className} text-2xl lg:text-4xl text-white text-center font-bold`}
      >
        How to buy
      </motion.h3>
      <motion.p
        variants={fadeLeft}
        whileInView="visible"
        initial="hidden"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${fontPoppins.className} text-[#A6A6A6] text-xs lg:text-xl text-center font-medium`}
      >
        Buying TICS with ETH, BNB, USDT, USDC or BUSD
      </motion.p>
    </>
  );
}
