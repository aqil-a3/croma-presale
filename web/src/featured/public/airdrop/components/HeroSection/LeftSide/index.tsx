import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

export function LeftSide() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1
        className={`${fontOrbitron.className} ${mainGradientFont} font-black text-7xl leading-24`}
      >
        Check Your Airdrop Eligibility
      </h1>
      <p className={`${fontPoppins.className} text-white font-medium`}>
        Enter your Ethereum address to check if you are eligible for the
        CromaChain Airdrop.
      </p>
    </div>
  );
}
