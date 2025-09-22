import { Decor } from "@/components/atoms/Decor";
import { ShieldReferralImage } from "@/components/atoms/image-decorations/ShieldReferralImage";
import { TwoFireImage } from "@/components/atoms/image-decorations/TwoFireImage";
import { MainContainer } from "@/components/layout/container/MainContainer";
import { EstimationProgresSectionInteractive } from "@/featured/public/referral/components/EstimationProgresSection";
import { HowItWorksSection } from "@/featured/public/referral/components/HowItWorks";
import { ReferralStatisticSection } from "@/featured/public/referral/components/ReferralStatisticSection";
import { ReferralTierSection } from "@/featured/public/referral/components/ReferralTierSection";
import { Title } from "@/featured/public/referral/components/Title";

export default function ReferralTemplate() {
  return (
    <MainContainer className="relative pt-52 pb-12 min-h-screen bg-center bg-cover bg-[url(/images/background/dashboard/bg-01.png)] text-white space-y-8 overflow-hidden">
      <ShieldReferralImage className="w-[335px] h-[335px] right-0 rotate-z-[15deg] opacity-75 translate-x-[25%] -translate-y-[21%]" />
      <Decor
        width={472}
        height={472}
        className="top-0 left-0 -translate-x-[20%] -translate-y-[60%]"
      />
      <Decor
        width={812}
        height={812}
        className="bottom-0 left-0 -translate-x-[50%] -translate-y-[35%]"
      />
      <TwoFireImage className="w-[581px] h-[1334px] absolute right-0 translate-x-[70%] rotate-z-60" />

      <Title />
      <ReferralStatisticSection />
      <EstimationProgresSectionInteractive />
      <ReferralTierSection />
      <HowItWorksSection />
    </MainContainer>
  );
}
