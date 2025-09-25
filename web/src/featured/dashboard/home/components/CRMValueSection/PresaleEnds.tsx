import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont, PANEL_BG } from "@/config/variables";
import { CountdownType } from "@/featured/public/home/interface";
import { formatDateTimeUTC } from "@/utils/formatDateTimeUTC";

export function PresaleEnds() {
  const dummyDateTime = "2025-10-16T23:59:00Z";
  const dummyCoundown: CountdownType[] = [
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
    <div className="flex flex-col lg:flex-row justify-between lg:items-center">
      <div className={`${fontPoppins.className} flex flex-row lg:flex-col justify-between mb-4 lg:mb-0`}>
        <p className="text-[#FFFFFF99] font-medium text-sm lg:text-xl">Presale Ends In</p>
        <p className={`${mainGradientFont} font-semibold text-xs lg:text-base`}>
          {formatDateTimeUTC(dummyDateTime)}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {dummyCoundown.map((dum, i) => (
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
            <p className={`${fontPoppins.className} text-xs lg:text-base text-white font-medium`}>
              {dum.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
