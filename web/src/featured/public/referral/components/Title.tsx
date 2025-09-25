import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

export function Title() {
  return (
    <div className="space-y-4 lg:max-w-4xl mx-auto">
      <h1 className={`${fontOrbitron.className} ${mainGradientFont} text-center font-black text-5xl lg:text-[80px]`}>Referral Program</h1>
      <p className={`${fontPoppins.className} text-white text-center font-medium text-sm lg:text-xl`}>
        Earn up to 15% commission by referring friends to CROMACHAIN. The more
        you refer, the higher your tier and rewards!
      </p>
    </div>
  );
}
