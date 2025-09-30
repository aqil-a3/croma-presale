import { PANEL_BG } from "@/config/variables";
import { Title } from "./Title";
import { SocialMedia } from "./SocialMedia";
import { fadeUp } from "@/lib/variants";
import { motion } from "motion/react";

export function StayUpdatedSection() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ background: PANEL_BG }}
      className="w-full lg:max-w-7xl py-8 px-4 lg:px-56 border border-orange-500 rounded-2xl space-y-8"
    >
      <Title />
      <SocialMedia />
    </motion.section>
  );
}
