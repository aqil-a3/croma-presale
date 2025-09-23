"use client";
import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { CalculatorAlert } from "@/featured/dashboard/profit-calculator/components/CalculatorAlert";
import { CalculatorSection } from "@/featured/dashboard/profit-calculator/components/CalculatorSection";
import { Title } from "@/featured/dashboard/profit-calculator/components/title";

export default function ProfitCalculatorTemplate() {
  return (
    <DashboardContainer className="space-y-4">
      <Title />
      <CalculatorSection />
      <CalculatorAlert />
    </DashboardContainer>
  );
}
