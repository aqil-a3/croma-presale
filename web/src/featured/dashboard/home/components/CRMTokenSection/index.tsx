import { TitleBetweenAndDivider } from "@/components/atoms/title/TitleBetweenAndDivider";
import { PANEL_BG } from "@/config/variables";
import { PriceSection } from "./PriceSection";
import { DetailSection } from "./DetailSection";

export function CRMTokenSection() {
  return (
    <section
      style={{ background: PANEL_BG }}
      className="w-full rounded-2xl border-2 border-gray-600 p-4 space-y-4 backdrop-blur-xl"
    >
      <TitleBetweenAndDivider divider={true} leftSideText="CRM TOKEN VALUE" />
      <PriceSection />
      <DetailSection />
    </section>
  );
}
