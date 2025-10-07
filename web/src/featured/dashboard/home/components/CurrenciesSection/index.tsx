"use client";

import React from "react";
import { CurrencyCard } from "./CurrencyCard";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/variants";
import { InvestmentSummary } from "@/@types/investment";

interface CurrencyItems {
  logoSrc: string;
  currencyName: string;
  type: "CRM" | "USD";
  amount: number;
}


interface Props{
  investment:InvestmentSummary
}

export function CurrenciesSection({investment}:Props) {
  const items: CurrencyItems[] = [
    { currencyName: "$CRM BALANCE", amount: investment.invested_usd, type: "USD", logoSrc: "/logo/dashboard-invested.png" },
    { currencyName: "$CMC BALANCE", amount: investment.crm_owned, type: "CRM", logoSrc: "/logo/croma.png" },
    { currencyName: "CURRENT VALUE", amount: 712.42, type: "USD", logoSrc: "/logo/dashboard-crm-worth.png" },
    { currencyName: "REFERRAL EARNINGS", amount: 243.42, type: "USD", logoSrc: "/logo/dashboard-referral-earning.png" },
  ];
  return (
    <motion.section
      className="relative grid grid-cols-2 md:grid-cols-4 z-10 gap-2 lg:gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item, i) => (
        <CurrencyCard {...item} key={i} />
      ))}
    </motion.section>
  );
}
