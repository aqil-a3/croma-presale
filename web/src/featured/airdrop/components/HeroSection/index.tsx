import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export function HeroSection() {
  return (
    <section className="grid grid-cols-2 max-w-7xl mx-auto">
      <LeftSide />
      <RightSide />
    </section>
  );
}
