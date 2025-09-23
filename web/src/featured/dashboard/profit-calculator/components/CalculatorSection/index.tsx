import { ProfitCalculator } from "./ProfitCalculator";
import { ROICalculator } from "./ROICalculator";

export function CalculatorSection() {
  return (
    <div className="relative z-10 grid grid-cols-2 gap-4">
      <ROICalculator />
      <ProfitCalculator />
    </div>
  );
}
