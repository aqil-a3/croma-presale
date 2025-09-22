import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { BuyCRMSection } from "@/featured/dashboard/home/components/BuyCRMSection";
import { CRMTokenSection } from "@/featured/dashboard/home/components/CRMTokenSection";
import { CRMValueSection } from "@/featured/dashboard/home/components/CRMValueSection";
import { CurrenciesSection } from "@/featured/dashboard/home/components/CurrenciesSection";

export default function DashboardTemplate() {
  return (
    <DashboardContainer className="space-y-4">
      <CurrenciesSection />
      <div className="relative grid grid-cols-[60%_auto] z-10 gap-4">
        <div className="flex flex-col justify-between">
          <CRMValueSection />
          <CRMTokenSection />
        </div>
        <BuyCRMSection />
      </div>
    </DashboardContainer>
  );
}
