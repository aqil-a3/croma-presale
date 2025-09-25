import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

export function Title() {
  return (
    <div className="space-y-4">
      <h1
        className={`${fontOrbitron.className} ${mainGradientFont} font-black text-4xl lg:text-7xl text-center`}
      >
        Top Buyers
      </h1>
      <p
        className={`${fontPoppins.className} text-sm lg:text-xl text-white font-medium text-center`}
      >
        Discover the biggest CROMACHAIN supporters and their investment journey
      </p>
    </div>
  );
}
