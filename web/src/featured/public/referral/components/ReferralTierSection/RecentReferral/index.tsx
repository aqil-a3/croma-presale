import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { History } from "./History";

export function RecentReferral() {
  return (
    <PannelContainer>
      <TitleAndSub
        title="Recent Referrals"
        sub="list of the latest referrals you have received"
      />
      <History />
    </PannelContainer>
  );
}
