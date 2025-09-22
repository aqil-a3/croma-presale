import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR_TW } from "@/config/variables";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type FilterValue = "all" | "purchases" | "referral";

const bgColor =
  "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0581) 0%, rgba(255, 255, 255, 0.0308) 99.66%)";

const buttonArrays: {
  value: FilterValue;
  label: string;
}[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "purchases",
    label: "Purchases",
  },
  {
    value: "referral",
    label: "Referral Payouts",
  },
];

export function FilterButton() {
  const [value, setValue] = useState<FilterValue>("all");
  return (
    <div
      style={{ background: bgColor }}
      className="p-1 rounded-full border border-gray-700"
    >
      {buttonArrays.map((arr, i) => {
        const isActive = arr.value === value;

        return (
          <Button
            key={i}
            type="button"
            onClick={() => setValue(arr.value)}
            className={cn(
              `${fontPoppins} rounded-full bg-transparent text-white font-semibold text-xl`,
              isActive && GRADIENT_MAIN_COLOR_TW
            )}
          >
            {arr.label}
          </Button>
        );
      })}
    </div>
  );
}
