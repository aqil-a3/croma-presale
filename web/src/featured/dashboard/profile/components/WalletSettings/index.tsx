import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { WalletSettingsTitle } from "./WalletTitle";
import { WalletSettingsForm } from "./Form";

export function WalletSettings() {
  return (
    <PannelContainer>
      <WalletSettingsTitle />
      <WalletSettingsForm onSubmit={(e) => console.log(e)} />
    </PannelContainer>
  );
}
