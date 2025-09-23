import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

export function LeftSideText() {
  return (
    <div className="space-y-4">
      <h1
        className={`${mainGradientFont} ${fontOrbitron.className} font-extrabold text-5xl lg:text-7xl`}
      >
        CROMACOIN <br /> PRESALE
      </h1>
      <p className={`${fontPoppins.className} text-white`}>
        Join the future of blockchain technology. Secure your $CRM tokens at the
        best price and become part of the next-generation decentralized
        ecosystem.
      </p>
    </div>
  );
}
