import { Button } from "@/components/ui/button";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { CTA_BG } from "@/config/variables";

export function Title() {
  return (
    <div className="relative flex justify-between z-10">
      <div className="space-y-2">
        <h3
          className={`${fontOrbitron.className} text-white text-[40px] font-bold`}
        >
          Frequently Asked Questions
        </h3>
        <p
          className={`${fontPoppins.className} text-[#A6A6A6] text-xl font-medium `}
        >
          Still have questions? Don&apos;t worry
        </p>
      </div>
      <Button
        style={{ background: CTA_BG }}
        className={`${fontOrbitron.className} text-lg py-6 my-auto`}
      >
        Contact Us
      </Button>
    </div>
  );
}
