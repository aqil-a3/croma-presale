import { InvestmentDb } from "@/@types/investment";
import React, { createContext, useContext } from "react";

interface MyTransactionContextTypes {
  userTransactions: InvestmentDb[];
}

const MyTransactionContext = createContext<MyTransactionContextTypes>(
  {} as MyTransactionContextTypes
);

interface MyTransactionProviderProps {
  userTransactions: InvestmentDb[];
  children: React.ReactNode;
}

export function MyTransactionProvider({
  children,
  userTransactions,
}: MyTransactionProviderProps) {
  const value: MyTransactionContextTypes = {
    userTransactions,
  };

  return (
    <MyTransactionContext.Provider value={value}>
      {children}
    </MyTransactionContext.Provider>
  );
}

export const useMyTransactionData = () => useContext(MyTransactionContext);
