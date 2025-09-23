import { fontOrbitron, fontPoppins } from "@/config/fonts";

export function Title() {
  return (
    <div className="relative z-10 flex justify-between items-center">
      <h1 className={`${fontOrbitron.className} font-semibold text-3xl`}>Profit Calculator</h1>
      <p className={`${fontPoppins.className} font-medium text-xl text-[#E9E9E9CC]`}>Calculate your potential returns with $CRM token investment</p>
    </div>
  );
}
