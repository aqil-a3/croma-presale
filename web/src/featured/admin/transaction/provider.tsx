import { InvestmentDb } from "@/@types/investment";
import React, { createContext, useContext } from "react";

interface AdminTransactionContextTypes {
  transaction: InvestmentDb[];
}

const AdminTransactionContext = createContext<AdminTransactionContextTypes>(
  {} as AdminTransactionContextTypes
);

interface AdminTransactionProviderProps {
  transaction: InvestmentDb[];
  children: React.ReactNode;
}

export function AdminTransactionProvider({
  children,
  transaction,
}: AdminTransactionProviderProps) {
  const value: AdminTransactionContextTypes = {
    transaction,
  };
  return (
    <AdminTransactionContext.Provider value={value}>
      {children}
    </AdminTransactionContext.Provider>
  );
}

export const useAdminTransactionContext = () =>
  useContext(AdminTransactionContext);
