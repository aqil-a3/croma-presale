import { GradientTitleAndSeparator } from "@/components/atoms/title/GradientTitleAndSeparator";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { Investment } from "./Investment";
import { ProfitValue } from "./ProfitValue";

export function ProfitCalculator() {
  return (
    <PannelContainer className="space-y-6">
      <GradientTitleAndSeparator title="Phase Profit Calculator" />
      <Investment />
      <ProfitValue />
    </PannelContainer>
  );
}
