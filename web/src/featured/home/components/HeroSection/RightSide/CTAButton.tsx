import { Button } from "@/components/ui/button";
import { fontOrbitron } from "@/config/fonts";

export function RightSideCTAButton() {
  return (
    <Button
      style={{ background: "linear-gradient(90deg, #B72204 0%, #FC6400 100%)" }}
      className={`${fontOrbitron.className} text-white w-full h-[60px]`}
    >
      BUY NOW
    </Button>
  );
}
