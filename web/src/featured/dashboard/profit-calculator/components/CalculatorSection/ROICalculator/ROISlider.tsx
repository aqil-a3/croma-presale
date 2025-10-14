import { Slider } from "@/components/ui/slider";
import { fontOrbitron } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import React from "react";
import { useProfitCalculatorContext } from "../../../provider";
import { formatCurrencyWithDecimals } from "@/utils/formatCurrencyWithDecimals";

const getTrackValue = (currentPrice: number, multipliers: number[]) => {
  const trackValue: string[] = [];

  for (const mult of multipliers) {
    const result = currentPrice * mult;
    const value = `${mult}x (${formatCurrencyWithDecimals(
      result,
      "USD",
      "en-US",
      3
    )})`;

    trackValue.push(value);
  }

  return trackValue;
};

interface Props {
  val: number[];
  setVal: React.Dispatch<React.SetStateAction<number[]>>;
}
export function ROISlider({ setVal, val }: Props) {
  const { presales } = useProfitCalculatorContext();

  const activePresale = presales.find((pre) => pre.is_active);

  const currentPrice = activePresale!.current_price_usd;

  const trackValue = getTrackValue(currentPrice, [1, 5, 10]);

  // const trackValue
  return (
    <div className="space-y-4">
      <Title value={val} />
      <Slider value={val} onValueChange={setVal} max={10} min={1} />
      <TrackText trackValue={trackValue} />
    </div>
  );
}

const Title: React.FC<{ value: number[] }> = ({ value }) => {
  return (
    <div className="flex justify-between items-center">
      <p
        className={`${fontOrbitron.className} text-lg lg:text-2xl font-medium text-[#E9E9E9]`}
      >
        Future Price Multiplier
      </p>
      <p
        className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-lg lg:text-2xl`}
      >
        X{[value]}
      </p>
    </div>
  );
};

const TrackText: React.FC<{ trackValue: string[] }> = ({ trackValue }) => {
  return (
    <div className="flex justify-between items-center -mt-2">
      {trackValue.map((val, i) => (
        <p
          key={i}
          className={`${fontOrbitron.className} text-white font-medium`}
        >
          {" "}
          {val}
        </p>
      ))}
    </div>
  );
};
