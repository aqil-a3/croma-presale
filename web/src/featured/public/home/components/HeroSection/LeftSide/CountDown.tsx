import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import { CSSProperties } from "react";
import { CountdownType } from "../../../interface";

const cardBg: CSSProperties = {
  background: `linear-gradient(0deg, rgba(40, 50, 65, 0), rgba(40, 50, 65, 0)),
linear-gradient(0deg, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.34)),
linear-gradient(0deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))`,
};

export function LeftSideCountdown() {
  return (
    <div className="space-y-4">
      <PresaleEndComp />
      <CountDownComp />
    </div>
  );
}

const PresaleEndComp = () => {
  return (
    <div
      style={cardBg}
      className="flex justify-between items-center px-8 py-4 mt-4 rounded-2xl border border-white/50"
    >
      <p
        className={`${fontPoppins.className} text-white text-[24px] font-medium`}
      >
        Presale Ends In
      </p>
      <p
        className={`${mainGradientFont} ${fontPoppins.className} text-lg font-semibold`}
      >
        Oct 16, 2025 23:59:00 UTC
      </p>
    </div>
  );
};

const CountDownComp = () => {
  const dummy: CountdownType[] = [
    {
      label: "Days",
      time: 30,
    },
    {
      label: "Hours",
      time: 0,
    },
    {
      label: "Minutes",
      time: 27,
    },
    {
      label: "Seconds",
      time: 20,
    },
  ];
  return (
    <div className="flex justify-between">
      {dummy.map((dum, i) => (
        <div
          key={i}
          style={cardBg}
          className="py-4 px-8 shadow-2xl rounded-2xl border border-white/50 text-center"
        >
          <p
            className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-[40px]`}
          >
            {dum.time.toString().padStart(2, "0")}
          </p>
          <p className={`${fontPoppins.className} text-white font-medium`}>
            {dum.label}
          </p>
        </div>
      ))}
    </div>
  );
};

