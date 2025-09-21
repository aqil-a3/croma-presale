import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { TierStep } from "./TierStep";

export function ReferralTier(){
    return(
        <PannelContainer>
            <TitleAndSub title="Referral Tiers & Rewards" sub="how your tier is determined" />
            <TierStep />
        </PannelContainer>
    )
}