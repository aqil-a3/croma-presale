import { Button } from "@/components/ui/button";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR_TW, mainGradientFont } from "@/config/variables";
import { useReferralContext } from "../../../provider";
import { baseUrl } from "@/config/endpoint";
import { toast } from "sonner";
import { useState } from "react";
import { QRDialog } from "./QRDialog";

const REFERRAL_LINK_BG =
  "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0581) 0%, rgba(255, 255, 255, 0.0308) 99.66%)";

export function LinkAndQR() {
  const { userData } = useReferralContext();
  const referralCode = userData?.referral_code;
  const referralLink = referralCode
    ? `${baseUrl}/ref/${referralCode}`
    : `Connect your wallet first!`;

  const [openQR, setOpenQR] = useState<boolean>(false);

  const copyHandler = async () => {
    if (!userData) {
      toast.info("You have to conecct your wallet to do this action!");
      return;
    }

    await navigator.clipboard.writeText(referralLink);
    toast.success("Referral Link has copied!");
    return;
  };

  const QRHandler = () => {
    if (!userData) return toast.info("You have to connect your wallet!");

    setOpenQR(true)
  };

  return (
    <div className="space-y-4">
      <p
        style={{ background: REFERRAL_LINK_BG }}
        className={`${fontPoppins.className} text-white text-sm lg:text-xl py-2 px-4 rounded-lg lg:rounded-2xl`}
      >
        {referralLink}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Button
          className={`${GRADIENT_MAIN_COLOR_TW} ${fontOrbitron.className} font-bold text-sm lg:text-base py-6`}
          onClick={copyHandler}
        >
          Copy Link
        </Button>
        <Button
          onClick={QRHandler}
          className={`${mainGradientFont} ${fontOrbitron.className} font-bold text-sm lg:text-base border border-orange-500 py-6`}
        >
          Generate QR
        </Button>
      </div>
      <QRDialog open={openQR} setOpen={setOpenQR} referralLink={referralLink} />
    </div>
  );
}
