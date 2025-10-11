"use client";

import { ReferralDb } from "@/@types/referrals";
import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";
import { mainGradientFont, PANEL_BG } from "@/config/variables";
import { dummyReferralHistories } from "@/featured/public/referral/dummy/referralHistory";
import { formatDate } from "@/utils/formatDate";
import { shortenAddress } from "@/utils/shortenAddress";
import { motion, type Variants } from "framer-motion";
import { useReferralContext } from "../../../provider";

export interface ReferralHistoryTypes {
  address: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

const mapper = (raw: ReferralDb): ReferralHistoryTypes => ({
  address: raw.wallet_addres,
  date: raw.created_at,
  status: raw.status,
});

const statusLabel: Record<ReferralHistoryTypes["status"], string> = {
  completed: "Confirmed",
  failed: "Failed",
  pending: "Pending",
};

const textColor: Record<ReferralHistoryTypes["status"], string> = {
  completed: "text-green-500",
  failed: "text-red-500",
  pending: "text-amber-500",
};

const borderColor: Record<ReferralHistoryTypes["status"], string> = {
  completed: "border-green-500",
  failed: "border-red-500",
  pending: "border-amber-500",
};

// === Variants ===
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.12,
      // delayChildren: 0.08, // opsional kalau mau jeda sebelum item pertama
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut", delay: 0.04 },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export function History() {
  const { referrals } = useReferralContext();

  const recentReferral =
    referrals.length > 3 ? referrals.map(mapper) : dummyReferralHistories;
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {recentReferral.slice(0, 3).map((history, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          style={{ background: PANEL_BG }}
          className="border border-gray-600 rounded-2xl p-4 flex justify-between items-center"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween" }}
        >
          <div className="space-y-1">
            <p
              className={`${fontPoppins.className} text-white text-base lg:text-xl font-semibold`}
            >
              {shortenAddress(history.address)}
            </p>
            <p
              className={`${fontPoppins.className} text-[#79869B] text-sm lg:text-base font-medium`}
            >
              {formatDate(history.date)}
            </p>
          </div>

          <motion.p
            variants={pillVariants}
            style={{ background: PANEL_BG }}
            className={`${textColor[history.status]} ${
              borderColor[history.status]
            } ${
              fontPoppins.className
            } border rounded-2xl px-4 py-2 font-semibold text-sm lg:text-base`}
          >
            {statusLabel[history.status]}
          </motion.p>
        </motion.div>
      ))}

      <motion.div variants={ctaVariants}>
        <Button
          variant="link"
          className={`${fontPoppins.className} ${mainGradientFont} font-medium text-base mx-auto block`}
        >
          View More
        </Button>
      </motion.div>
    </motion.div>
  );
}
