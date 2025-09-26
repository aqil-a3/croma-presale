import { fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";

interface WorksStepItemType {
  title: string;
  description: string;
}

const worksStepItems: WorksStepItemType[] = [
  {
    title: "Share Your Link",
    description:
      "Copy your unique referral link and share it with friends, family, or on social media.",
  },
  {
    title: "Friends Purchase",
    description:
      "When someone uses your link to buy CROMA tokens, you earn a commission based on your tier.",
  },
  {
    title: "Earn Rewards",
    description:
      "Claim your earnings anytime and watch your tier level increase with more referrals.",
  },
];

export function WorksStep() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {worksStepItems.map((item, i) => (
        <div
          style={{ background: PANEL_BG }}
          className={`border border-gray-600 rounded-2xl px-4 py-8 ${fontPoppins.className} space-y-2 lg:space-y-4`}
          key={i}
        >
          <p className="backdrop-blur-2xl bg-[#FFFFFF12] w-fit px-4.5 py-2 rounded-full border border-gray-600 font-medium text-xl">
            {i + 1}
          </p>
          <p className="font-semibold text-xl lg:text-2xl">{item.title}</p>
          <p className="font-medium text-base lg:text-xl text-[#E9E9E999]">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
