"use client";
import DashboardLoader from "@/app/(dashboard)/loader";
import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { BuyCRMSection } from "@/featured/dashboard/home/components/BuyCRMSection";
import { CRMTokenSection } from "@/featured/dashboard/home/components/CRMTokenSection";
import { CRMValueSection } from "@/featured/dashboard/home/components/CRMValueSection";
import { CurrenciesSection } from "@/featured/dashboard/home/components/CurrenciesSection";
import { useHasHydrated } from "@/hooks/use-has-hydrated";

export default function DashboardTemplate() {
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return <DashboardLoader />;
  return (
    <DashboardContainer className="space-y-4">
      <CurrenciesSection />
      <div className="relative grid grid-cols-1 lg:grid-cols-[60%_auto] z-10 gap-4">
        <div className="flex flex-col justify-between">
          <CRMValueSection />
          <CRMTokenSection />
        </div>
        <BuyCRMSection />
      </div>
    </DashboardContainer>
  );
}
