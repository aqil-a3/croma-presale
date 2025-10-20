import { InvestmentDb } from "@/@types/investment";
import { ReferralBuyBonusDb } from "@/@types/referrals";
import React, { createContext, useContext } from "react";

interface MyTransactionContextTypes {
  userTransactions: InvestmentDb[];
  referralBonus: ReferralBuyBonusDb[];
}

const MyTransactionContext = createContext<MyTransactionContextTypes>(
  {} as MyTransactionContextTypes
);

interface MyTransactionProviderProps {
  userTransactions: InvestmentDb[];
  referralBonus: ReferralBuyBonusDb[];
  children: React.ReactNode;
}

export function MyTransactionProvider({
  children,
  userTransactions,
  referralBonus,
}: MyTransactionProviderProps) {
  const value: MyTransactionContextTypes = {
    userTransactions,
    referralBonus,
  };

  return (
    <MyTransactionContext.Provider value={value}>
      {children}
    </MyTransactionContext.Provider>
  );
}

export const useMyTransactionData = () => useContext(MyTransactionContext);
