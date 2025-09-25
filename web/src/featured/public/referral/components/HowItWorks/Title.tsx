import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

export function Title() {
  return (
    <div className="space-y-4">
      <h3
        className={`${fontOrbitron.className} ${mainGradientFont} font-semibold text-2xl lg:text-4xl text-center`}
      >
        How It Works
      </h3>
      <p className={`${fontPoppins.className} font-medium text-base lg:text-xl text-center`}>
        How it Referral program works and yo can get earn from here
      </p>
    </div>
  );
}
