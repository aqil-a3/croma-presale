import React, { createContext, useContext } from "react";
import { PresaleDb } from "./interface";

interface AdminPresaleContextTypes {
  presales: PresaleDb[];
}

const AdminPresaleContext = createContext<AdminPresaleContextTypes>(
  {} as AdminPresaleContextTypes
);

interface AdminPresaleProviderProps {
  children: React.ReactNode;
  presales: PresaleDb[];
}

export function AdminPresaleProvider({
  children,
  presales,
}: AdminPresaleProviderProps) {
  const value: AdminPresaleContextTypes = { presales };

  return (
    <AdminPresaleContext.Provider value={value}>
      {children}
    </AdminPresaleContext.Provider>
  );
}

export const useAdminPresaleContext = () => useContext(AdminPresaleContext);
