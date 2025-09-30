import { RightSideCTAButton } from "@/featured/public/home/components/HeroSection/RightSide/CTAButton";
import { RightSidePaymentMethod } from "@/featured/public/home/components/HeroSection/RightSide/PaymentMethod";
import { RightSidePayReceive } from "@/featured/public/home/components/HeroSection/RightSide/PayReceive";

export function BuyCRM() {
  return (
    <div className="space-y-4">
      <RightSidePayReceive />
      <RightSidePaymentMethod />
      <RightSideCTAButton />
    </div>
  );
}
