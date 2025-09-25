"use client";
import { Decor } from "@/components/atoms/Decor";
import { BalloonImage } from "@/components/atoms/image-decorations/BalloonImage";
import { MainContainer } from "@/components/layout/container/MainContainer";
import { HeroSection } from "@/featured/public/airdrop/components/HeroSection";
import { StayUpdatedSection } from "@/featured/public/airdrop/components/StayUpdatedSection";

export default function AirdropTemplate() {
  return (
    <MainContainer className="relative pt-52 pb-12 min-h-screen bg-center bg-cover bg-[url(/images/background/dashboard/bg-01.png)] text-white space-y-8 overflow-hidden">
      <Decor
        width={472}
        height={472}
        className="top-0 left-0 -translate-x-[20%] -translate-y-[60%]"
      />
      <BalloonImage className="hidden lg:block right-0 top-0 w-[496px] h-[744px] rotate-y-180 -translate-y-[15%] translate-x-[20%]" />

      <HeroSection />
      <StayUpdatedSection />
    </MainContainer>
  );
}
