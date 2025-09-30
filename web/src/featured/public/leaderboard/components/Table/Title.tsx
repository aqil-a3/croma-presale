import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { fadeUp } from "@/lib/variants";
import { formatNumber } from "@/utils/formatNumber";
import { motion } from "motion/react";

export function TableTitle() {
  const totalBuyers = 17_618;
  return (
    <div className="space-y-4">
      <motion.h3
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4, delay: 0.6 }}
        viewport={{ once: true }}
        className={`${fontOrbitron.className} font-semibold text-white text-center text-xl lg:text-4xl`}
      >
        Rankings Top Buyers
      </motion.h3>
      <motion.p
       variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4, delay: 0.8 }}
        viewport={{ once: true }}
        className={`${fontPoppins.className} text-white font-medium text-base lg:text-xl text-center`}
      >
        From{" "}
        <span className={`${mainGradientFont} font-bold text-2xl lg:text-3xl`}>
          {formatNumber(totalBuyers)}
        </span>{" "}
        All time Buyers
      </motion.p>
    </div>
  );
}
