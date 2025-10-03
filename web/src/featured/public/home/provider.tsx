import { PresaleDb } from "@/featured/admin/presale/interface";
import React, { createContext, useContext } from "react";

interface PublicPresaleContextType {
  activePresale: PresaleDb;
  cryptoPrice: Record<string, number>
}

const PublicPresaleContext = createContext<PublicPresaleContextType>(
  {} as PublicPresaleContextType
);

interface PublicPresaleProviderProps {
  children: React.ReactNode;
  activePresale: PresaleDb;
  cryptoPrice: Record<string, number>
}

export function PublicPresaleProvider({
  activePresale,
  cryptoPrice,
  children,
}: PublicPresaleProviderProps) {
  return (
    <PublicPresaleContext.Provider value={{ activePresale, cryptoPrice }}>
      {children}
    </PublicPresaleContext.Provider>
  );
}

export const usePublicPresaleContext = () => useContext(PublicPresaleContext);
