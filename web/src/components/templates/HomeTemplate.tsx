import { Background } from "@/featured/home/components/misc/background";
import { MainContainer } from "../layout/MainContainer";
import { HeroSection } from "@/featured/home/components/HeroSection";
import { Decor1 } from "@/featured/home/components/misc/decor-1";
import { PresaleProgressSection } from "@/featured/home/components/PresaleProgressSection";
import { HowToBuySection } from "@/featured/home/components/HowToBuySection";
import { FrequentlyAskedSection } from "@/featured/home/components/FrequentlyAskedSection";

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
