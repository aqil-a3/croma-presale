import { fontOrbitron } from "@/config/fonts";
import { ProgressBar } from "./ProgressBar";
import { MetrixCard } from "./MetrixCard";
import Image from "next/image";
import { Background } from "./Background";
import { Decor } from "./Decor";
import { PANEL_BG } from "@/config/variables";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/variants";

export function PresaleProgressSection() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative w-full"
    >
      <Background />
      <Decor />
      <div
        style={{
          background: PANEL_BG,
        }}
        className="w-full z-10 p-4 border border-orange-500/50 rounded-2xl space-y-6 relative mt-4 lg:mt-32"
      >
        <Image
          src={"/images/cromacoin-1.png"}
          alt="Cromacoin"
          width={240}
          height={223}
          className="hidden lg:block absolute right-0 top-0 -translate-y-32"
        />
        <Image
          src={"/images/cromacoin-1.png"}
          alt="Cromacoin"
          width={80}
          height={40}
          className="block lg:hidden absolute right-0 top-0 -translate-y-[0%] translate-x-[10%]"
        />
        <h2
          className={`${fontOrbitron.className} text-center text-white font-semibold text-lg lg:text-4xl`}
        >
          Presale Progress & <br /> Metrics
        </h2>
        <ProgressBar />
        <MetrixCard />
      </div>
    </motion.section>
  );
}
