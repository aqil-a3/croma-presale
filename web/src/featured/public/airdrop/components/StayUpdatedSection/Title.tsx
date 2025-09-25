import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

export function Title() {
  return (
    <div className="space-y-4">
      <h4
        className={`${fontOrbitron.className} ${mainGradientFont} font-semibold text-xl lg:text-3xl text-center`}
      >
        Stay Updated on Airdrop Distribution
      </h4>
      <p className={`${fontPoppins.className} text-white text-sm lg:text-xl font-medium text-center`}>
        Airdrop distribution details will be announced on our official social
        channels. Join us to get the latest news!
      </p>
    </div>
  );
}
