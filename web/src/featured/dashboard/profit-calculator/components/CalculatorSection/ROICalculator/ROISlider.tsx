import { Slider } from "@/components/ui/slider";
import { fontOrbitron } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";
import React, { useState } from "react";

export function ROISlider() {
  const [val, setVal] = useState([5]);
  return (
    <div className="space-y-4">
      <Title value={val} />
      <Slider value={val} onValueChange={setVal} max={10} min={1} />
      <TrackText trackValue={["1x ($0.09)", "5x ($0.45)", "10x ($0.90)"]} />
    </div>
  );
}

const Title: React.FC<{ value: number[] }> = ({ value }) => {
  return (
    <div className="flex justify-between items-center">
      <p
        className={`${fontOrbitron.className} text-2xl font-medium text-[#E9E9E9]`}
      >
        Future Price Multiplier
      </p>
      <p
        className={`${fontOrbitron.className} ${mainGradientFont} font-bold text-2xl`}
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
        <p key={i} className={`${fontOrbitron.className} text-white font-medium`}> {val}</p>
      ))}
    </div>
  );
};
