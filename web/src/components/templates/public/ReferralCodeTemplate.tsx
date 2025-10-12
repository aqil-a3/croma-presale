"use client";
import { UserDb } from "@/@types/auth";
import { MainContainer } from "@/components/layout/container/MainContainer";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { ConnectButton } from "@/featured/public/home/components/HowToBuySection/TabsContent";
import { cn } from "@/lib/utils";
import { shortenAddress } from "@/utils/shortenAddress";

interface Props {
  referrer: UserDb;
}

export default function ReferralCodeTemplate({ referrer }: Props) {
  return (
    <MainContainer
      className={cn(
        fontPoppins.className,
        "min-h-screen flex items-center justify-center text-white"
      )}
    >
      <PannelContainer>
        <h1
          className={cn(
            fontOrbitron.className,
            " text-xl lg:text-5xl font-bold"
          )}
        >
          Join With Referral
        </h1>
        <p>
          You are using{" "}
          <span className="bg-orange-500 px-1 font-bold">
            {referrer.referral_code}
          </span>{" "}
          as your referral code and your inviter{" "}
          <span className="bg-orange-500 px-1 font-bold">
            {shortenAddress(referrer.wallet_address)}{" "}
          </span>
        </p>
        <p>Connect your Wallet to continue</p>
        <ConnectButton />
      </PannelContainer>
    </MainContainer>
  );
}
