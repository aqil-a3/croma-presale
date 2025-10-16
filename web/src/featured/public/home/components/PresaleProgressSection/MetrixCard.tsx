"use client";

import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_ORANGE, mainGradientFont } from "@/config/variables";
import { cardVariants, containerVariants } from "@/lib/variants";
import { motion } from "motion/react";
import { usePublicPresaleContext } from "../../provider";
import { formatNumberShort } from "@/utils/formatNumberShort";
import { formatNumber } from "@/utils/formatNumber";

export function MetrixCard() {
  const { activePresale } = usePublicPresaleContext();

  const values: { value: string; label: string }[] = [
    { label: "$CRM Sold", value: formatNumberShort(activePresale.crm_sold) },
    { label: "$CMC Sold", value: formatNumberShort(activePresale.cmc_sold) },
    {
      label: "Potential Value (Global)",
      value: formatNumberShort(activePresale.potential_value),
    },
    {
      label: "Holders Count",
      value: formatNumber(activePresale.headers_count),
    },
  ];
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {values.map((val, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          style={{ background: GRADIENT_ORANGE }}
          className="text-center p-4 border border-orange-500 rounded-2xl backdrop-blur-lg"
        >
          <p
            className={`${mainGradientFont} ${fontOrbitron.className} text-2xl lg:text-4xl font-bold`}
          >
            {val.value}
          </p>
          <p
            className={`${fontPoppins.className} text-sm lg:text-base font-semibold text-white`}
          >
            {val.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
