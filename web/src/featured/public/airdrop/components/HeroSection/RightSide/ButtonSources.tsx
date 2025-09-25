import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR_TW } from "@/config/variables";
import { cn } from "@/lib/utils";
import React from "react";

const bgColor =
  "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0581) 0%, rgba(255, 255, 255, 0.0308) 99.66%)";

const buttonArrays: { value: "web" | "galxe"; label: string }[] = [
  {
    value: "web",
    label: "Web",
  },
  {
    value: "galxe",
    label: "Galxe",
  },
];

interface Props {
  value: "web" | "galxe";
  setValue: React.Dispatch<React.SetStateAction<"web" | "galxe">>;
}

export function ButtonSources({ setValue, value }: Props) {
  return (
    <div
      style={{ background: bgColor }}
      className="p-1 rounded-full w-full lg:w-[480px] h-14 lg:h-[80px] border border-gray-700 mx-auto"
    >
      {buttonArrays.map((arr, i) => {
        const isActive = arr.value === value;

        return (
          <Button
            key={i}
            type="button"
            onClick={() => setValue(arr.value)}
            className={cn(
              `${fontPoppins} h-full w-[calc(100%/2)] rounded-full bg-transparent text-white font-semibold text-2xl`,
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
