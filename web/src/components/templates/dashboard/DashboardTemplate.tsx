"use client";
import DashboardLoader from "@/app/(dashboard)/loader";
import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { PresaleDb } from "@/featured/admin/presale/interface";
import { BuyCRMSection } from "@/featured/dashboard/home/components/BuyCRMSection";
import { CRMTokenSection } from "@/featured/dashboard/home/components/CRMTokenSection";
import { CRMValueSection } from "@/featured/dashboard/home/components/CRMValueSection";
import { CurrenciesSection } from "@/featured/dashboard/home/components/CurrenciesSection";
import { PublicPresaleProvider } from "@/featured/public/home/provider";
import { useHasHydrated } from "@/hooks/use-has-hydrated";

export default function DashboardTemplate({
  activePresale,
  cryptoPrice,
}: {
  activePresale: PresaleDb;
  cryptoPrice: Record<string, number>;
}) {
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return <DashboardLoader />;
  return (
    <PublicPresaleProvider
      activePresale={activePresale}
      cryptoPrice={cryptoPrice}
    >
      <DashboardContainer className="space-y-4">
        <CurrenciesSection />
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[60%_auto] z-10 gap-4">
          <div className="flex flex-col justify-between gap-4">
            <CRMValueSection />
            <CRMTokenSection />
          </div>
          <BuyCRMSection />
        </div>
      </DashboardContainer>
    </PublicPresaleProvider>
  );
}
