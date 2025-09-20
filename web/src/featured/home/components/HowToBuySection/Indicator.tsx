import { cn } from "@/lib/utils";
import { TabsTriggerLabel } from ".";

export function Indicator({ currValue }: { currValue: TabsTriggerLabel }) {
  const stepArray: TabsTriggerLabel[] = ["firtStep", "secondStep", "thirdStep"];

  return (
    <div className="flex gap-2 justify-center">
      {stepArray.map((step, index) => {
        const isActive = step === currValue;

        return (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-full",
              isActive
                ? "w-8 bg-gradient-to-r from-[#B72204] to-[#FC6400]"
                : "bg-[#C5C5C5]"
            )}
          />
        );
      })}
    </div>
  );
}
