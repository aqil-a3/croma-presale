import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";

export function WalletSettingsTitle() {
  return (
    <div>
      <h3
        className={`${fontOrbitron.className} text-white font-semibold text-4xl`}
      >
        Wallet Settings
      </h3>
      <p className={cn(fontPoppins.className, "font-medium text-[#E9E9E9CC]")}>Set your maximum investment limit for this presale to manage risk effectively</p>
    </div>
  );
}
