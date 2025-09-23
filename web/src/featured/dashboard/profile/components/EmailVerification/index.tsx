import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { EmailVerificationTitle } from "./Title";
import { EmailVerificationForm } from "./Form";

export function EmailVerification() {
  return (
    <PannelContainer>
      <EmailVerificationTitle />
      <EmailVerificationForm onSubmit={(e) => console.log(e)} />
    </PannelContainer>
  );
}
