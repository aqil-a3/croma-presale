import { LinkAndQR } from "./LinkAndQR";
import { LevelAndComission } from "./LevelAndComission";
import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { PannelContainer } from "@/components/layout/container/PanelContainer";

export function Referral() {
  return (
    <PannelContainer>
      <TitleAndSub title="Your Referral Link" sub="Share and earn" />
      <LinkAndQR />
      <LevelAndComission />
    </PannelContainer>
  );
}
