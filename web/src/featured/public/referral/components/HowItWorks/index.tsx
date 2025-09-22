import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { Title } from "./Title";
import { WorksStep } from "./WorksStep";

export function HowItWorksSection(){
    return(
        <PannelContainer>
            <Title />
            <WorksStep />
        </PannelContainer>
    )
}