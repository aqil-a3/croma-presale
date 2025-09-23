import { fontPoppins } from "@/config/fonts";
import { TokenInfo } from "../ROICalculator/TokenInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PANEL_BG, PANEL_BG_TW } from "@/config/variables";

export function Investment() {
  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      <TokenInfo title="CRM Tokens You Own" value={1000} currency="CRM" />
      <PhaseSelect />
    </div>
  );
}

const phases = Array.from({ length: 10 }, (_, i) => ({
  label: `Phase ${i + 1}`,
  value: `phase-${i + 1}`,
}));

const PhaseSelect = () => {
  const [val, setVal] = useState("phase-7");

  return (
    <div className="space-y-2">
      <p className={`${fontPoppins.className} font-bold text-base`}>
        Your Investment (USD)
      </p>

      <Select value={val} onValueChange={setVal}>
        <SelectTrigger
          style={{ background: PANEL_BG, height: "55px" }}
          className={cn(
            "w-full rounded-2xl px-4",
            "border border-gray-600 backdrop-blur-3xl",
            `${fontPoppins.className} text-white font-bold`,
            "data-[placeholder]:text-white/60"
          )}
        >
          <SelectValue placeholder="Select phase" />
        </SelectTrigger>

        <SelectContent
          className={cn(
            `rounded-2xl border border-gray-600 backdrop-blur-3xl ${PANEL_BG_TW}`,
            `${fontPoppins.className} text-white`
          )}
        >
          {phases.map((p) => (
            <SelectItem
              key={p.value}
              value={p.value}
              className="text-white font-medium focus:bg-white/50"
            >
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
