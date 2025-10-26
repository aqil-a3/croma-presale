import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont, PANEL_BG } from "@/config/variables";
import { CountdownType } from "@/featured/public/home/interface";
import { usePublicPresaleContext } from "@/featured/public/home/provider";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";
import { getCountdown } from "@/utils/getCountdown";
import { useEffect, useState } from "react";

export function PresaleEnds() {
  const { activePresale, isLive, liveTime, setIsLive } = usePublicPresaleContext();

  const dateTime = activePresale.end_at;

  const [timeCd, setTimeCd] = useState<CountdownType[]>(() =>
    getCountdown(isLive ? dateTime : liveTime )
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeCd(getCountdown(isLive ? dateTime : liveTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime, liveTime, isLive]);

    useEffect(() => {
      const liveDate = new Date(liveTime);
      const nowDate = new Date();
  
      if (liveDate < nowDate && !isLive) {
        setIsLive(true);
      }
    }, [liveTime, isLive, setIsLive, timeCd]);

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center">
      <div
        className={`${fontPoppins.className} flex flex-row lg:flex-col justify-between mb-4 lg:mb-0`}
      >
        <p className="text-[#FFFFFF99] font-medium text-sm lg:text-xl">
          {isLive ? "Presale Ends In" : "Presale Starts In"}
        </p>
        <p className={`${mainGradientFont} font-semibold text-xs lg:text-base`}>
          {formatDateTimeUTC(dateTime)}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {timeCd.map((dum, i) => (
          <div
            key={i}
            style={{ background: PANEL_BG }}
            className="p-2 rounded-2xl border border-white/50 text-center backdrop-blur-lg"
          >
            <p
              className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-2xl lg:text-3xl`}
            >
              {dum.time.toString().padStart(2, "0")}
            </p>
            <p
              className={`${fontPoppins.className} text-xs lg:text-base text-white font-medium`}
            >
              {dum.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
