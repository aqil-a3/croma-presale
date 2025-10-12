"use client";
import { UserDb } from "@/@types/auth";
import { ReferralDb } from "@/@types/referrals";
import { UserReferralStatistic } from "@/@types/user";
import { EstimationProgresSectionInteractive } from "@/featured/public/referral/components/EstimationProgresSection";
import { HowItWorksSection } from "@/featured/public/referral/components/HowItWorks";
import { ReferralContainer } from "@/featured/public/referral/components/ReferralContainer";
import { ReferralStatisticSection } from "@/featured/public/referral/components/ReferralStatisticSection";
import { ReferralTierSection } from "@/featured/public/referral/components/ReferralTierSection";
import { Title } from "@/featured/public/referral/components/Title";
import { ReferralProvider } from "@/featured/public/referral/provider";

interface Props {
  userData: UserDb | null;
  referralBuyAverage: number;
  userStatistic: UserReferralStatistic | null;
  referrals: ReferralDb[];
}

export default function ReferralTemplate({
  userData,
  referralBuyAverage,
  userStatistic,
  referrals,
}: Props) {
  return (
    <ReferralProvider
      userData={userData}
      referralBuyAverage={referralBuyAverage}
      userStatistic={userStatistic}
      referrals={referrals}
    >
      <ReferralContainer>
        <Title />
        <ReferralStatisticSection />
        <EstimationProgresSectionInteractive
          ratePerClient={referralBuyAverage}
        />
        <ReferralTierSection />
        <HowItWorksSection />
      </ReferralContainer>
    </ReferralProvider>
  );
}
