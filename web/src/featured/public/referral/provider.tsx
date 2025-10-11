import { UserDb } from "@/@types/auth";
import { ReferralDb } from "@/@types/referrals";
import { UserReferralStatistic } from "@/@types/user";
import React, { createContext, useContext } from "react";

interface ReferralContextType {
  userData: UserDb | null;
  userStatistic: UserReferralStatistic | null
  referralBuyAverage:number;
  referrals: ReferralDb[]
}

const ReferralContext = createContext<ReferralContextType>(
  {} as ReferralContextType
);

interface ReferralProviderProps {
  userData: UserDb | null;
  userStatistic: UserReferralStatistic | null;
  referralBuyAverage:number;
  referrals: ReferralDb[]
  children: React.ReactNode;
}

export function ReferralProvider({
  userData,
  children,
  userStatistic,
  referrals,
  referralBuyAverage
}: ReferralProviderProps) {
  const value: ReferralContextType = {
    userData,
    referralBuyAverage,
    userStatistic,
    referrals
  };

  return (
    <ReferralContext.Provider value={value}>
      {children}
    </ReferralContext.Provider>
  );
}

export const useReferralContext = () => useContext(ReferralContext)