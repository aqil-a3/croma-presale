"use client";

import { fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR_TW, PANEL_BG } from "@/config/variables";
import Image from "next/image";
import { motion } from "framer-motion";
import { cardVariants } from "@/lib/variants";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";
import { Button } from "@/components/ui/button";
import { Info, LucideHandCoins } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { formatNumberShort } from "@/utils/formatNumberShort";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  logoSrc: string;
  currencyName: string;
  type: "CRM" | "USD" | string;
  amount: number;
}

export function CurrencyCard({ amount, currencyName, logoSrc, type }: Props) {
  const amountFormatted =
    type === "USD"
      ? formatCurrency(amount)
      : `${formatNumberShort(amount, { prefix: "", suffix: "" })} ${type}`;
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

      <div className="flex justify-between items-center">
        <p
          className={`${fontPoppins.className} font-semibold text-white text-xl lg:text-4xl`}
        >
          {amountFormatted}
        </p>
        <div className="flex gap-2 items-center">
          <CurrencyPopOver amount={amount} currencyName={currencyName} />
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
      </div>
    </motion.div>
  );
}

const CurrencyPopOver: React.FC<{ amount: number; currencyName: string }> = ({
  amount,
  currencyName,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Info />
      </PopoverTrigger>
      <PopoverContent className={cn(fontPoppins.className, "bg-black border-orange-500 text-white")}>
        <p className="font-semibold">YOUR {currencyName} : </p>
        <p>{amount}</p>
      </PopoverContent>
    </Popover>
  );
};
