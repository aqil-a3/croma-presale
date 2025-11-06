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
import { FaqDb } from "@/featured/admin/faq/interface";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { PaymentSettingValue } from "@/@types/setting-admin";
import { PoweredBy } from "@/featured/public/home/components/PoweredBySection";
import { AutoConnectPresale } from "@/featured/public/home/AutoConnectPresale";

export default function HomeTemplate({
  activePresale,
  cryptoPrice,
  faqData,
  paymentMethods,
  totalRaised,
}: {
  activePresale: PresaleDb;
  cryptoPrice: Record<string, number>;
  faqData: FaqDb[];
  paymentMethods: PaymentSettingValue;
  totalRaised: number;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const hasHydrated = useHasHydrated();

  const error = params.get("error");

  useEffect(() => {
    if (error === "must-login") {
      toast.error("You must connect your wallet first");

      router.replace("/home");
    }
  }, [error, router]);

  if (!hasHydrated) return null;

  return (
    <PublicPresaleProvider
      totalRaised={totalRaised}
      activePresale={activePresale}
      cryptoPrice={cryptoPrice}
      faqData={faqData}
      paymentMethods={paymentMethods}
    >
      <MainContainer className="min-h-screen pt-12 relative flex flex-col items-center justify-center overflow-hidden">
        <>
          <Decor1 />
          <Background />
        </>

        <AutoConnectPresale />
        <HeroSection />
        <PoweredBy />
        <PresaleProgressSection />
        <HowToBuySection />
        <FrequentlyAskedSection />
      </MainContainer>
    </PublicPresaleProvider>
  );
}
