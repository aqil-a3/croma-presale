import { CSSProperties } from "react";
import { RightSideCTAButton } from "./CTAButton";
import { RightSidePaymentMethod } from "./PaymentMethod";
import { RightSidePayReceive } from "./PayReceive";
import { RightSideProgress } from "./Progress";
import { RightSideTitle } from "./Title";

const metrixBackground: CSSProperties = {
  background: `linear-gradient(0deg, rgba(40, 50, 65, 0), rgba(40, 50, 65, 0)),
linear-gradient(0deg, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.34)),
linear-gradient(0deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))`,
};

const metrixBorder: CSSProperties = {
  border: "2px solid",
  borderImageSource:
    "linear-gradient(108.32deg, #FC6400 0%, rgba(255, 148, 77, 0.4) 3.95%, rgba(252, 100, 0, 0.03) 98.74%)",
  borderImageSlice: 1,
  overflow: "hidden",
};

export function RightSide() {
  return (
    <div
      style={{
        ...metrixBackground,
        ...metrixBorder,
        backdropFilter: "blur(50px)",
      }}
      className="w-full p-2 lg:p-4 space-y-4"
    >
      <RightSideTitle />
      <RightSideProgress />
      <RightSidePayReceive />
      <RightSidePaymentMethod />
      <RightSideCTAButton />
    </div>
  );
}
