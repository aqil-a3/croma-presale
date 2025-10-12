import { UserDb } from "@/@types/auth";
import { ReferralDb } from "@/@types/referrals";
import { UserReferralStatistic } from "@/@types/user";
import React, { createContext, useContext, useState } from "react";
import { comissionPercentage } from "./comission";

interface ReferralContextType {
  userData: UserDb | null;
  userStatistic: UserReferralStatistic | null;
  referralBuyAverage: number;
  referrals: ReferralDb[];
  comission: number;
  setComission: React.Dispatch<React.SetStateAction<number>>;
}

const ReferralContext = createContext<ReferralContextType>(
  {} as ReferralContextType
);

interface ReferralProviderProps {
  userData: UserDb | null;
  userStatistic: UserReferralStatistic | null;
  referralBuyAverage: number;
  referrals: ReferralDb[];
  children: React.ReactNode;
}

export function ReferralProvider({
  userData,
  children,
  userStatistic,
  referrals,
  referralBuyAverage,
}: ReferralProviderProps) {
  const currentComission = userStatistic
    ? comissionPercentage[userStatistic.current_tier]
    : comissionPercentage.Bronze;
  const [comission, setComission] = useState<number>(currentComission);
  const value: ReferralContextType = {
    userData,
    referralBuyAverage,
    userStatistic,
    referrals,
    comission,
    setComission,
  };

  return (
    <ReferralContext.Provider value={value}>
      {children}
    </ReferralContext.Provider>
  );
}

export const useReferralContext = () => useContext(ReferralContext);
