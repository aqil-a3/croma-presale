import { Title } from "./Title";
import { StayTunedForm } from "./Form";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/variants";

export function Staytuned() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative w-[95%] lg:w-3/4 mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 gap-2 lg:gap-6 rounded-2xl p-8 lg:p-12 bg-gradient-to-r from-[#B72204] to-[#FC6400]"
    >
      {/* kiri */}
      <div className="relative z-10">
        <Title />
        <StayTunedForm />
      </div>

      <figure className="relative block mx-auto lg:absolute top-0 right-0 translate-none lg:-translate-y-[20%] lg:translate-x-[1%] w-full min-h-[220px] sm:min-h-[260px] lg:min-h-[320px] xl:min-h-[500px]">
        <Image
          src="/images/staytuned-section.png"
          alt="Stay tuned image"
          fill
          priority
          className="object-contain object-center lg:object-right"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </figure>
    </motion.div>
  );
}
