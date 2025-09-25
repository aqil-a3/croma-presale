import { PANEL_BG } from "@/config/variables";
import { Title } from "./Title";
import { FormCheckAirdrop } from "./Form";

export function RightSide() {
  return (
    <div
      style={{ background: PANEL_BG }}
      className="backdrop-blur-3xl border border-orange-500 rounded-2xl p-4 lg:p-8 space-y-4 lg:space-y-8"
    >
      <Title />
      <FormCheckAirdrop />
    </div>
  );
}
