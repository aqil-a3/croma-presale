import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_ORANGE, mainGradientFont } from "@/config/variables";
import { CountdownType } from "../../../interface";
import { usePublicPresaleContext } from "../../../provider";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
import { getCountdown } from "@/utils/getCountdown";
import { useEffect, useState } from "react";

export function LeftSideCountdown() {
  return (
    <div className="space-y-4">
      <PresaleEndComp />
      <CountDownComp />
    </div>
  );
}

const PresaleEndComp = () => {
  const { activePresale, isLive, liveTime } = usePublicPresaleContext();

  const endAt = activePresale.end_at;
  return (
    <div
      style={{ background: GRADIENT_ORANGE }}
      className="flex justify-between items-center px-2 lg:px-8 py-4 mt-4 rounded-2xl border border-white/50 backdrop-blur-2xl"
    >
      <p
        className={`${fontPoppins.className} text-white text-base lg:text-2xl font-medium`}
      >
        {isLive ? "Presale Ends In" : "Presale Starts In"}
      </p>
      <p
        className={`${mainGradientFont} ${fontPoppins.className} text-xs lg:text-lg font-semibold`}
      >
        {formatDateTimeUTC(isLive ? endAt : liveTime)}
      </p>
    </div>
  );
};

const CountDownComp = () => {
  const { activePresale, liveTime, isLive, setIsLive } =
    usePublicPresaleContext();
  const endAt = activePresale.end_at;

  const [timeCd, setTimeCd] = useState<CountdownType[]>(() =>
    getCountdown(isLive ? endAt : liveTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeCd(getCountdown(isLive ? endAt : liveTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endAt, isLive, liveTime]);

  useEffect(() => {
    const liveDate = new Date(liveTime);
    const nowDate = new Date();

    if (liveDate < nowDate && !isLive) {
      setIsLive(true);
    }
  }, [liveTime, isLive, setIsLive, timeCd]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {timeCd.map((dum, i) => (
        <div
          key={i}
          style={{ background: GRADIENT_ORANGE }}
          className="py-2 px-2 lg:px-8 lg:py-8 shadow-2xl rounded-2xl border border-white/50 text-center backdrop-blur-2xl"
        >
          <p
            className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-xl lg:text-4xl`}
          >
            {dum.time.toString().padStart(2, "0")}
          </p>
          <p
            className={`${fontPoppins.className} text-white font-medium text-xs lg:text-base`}
          >
            {dum.label}
          </p>
        </div>
      ))}
    </div>
  );
};
