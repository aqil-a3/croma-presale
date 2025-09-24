import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_ORANGE, mainGradientFont } from "@/config/variables";
import { CountdownType } from "../../../interface";

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
      style={{ background: GRADIENT_ORANGE }}
      className="flex justify-between items-center px-2 lg:px-8 py-4 mt-4 rounded-2xl border border-white/50 backdrop-blur-2xl"
    >
      <p
        className={`${fontPoppins.className} text-white text-base lg:text-2xl font-medium`}
      >
        Presale Ends In
      </p>
      <p
        className={`${mainGradientFont} ${fontPoppins.className} text-xs lg:text-lg font-semibold`}
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
    <div className="grid grid-cols-4 gap-4">
      {dummy.map((dum, i) => (
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
          <p className={`${fontPoppins.className} text-white font-medium text-xs lg:text-base`}>
            {dum.label}
          </p>
        </div>
      ))}
    </div>
  );
};
