import { RightSideCTAButton } from "@/featured/public/home/components/HeroSection/RightSide/CTAButton";
import { RightSidePaymentMethod } from "@/featured/public/home/components/HeroSection/RightSide/PaymentMethod";
import { RightSidePayReceive } from "@/featured/public/home/components/HeroSection/RightSide/PayReceive";
import { useState } from "react";

export function BuyCRM() {
  const [asset, setAsset] = useState<string>("ETH");
  const [usd, setUsd] = useState<number>(1);

  return (
    <div className="space-y-4">
      <RightSidePayReceive
        asset={asset}
        setAsset={setAsset}
        setUsd={setUsd}
        usd={usd}
      />
      <RightSidePaymentMethod />
      <RightSideCTAButton amountBuy={usd} payCurrency={asset} />
    </div>
  );
}
