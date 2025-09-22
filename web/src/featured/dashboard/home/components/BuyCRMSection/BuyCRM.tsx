import { RightSideCTAButton } from "@/featured/public/home/components/HeroSection/RightSide/CTAButton";
import { RightSidePaymentMethod } from "@/featured/public/home/components/HeroSection/RightSide/PaymentMethod";
import { RightSidePayReceive } from "@/featured/public/home/components/HeroSection/RightSide/PayReceive";

export function BuyCRM() {
  return (
    <>
      <RightSidePayReceive />
      <RightSidePaymentMethod />
      <RightSideCTAButton />
    </>
  );
}
