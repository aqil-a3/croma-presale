import { Investment } from "./Investment";
import { ROISlider } from "./ROISlider";
import { ROIValue } from "./ROIValue";
import { GradientTitleAndSeparator } from "@/components/atoms/title/GradientTitleAndSeparator";
import { PannelContainer } from "@/components/layout/container/PanelContainer";

export function ROICalculator() {
  return (
    <PannelContainer className="px-2">
      <GradientTitleAndSeparator title="Token ROI Calculator" />

      <Investment />
      <ROISlider />
      <ROIValue />
    </PannelContainer>
  );
}
