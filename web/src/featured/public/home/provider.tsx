import { PaymentSettingValue } from "@/@types/setting-admin";
import { FaqDb } from "@/featured/admin/faq/interface";
import { PresaleDb } from "@/featured/admin/presale/interface";
import React, { createContext, useContext } from "react";

interface PublicPresaleContextType {
  activePresale: PresaleDb;
  cryptoPrice: Record<string, number>;
  paymentMethods: PaymentSettingValue;
  faqData?: FaqDb[]
}

const PublicPresaleContext = createContext<PublicPresaleContextType>(
  {} as PublicPresaleContextType
);

interface PublicPresaleProviderProps {
  children: React.ReactNode;
  activePresale: PresaleDb;
  paymentMethods: PaymentSettingValue;
  faqData?: FaqDb[]
  cryptoPrice: Record<string, number>
}

export function PublicPresaleProvider({
  activePresale,
  cryptoPrice,
  faqData,
  paymentMethods,
  children,
}: PublicPresaleProviderProps) {
  return (
    <PublicPresaleContext.Provider value={{ activePresale, cryptoPrice, faqData, paymentMethods }}>
      {children}
    </PublicPresaleContext.Provider>
  );
}

export const usePublicPresaleContext = () => useContext(PublicPresaleContext);
