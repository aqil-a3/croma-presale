import { fontOrbitron, fontPoppins } from "@/config/fonts";

export function Title() {
  return (
    <div className="space-y-2">
      <h3
        className={`${fontOrbitron.className} text-white font-semibold text-4xl text-center`}
      >
        Get Started Now
      </h3>
      <p
        className={`${fontPoppins.className} text-[#E9E9E9CC] text-xl font-medium text-center`}
      >
        Enter your Ethereum address to check
      </p>
    </div>
  );
}
