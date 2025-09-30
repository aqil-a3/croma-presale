"use client";

import React from "react";
import { CurrencyCard } from "./CurrencyCard";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/variants";

interface CurrencyItems {
  logoSrc: string;
  currencyName: string;
  type: "CRM" | "USD";
  amount: number;
}

const dummyItems: CurrencyItems[] = [
  { currencyName: "INVESTED", amount: 514.42, type: "USD", logoSrc: "/logo/dashboard-invested.png" },
  { currencyName: "CRM OWNED", amount: 32, type: "CRM", logoSrc: "/logo/croma.png" },
  { currencyName: "CURRENT CRM WORTH", amount: 712.42, type: "USD", logoSrc: "/logo/dashboard-crm-worth.png" },
  { currencyName: "REFERRAL EARNINGS", amount: 243.42, type: "USD", logoSrc: "/logo/dashboard-referral-earning.png" },
];

export function CurrenciesSection() {
  return (
    <motion.section
      className="relative grid grid-cols-2 md:grid-cols-4 z-10 gap-2 lg:gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {dummyItems.map((item, i) => (
        <CurrencyCard {...item} key={i} />
      ))}
    </motion.section>
  );
}
