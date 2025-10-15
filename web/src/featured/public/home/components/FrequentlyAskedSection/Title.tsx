import { Button } from "@/components/ui/button";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { CTA_BG } from "@/config/variables";
import { fadeLeft, fadeRight } from "@/lib/variants";
import { motion } from "motion/react";

export function Title() {
  return (
    <div className="relative block md:flex md:flex-row space-y-4 lg:space-y-0 lg:gap-4 justify-between z-10">
      <motion.div
        variants={fadeRight}
        transition={{ duration: 0.6 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-2"
      >
        <h3
          className={`${fontOrbitron.className} text-white text-lg lg:text-4xl font-bold`}
        >
          Frequently Asked Questions
        </h3>
        <p
          className={`${fontPoppins.className} text-[#A6A6A6] text-sm lg:text-xl font-medium `}
        >
          Still have questions? Don&apos;t worry
        </p>
      </motion.div>
      <motion.div
        variants={fadeLeft}
        transition={{ duration: 0.6 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Button
          style={{ background: CTA_BG }}
          className={`${fontOrbitron.className} text-lg py-6 my-auto`}
          onClick={() => {
            window.scrollTo({
              top: 100000,
              behavior: "smooth",
            });
          }}
        >
          Contact Us
        </Button>
      </motion.div>
    </div>
  );
}
