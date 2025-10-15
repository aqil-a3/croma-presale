import { fontPoppins } from "@/config/fonts";
import Image from "next/image";
import { motion } from "motion/react";
import { mainGradientFont } from "@/config/variables";

export function AuditedBy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: "easeInOut" }}
      className={`${fontPoppins.className} mt-4 2xl:mt-8 order-3 font-bold ${mainGradientFont}`}
    >
      <p className="uppercase font-semibold text-sm 2xl:text-base">Audit by:</p>
      <div className="mt-4 flex items-start gap-4">
        <div className="space-y-2">
          <p className="uppercase text-[10px] md:text-xs md:ml-[40px] font-bold bg-gradient-to-r from-[#B72204] to-[#FC6400] bg-clip-text text-transparent text-nowrap">
            coming soon
          </p>
          <Image
            src="/support_logo/cromachain.svg"
            alt="Audit by cromachain"
            width={195}
            height={42}
          />
        </div>
        <div className="space-y-2">
          <p className="uppercase text-[10px] md:text-xs md:ml-[40px] font-bold bg-gradient-to-r from-[#B72204] to-[#FC6400] bg-clip-text text-transparent text-nowrap">
            coming soon
          </p>
          <Image
            src="/support_logo/certik.svg"
            alt="Audit by certik"
            width={155}
            height={38}
          />
        </div>
        <div className="space-y-2">
          <p className="uppercase text-[10px] md:text-xs md:ml-[40px] font-bold bg-gradient-to-r from-[#B72204] to-[#FC6400] bg-clip-text text-transparent text-nowrap">
            coming soon
          </p>
          <Image
            src="/support_logo/solidproof.svg"
            alt="Audit by solidproof"
            width={152}
            height={38}
          />
        </div>
      </div>
    </motion.div>
  );
}
