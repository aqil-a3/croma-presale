import { FaqDb } from "@/featured/admin/faq/interface";
import { PresaleDb } from "@/featured/admin/presale/interface";
import React, { createContext, useContext } from "react";

interface PublicPresaleContextType {
  activePresale: PresaleDb;
  cryptoPrice: Record<string, number>
  faqData?: FaqDb[]
}

const PublicPresaleContext = createContext<PublicPresaleContextType>(
  {} as PublicPresaleContextType
);

interface PublicPresaleProviderProps {
  children: React.ReactNode;
  activePresale: PresaleDb;
  faqData?: FaqDb[]
  cryptoPrice: Record<string, number>
}

export function PublicPresaleProvider({
  activePresale,
  cryptoPrice,
  faqData,
  children,
}: PublicPresaleProviderProps) {
  return (
    <PublicPresaleContext.Provider value={{ activePresale, cryptoPrice, faqData }}>
      {children}
    </PublicPresaleContext.Provider>
  );
}

export const usePublicPresaleContext = () => useContext(PublicPresaleContext);
