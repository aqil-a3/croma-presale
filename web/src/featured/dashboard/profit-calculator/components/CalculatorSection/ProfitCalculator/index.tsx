import { GradientTitleAndSeparator } from "@/components/atoms/title/GradientTitleAndSeparator";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { Investment } from "./Investment";
import { ProfitValue } from "./ProfitValue";
import { useEffect, useState } from "react";
import { useProfitCalculatorContext } from "../../../provider";

export function ProfitCalculator() {
  const { presales } = useProfitCalculatorContext();
  const activePresale = presales.find((pre) => pre.is_active);
  const [phase, setPhase] = useState<number>(activePresale?.phase ?? 1);
  const [stage, setStage] = useState<number>(activePresale?.stage ?? 1);
  const [invest, setInvest] = useState<number>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const selectedPresale = presales.find(
    (pre) => pre.phase === phase && pre.stage === stage
  );

  useEffect(() => {
    if (!selectedPresale) return;

    setCurrentPrice(selectedPresale.current_price_usd);
  }, [selectedPresale]);
  return (
    <PannelContainer className="space-y-6">
      <GradientTitleAndSeparator title="Phase Profit Calculator" />
      <Investment
        phase={phase}
        setPhase={setPhase}
        setStage={setStage}
        stage={stage}
        invest={invest}
        setInvest={setInvest}
      />
      <ProfitValue currentPrice={currentPrice} invest={invest} />
    </PannelContainer>
  );
}
