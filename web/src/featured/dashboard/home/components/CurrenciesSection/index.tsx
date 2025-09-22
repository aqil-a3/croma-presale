import React from "react";
import { CurrencyCard } from "./CurrencyCard";

interface CurrencyItems {
  logoSrc: string;
  currencyName: string;
  type: "CRM" | "USD";
  amount: number;
}

const dummyItems: CurrencyItems[] = [
  {
    currencyName: "INVESTED",
    amount: 514.42,
    type: "USD",
    logoSrc: "/logo/dashboard-invested.png",
  },
  {
    currencyName: "CRM OWNED",
    amount: 32,
    type: "CRM",
    logoSrc: "/logo/croma.png",
  },
  {
    currencyName: "CURRENT CRM WORTH",
    amount: 712.42,
    type: "USD",
    logoSrc: "/logo/dashboard-crm-worth.png",
  },
  {
    currencyName: "REFERRAL EARNINGS",
    amount: 243.42,
    type: "USD",
    logoSrc: "/logo/dashboard-referral-earning.png",
  },
];

export function CurrenciesSection() {
  return (
    <section className="relative grid grid-cols-4 z-10 gap-4">
      {dummyItems.map((item, i) => (
        <CurrencyCard {...item} key={i} />
      ))}
    </section>
  );
}
