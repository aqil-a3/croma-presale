import { FooterLogo } from "./Logo";
import { Description } from "./Description";
import { SocialMedia } from "./SocialMedia";
import { FooterNavigations } from "./Navigations";
import { Preset } from "./Preset";

export function Credits() {
  return (
    <div className="w-full p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 space-y-4">
      <div className="space-y-4">
        <FooterLogo />
        <Description />
        <SocialMedia />
      </div>
      <div className="my-auto space-y-8">
        <FooterNavigations />
        <Preset />
      </div>
    </div>
  );
}
