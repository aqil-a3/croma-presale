import { Investment } from "./Investment";
import { ROISlider } from "./ROISlider";
import { ROIValue } from "./ROIValue";
import { GradientTitleAndSeparator } from "@/components/atoms/title/GradientTitleAndSeparator";
import { PannelContainer } from "@/components/layout/container/PanelContainer";

export function ROICalculator() {
  return (
    <PannelContainer>
      <GradientTitleAndSeparator title="Token ROI Calculator" />

      <Investment />
      <ROISlider />
      <ROIValue />
    </PannelContainer>
  );
}
