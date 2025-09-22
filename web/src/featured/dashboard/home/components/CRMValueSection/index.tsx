import { TitleBetweenAndDivider } from "@/components/atoms/title/TitleBetweenAndDivider";
import { PANEL_BG } from "@/config/variables";
import { ProgressBar } from "./ProgressBar";
import { PresaleEnds } from "./PresaleEnds";

export function CRMValueSection() {
  return (
    <div
      style={{ background: PANEL_BG }}
      className="w-full rounded-2xl border-2 border-gray-600 p-4 space-y-2 backdrop-blur-xl"
    >
      <TitleBetweenAndDivider
        divider={true}
        leftSideText="CRM VALUE"
        rightSideText="Stage 27 - Phase 9"
      />
      <ProgressBar />
      <PresaleEnds />
    </div>
  );
}
