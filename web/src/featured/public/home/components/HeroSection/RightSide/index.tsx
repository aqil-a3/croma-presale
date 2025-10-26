import { useState } from "react";
import { RightSideCTAButton } from "./CTAButton";
import { RightSidePaymentMethod } from "./PaymentMethod";
import { RightSidePayReceive } from "./PayReceive";
import { RightSideProgress } from "./Progress";
import { RightSideTitle } from "./Title";
import { motion } from "motion/react";
import { fadeLeft } from "@/lib/variants";
import "./style.css";
import { usePublicPresaleContext } from "../../../provider";
import { Lock } from "lucide-react";

export function RightSide() {
  const { isLive } = usePublicPresaleContext();
  const [asset, setAsset] = useState<string>("eth");
  const [usd, setUsd] = useState<number>(1);

  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative w-full p-2 lg:p-4 space-y-4 card overflow-hidden"
    >
      <div className="card-border" />
      <RightSideTitle />
      <RightSideProgress />
      <RightSidePayReceive
        usd={usd}
        setUsd={setUsd}
        asset={asset}
        setAsset={setAsset}
      />
      <RightSidePaymentMethod />
      <RightSideCTAButton amountBuy={usd} payCurrency={asset} />

      {!isLive && <LockedOverlay /> }
    </motion.div>
  );
}

const LockedOverlay = () => {
  return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-md bg-black/40">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-white/10 p-4 rounded-full border border-white/20">
              <Lock size={40} className="text-white" />
            </div>
            <p className="text-white font-semibold text-lg">
              Presale has not started yet
            </p>
            <p className="text-white/70 text-sm">Please wait until the live time</p>
          </div>
        </div>
      )
}