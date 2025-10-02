import { PresaleDb } from "@/featured/admin/presale/interface";
import React, { createContext, useContext } from "react";

interface PublicPresaleContextType {
  activePresale: PresaleDb;
}

const PublicPresaleContext = createContext<PublicPresaleContextType>(
  {} as PublicPresaleContextType
);

interface PublicPresaleProviderProps {
  children: React.ReactNode;
  activePresale: PresaleDb;
}

export function PublicPresaleProvider({
  activePresale,
  children,
}: PublicPresaleProviderProps) {
  return (
    <PublicPresaleContext.Provider value={{ activePresale }}>
      {children}
    </PublicPresaleContext.Provider>
  );
}

export const usePublicPresaleContext = () => useContext(PublicPresaleContext);
