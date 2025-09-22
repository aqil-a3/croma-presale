import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { fontOrbitron } from "@/config/fonts";
import { HowItWorksSection } from "@/featured/public/referral/components/HowItWorks";
import { ReferralStatisticSection } from "@/featured/public/referral/components/ReferralStatisticSection";
import { ReferralTierSection } from "@/featured/public/referral/components/ReferralTierSection";

export default function MyReferralTemplate() {
  return (
    <DashboardContainer className="space-y-4">
      <h1
        className={`${fontOrbitron.className} text-white text-3xl font-semibold z-10 relative`}
      >
        Referral Program
      </h1>
      <ReferralStatisticSection />
      <ReferralTierSection />
      <HowItWorksSection />
    </DashboardContainer>
  );
}
