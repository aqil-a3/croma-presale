import { useEffect, useState } from "react";
import { Investment } from "./Investment";
import { ROISlider } from "./ROISlider";
import { ROIValue } from "./ROIValue";
import { GradientTitleAndSeparator } from "@/components/atoms/title/GradientTitleAndSeparator";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { useProfitCalculatorContext } from "../../../provider";

export function ROICalculator() {
  const { presales } = useProfitCalculatorContext();
  const activePresale = presales.find((pre) => pre.is_active);

  const [tokenCRM, setTokenCRM] = useState<number>(0);
  const [investUSD, setInvestUSD] = useState<number>(0);
  const [val, setVal] = useState([5]);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (!activePresale) return;
    const currentPrice = activePresale.current_price_usd;
    const multiply = val[0];
    const newPrice = currentPrice * multiply;

    setPrice(newPrice);
  }, [val, activePresale]);

  return (
    <PannelContainer className="px-2">
      <GradientTitleAndSeparator title="Token ROI Calculator" />

      <Investment
        investUSD={investUSD}
        setInvestUSD={setInvestUSD}
        setTokenCRM={setTokenCRM}
        tokenCRM={tokenCRM}
      />
      <ROISlider setVal={setVal} val={val} />
      <ROIValue price={price} invest={investUSD} tokenCRM={tokenCRM} />
    </PannelContainer>
  );
}
