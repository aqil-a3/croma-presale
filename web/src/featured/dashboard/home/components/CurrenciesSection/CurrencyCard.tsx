"use client";

import { fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR_TW, PANEL_BG } from "@/config/variables";
import Image from "next/image";
import { motion } from "framer-motion";
import { cardVariants } from "@/lib/variants";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideHandCoins } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  logoSrc: string;
  currencyName: string;
  type: "CRM" | "USD" | string;
  amount: number;
}

export function CurrencyCard({ amount, currencyName, logoSrc, type }: Props) {
  const amountFormatted =
    type === "USD" ? formatCurrency(amount) : `${amount} ${type}`;
  const isReferral = currencyName === "REFERRAL EARNINGS";

  return (
    <motion.div
      variants={cardVariants}
      style={{ background: PANEL_BG }}
      className="rounded-2xl border-2 border-gray-500 p-2 lg:p-4 space-y-4 backdrop-blur-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <div className="flex gap-2 lg:gap-4 items-center">
        <div className="relative w-6 h-6 lg:w-10 lg:h-10">
          <Image
            src={logoSrc}
            alt={currencyName}
            fill
            className="object-contain"
          />
        </div>
        <p
          className={`${fontPoppins.className} font-medium text-xs lg:text-base text-[#FFFFFFCC]`}
        >
          {currencyName}
        </p>
      </div>

      <div className="flex justify-between">
        <p
          className={`${fontPoppins.className} font-semibold text-white text-xl lg:text-4xl`}
        >
          {amountFormatted}
        </p>
        {isReferral && (
          <Button
            size={"icon"}
            className={cn(GRADIENT_MAIN_COLOR_TW)}
            onClick={() => toast.info("Claim is under development")}
          >
            <LucideHandCoins />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
