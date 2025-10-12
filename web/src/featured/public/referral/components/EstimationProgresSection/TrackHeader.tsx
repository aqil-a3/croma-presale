import { Input } from "@/components/ui/input";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

interface Props {
  clients: number;
  setClients: React.Dispatch<React.SetStateAction<number>>;
  maxClients: number;
  income: number;
}

export function TrackHeader({
  clients,
  income,
  setClients,
  maxClients,
}: Props) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.valueAsNumber;
    if (value > maxClients) return setClients(maxClients);
    if(!value) return setClients(1)
    setClients(value);
  };
  
  return (
    <div className="mt-4 flex items-start justify-between gap-4">
      <div className={`${fontPoppins.className} text-white/85`}>
        <div className="text-sm">Total accumulated clients</div>
        <Input
          type="number"
          className={`${fontOrbitron.className} text-2xl lg:text-5xl text-[#FF6A00] leading-none outline-none border-none`}
          value={clients}
          max={maxClients}
          min={1}
          onChange={changeHandler}
        />
      </div>
      <div className="text-right">
        <div className={`${fontPoppins.className} text-sm text-white/80`}>
          Your Income Per Month
        </div>
        <div
          className={`${fontOrbitron.className} text-2xl lg:text-4xl text-[#FF6A00]`}
        >
          {formatCurrency(income)}
        </div>
      </div>
    </div>
  );
}
