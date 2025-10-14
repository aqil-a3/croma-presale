import { PresaleDb } from "@/featured/admin/presale/interface";
import React, { createContext, useContext } from "react";

interface ProfitCalculatorContextTypes {
  presales: PresaleDb[];
}

const ProfitCalculatorContext = createContext<ProfitCalculatorContextTypes>(
  {} as ProfitCalculatorContextTypes
);

interface ProfitCalculatorProviderProps {
  presales: PresaleDb[];
  children: React.ReactNode;
}

export function ProfitCalculatorProvider({
  presales,
  children,
}: ProfitCalculatorProviderProps) {
  const value: ProfitCalculatorContextTypes = {
    presales,
  };

  return (
    <ProfitCalculatorContext.Provider value={value}>
      {children}
    </ProfitCalculatorContext.Provider>
  );
}

export const useProfitCalculatorContext = () =>
  useContext(ProfitCalculatorContext);
