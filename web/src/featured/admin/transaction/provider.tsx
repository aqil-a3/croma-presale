import { InvestmentDb } from "@/@types/investment";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AdminTransactionContextTypes {
  transaction: InvestmentDb[];
  trxData: InvestmentDb[];
  setTrxData: React.Dispatch<React.SetStateAction<InvestmentDb[]>>;
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
  const [trxData, setTrxData] = useState<InvestmentDb[]>(transaction);

  useEffect(() => {
    setTrxData(transaction);
  }, [transaction]);

  const value: AdminTransactionContextTypes = {
    transaction,
    setTrxData,
    trxData,
  };

  return (
    <AdminTransactionContext.Provider value={value}>
      {children}
    </AdminTransactionContext.Provider>
  );
}

export const useAdminTransactionContext = () =>
  useContext(AdminTransactionContext);
