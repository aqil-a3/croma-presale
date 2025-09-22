import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { Stats } from "./Stats";
import { PannelContainer } from "@/components/layout/container/PanelContainer";

export function Statistic() {
  return (
    <PannelContainer>
      <TitleAndSub title="Your Statistic" sub="let's improve your stats" />
      <Stats />
    </PannelContainer>
  );
}
