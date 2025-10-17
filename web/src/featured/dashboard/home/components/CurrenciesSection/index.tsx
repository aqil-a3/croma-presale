"use client";

import React from "react";
import { CurrencyCard } from "./CurrencyCard";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/variants";
import { InvestmentSummary } from "@/@types/investment";
import { ReferralRewardsDB } from "@/@types/referrals";

interface CurrencyItems {
  logoSrc: string;
  currencyName: string;
  type: "CRM" | "USD" | string;
  amount: number;
}

interface Props {
  investment: InvestmentSummary;
  referralRewards: ReferralRewardsDB[];
}

export function CurrenciesSection({ investment, referralRewards }: Props) {

  const rewardAmount = referralRewards.reduce(
    (acc, curr) => acc + curr.bonus_amount,
    0
  );

  const items: CurrencyItems[] = [
    {
      currencyName: "$CRM BALANCE",
      amount: investment.crm_owned,
      type: "CRM",
      logoSrc: "/logo/crm-coin.png",
    },
    {
      currencyName: "$CMC BALANCE",
      amount: investment.cmc_owned,
      type: "CMC",
      logoSrc: "/logo/crc_token_logo.png",
    },
    {
      currencyName: "CURRENT VALUE",
      amount: investment.invested_usd,
      type: "USD",
      logoSrc: "/logo/dashboard-crm-worth.png",
    },
    {
      currencyName: "REFERRAL EARNINGS",
      amount: rewardAmount,
      type: "USD",
      logoSrc: "/logo/dashboard-referral-earning.png",
    },
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
