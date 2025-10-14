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
import React, { useEffect, useState } from "react";
import { PANEL_BG, PANEL_BG_TW } from "@/config/variables";
import { useProfitCalculatorContext } from "../../../provider";

interface Props {
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  phase: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  invest: number;
  setInvest: React.Dispatch<React.SetStateAction<number>>;
}

export function Investment({
  phase,
  setPhase,
  setStage,
  stage,
  invest,
  setInvest,
}: Props) {
  const { presales } = useProfitCalculatorContext();
  const phaseAndStage = presales
    .sort((a, b) => {
      if (a.stage === b.stage) {
        return a.phase - b.phase;
      }
      return a.stage - b.stage;
    })
    .map((val) => ({
      label: `Stage ${val.stage} Phase ${val.phase}`,
      value: `stage-${val.stage}-phase-${val.phase}`,
    }));

  const [val, setVal] = useState<string>(`stage-${stage}-phase-${phase}`);

  useEffect(() => {
    const splittedVal = val.split("-");
    const stage = Number(splittedVal[1]);
    const phase = Number(splittedVal[3]);

    setPhase(phase);
    setStage(stage);
  }, [setPhase, setStage, val]);
  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      <TokenInfo
        title="Your Investment (USD)"
        value={invest}
        setValue={setInvest}
        currency="USD"
      />
      <PhaseSelect val={val} setVal={setVal} phases={phaseAndStage} />
    </div>
  );
}

const PhaseSelect: React.FC<{
  val: string;
  setVal: React.Dispatch<React.SetStateAction<string>>;
  phases: {
    label: string;
    value: string;
  }[];
}> = ({ setVal, val, phases }) => {
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
