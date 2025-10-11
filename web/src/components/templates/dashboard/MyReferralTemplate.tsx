"use client";
import { UserDb } from "@/@types/auth";
import { ReferralDb } from "@/@types/referrals";
import { UserReferralStatistic } from "@/@types/user";
import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { fontOrbitron } from "@/config/fonts";
import { HowItWorksSection } from "@/featured/public/referral/components/HowItWorks";
import { ReferralStatisticSection } from "@/featured/public/referral/components/ReferralStatisticSection";
import { ReferralTierSection } from "@/featured/public/referral/components/ReferralTierSection";
import { ReferralProvider } from "@/featured/public/referral/provider";

interface Props {
  userData: UserDb | null;
  referralBuyAverage: number;
  userStatistic: UserReferralStatistic | null;
  referrals: ReferralDb[];
}

export default function MyReferralTemplate({
  referralBuyAverage,
  referrals,
  userData,
  userStatistic,
}: Props) {
  return (
    <ReferralProvider
      userData={userData}
      referralBuyAverage={referralBuyAverage}
      userStatistic={userStatistic}
      referrals={referrals}
    >
      <DashboardContainer className="space-y-4">
        <h1
          className={`${fontOrbitron.className} text-white text-xl lg:text-3xl font-semibold z-10 relative`}
        >
          Referral Program
        </h1>
        <ReferralStatisticSection />
        <ReferralTierSection />
        <HowItWorksSection />
      </DashboardContainer>
    </ReferralProvider>
  );
}
