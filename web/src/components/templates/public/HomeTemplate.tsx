"use client";
import { Background } from "@/featured/public/home/components/misc/background";
import { MainContainer } from "../../layout/container/MainContainer";
import { HeroSection } from "@/featured/public/home/components/HeroSection";
import { Decor1 } from "@/featured/public/home/components/misc/decor-1";
import { PresaleProgressSection } from "@/featured/public/home/components/PresaleProgressSection";
import { HowToBuySection } from "@/featured/public/home/components/HowToBuySection";
import { FrequentlyAskedSection } from "@/featured/public/home/components/FrequentlyAskedSection";

export default function HomeTemplate() {
  return (
    <MainContainer className="min-h-screen pt-12 relative flex flex-col items-center justify-center overflow-hidden">
      <>
        <Decor1 />
        <Background />
      </>

      <HeroSection />
      <PresaleProgressSection />
      <HowToBuySection />
      <FrequentlyAskedSection />
    </MainContainer>
  );
}
