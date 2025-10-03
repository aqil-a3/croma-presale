"use client";
import { Background } from "@/featured/public/home/components/misc/background";
import { MainContainer } from "../../layout/container/MainContainer";
import { HeroSection } from "@/featured/public/home/components/HeroSection";
import { Decor1 } from "@/featured/public/home/components/misc/decor-1";
import { PresaleProgressSection } from "@/featured/public/home/components/PresaleProgressSection";
import { HowToBuySection } from "@/featured/public/home/components/HowToBuySection";
import { FrequentlyAskedSection } from "@/featured/public/home/components/FrequentlyAskedSection";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PresaleDb } from "@/featured/admin/presale/interface";
import { PublicPresaleProvider } from "@/featured/public/home/provider";

export default function HomeTemplate({
  activePresale,
  cryptoPrice,
}: {
  activePresale: PresaleDb;
  cryptoPrice: Record<string, number>;
}) {
  const params = useSearchParams();
  const router = useRouter();

  const error = params.get("error");

  useEffect(() => {
    if (error === "must-login") {
      toast.error("You must connect your wallet first");

      router.replace("/home");
    }
  }, [error, router]);
  return (
    <PublicPresaleProvider activePresale={activePresale} cryptoPrice={cryptoPrice} >
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
    </PublicPresaleProvider>
  );
}
