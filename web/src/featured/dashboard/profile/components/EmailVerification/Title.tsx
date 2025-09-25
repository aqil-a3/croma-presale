import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";

export function EmailVerificationTitle() {
  return (
    <div>
      <h3
        className={`${fontOrbitron.className} text-white font-semibold text-2xl lg:text-4xl`}
      >
        Email Verification
      </h3>
      <p className={cn(fontPoppins.className, "font-medium text-[#E9E9E9CC] text-xs lg:text-base")}>Verify your email and get 15% extra tokens on your first purchase!</p>
    </div>
  );
}
