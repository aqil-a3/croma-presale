import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { PersonalInformationTitle } from "./Title";
import { PersonalInformationForm } from "./Form";

export function PersonalInformation() {
  return (
    <PannelContainer>
      <PersonalInformationTitle />
      <PersonalInformationForm onSubmit={(e) => console.log(e)} />
    </PannelContainer>
  );
}
