import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

export function RightSideTitle() {
  return (
    <div className="space-y-2">
      <h2
        className={`${mainGradientFont} ${fontOrbitron.className} font-bold text-2xl lg:text-4xl text-center`}
      >
        Presale $CRM
      </h2>
      <p className={`${fontPoppins.className} text-white font-medium text-base lg:text-lg text-center`}>
        1 OPZ = $0.04511
      </p>
    </div>
  );
}
