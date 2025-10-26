import { PaymentSettingValue } from "@/@types/setting-admin";
import { FaqDb } from "@/featured/admin/faq/interface";
import { PresaleDb } from "@/featured/admin/presale/interface";
import React, { createContext, useContext, useState } from "react";

interface PublicPresaleContextType {
  activePresale: PresaleDb;
  cryptoPrice: Record<string, number>;
  paymentMethods: PaymentSettingValue;
  totalRaised: number;
  faqData?: FaqDb[];
  // TODO : Ini nanti hapus pas udah live
  isLive: boolean;
  setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
  liveTime: string;
}

const PublicPresaleContext = createContext<PublicPresaleContextType>(
  {} as PublicPresaleContextType
);

interface PublicPresaleProviderProps {
  children: React.ReactNode;
  activePresale: PresaleDb;
  paymentMethods: PaymentSettingValue;
  totalRaised: number;
  faqData?: FaqDb[];
  cryptoPrice: Record<string, number>;
}

export function PublicPresaleProvider({
  activePresale,
  cryptoPrice,
  faqData,
  totalRaised,
  paymentMethods,
  children,
}: PublicPresaleProviderProps) {
  const [isLive, setIsLive] = useState<boolean>(false);
  const liveTime = new Date("2025-10-26T21:00:00+07:00").toISOString(); // Live 26 October 2025 14:00 UTC

  return (
    <PublicPresaleContext.Provider
      value={{
        activePresale,
        cryptoPrice,
        faqData,
        totalRaised,
        paymentMethods,
        isLive,
        liveTime,
        setIsLive,
      }}
    >
      {children}
    </PublicPresaleContext.Provider>
  );
}

export const usePublicPresaleContext = () => useContext(PublicPresaleContext);
