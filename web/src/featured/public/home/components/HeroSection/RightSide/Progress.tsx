import { fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { usePublicPresaleContext } from "../../../provider";
import { formatNumber } from "@/utils/formatNumber";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";
import { motion } from "motion/react";

export function RightSideProgress() {
  const { activePresale, totalRaised: plusRaised } = usePublicPresaleContext();

  const crmBuy = plusRaised / activePresale.current_price_usd;
  const totalRaised = formatNumber(activePresale.total_raised + crmBuy);
  const raisedEqual = formatCurrencyWithDecimals(
    activePresale.total_raised * activePresale.current_price_usd + plusRaised,
    "USD",
    "en-US",
    2
  );
  const nextPriceUsd = formatCurrencyWithDecimals(activePresale.next_price_usd);
  return (
    <div className="space-y-2">
      <p
        className={`${fontPoppins.className} text-sm lg:text-base font-medium text-right text-white`}
      >
        Next Stage = {nextPriceUsd}
      </p>
      <ProgressBar />
      <div className={`flex justify-between ${fontPoppins.className}`}>
        <p className="text-white text-sm lg:text-base font-medium">
          Total Raised
        </p>
        <p className={`${mainGradientFont} text-xs lg:text-base font-bold`}>
          {totalRaised} CRM = {raisedEqual}
        </p>
      </div>
    </div>
  );
}

const ProgressBar = () => {
  const { activePresale } = usePublicPresaleContext();

  const raw = (activePresale.total_raised / activePresale.target_raised) * 100;
  const value = Math.max(0, Math.min(100, Math.ceil(raw)));

  return (
    <div className="relative">
      {/* Track */}
      <div
        className="h-[27px] w-full rounded-full bg-[#323336] overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        {/* Fill (width) */}
        <motion.div
          className="h-full rounded-full relative"
          style={{
            width: `${value}%`,
            background: "linear-gradient(90deg,#ff6a00 0%,#ff4d00 100%)",
            boxShadow:
              "0 0 16px rgba(255, 96, 0, .35) inset, 0 0 10px rgba(255,96,0,.25)",
          }}
          layout
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
        >
          {/* Stripes overlay (infinite) */}
          <motion.div
            className="absolute inset-0 opacity-70 mix-blend-overlay rounded-full"
            style={{
              background:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.25) 0 12px, rgba(255,255,255,0.05) 12px 24px)",
              backgroundSize: "40px 40px",
              // start position; will animate horizontally
              backgroundPositionX: 0,
              backgroundPositionY: 0,
            }}
            animate={{ backgroundPositionX: ["0px", "40px"] }}
            transition={{
              duration: 0.9,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>

      {/* Percentage label */}
      <p
        className={`${fontPoppins.className} text-white text-base font-semibold absolute left-3 top-0.5`}
      >
        {value}%
      </p>
    </div>
  );
};
