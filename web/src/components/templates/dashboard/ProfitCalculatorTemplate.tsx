"use client";
import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { PresaleDb } from "@/featured/admin/presale/interface";
import { CalculatorAlert } from "@/featured/dashboard/profit-calculator/components/CalculatorAlert";
import { CalculatorSection } from "@/featured/dashboard/profit-calculator/components/CalculatorSection";
import { Title } from "@/featured/dashboard/profit-calculator/components/title";
import { ProfitCalculatorProvider } from "@/featured/dashboard/profit-calculator/provider";

interface Props {
  presales: PresaleDb[];
}

export default function ProfitCalculatorTemplate({ presales }: Props) {
  return (
    <ProfitCalculatorProvider presales={presales}>
      <DashboardContainer className="space-y-4">
        <Title />
        <CalculatorSection />
        <CalculatorAlert />
      </DashboardContainer>
    </ProfitCalculatorProvider>
  );
}
