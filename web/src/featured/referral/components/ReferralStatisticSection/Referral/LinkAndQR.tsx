import { Button } from "@/components/ui/button";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR_TW, mainGradientFont } from "@/config/variables";
import { referralLink } from "@/featured/referral/dummy/referralLink";

const REFERRAL_LINK_BG =
  "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0581) 0%, rgba(255, 255, 255, 0.0308) 99.66%)";

export function LinkAndQR() {
  return (
    <div className="space-y-4">
      <p
        style={{ background: REFERRAL_LINK_BG }}
        className={`${fontPoppins.className} text-white text-xl py-2 px-4 rounded-2xl`}
      >
        {referralLink}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Button
          className={`${GRADIENT_MAIN_COLOR_TW} ${fontOrbitron.className} font-bold text-base py-6`}
        >
          Copy Link
        </Button>
        <Button
          className={`${mainGradientFont} ${fontOrbitron.className} font-bold text-base border border-orange-500 py-6`}
        >
          Generate QR
        </Button>
      </div>
    </div>
  );
}
