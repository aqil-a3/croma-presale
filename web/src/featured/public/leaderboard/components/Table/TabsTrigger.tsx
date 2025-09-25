import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeFilter, useLeaderboardContext } from "../../provider";
import { cn } from "@/lib/utils";
import { GRADIENT_MAIN_COLOR_TW } from "@/config/variables";
import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";

const tabLabel: Record<TimeFilter, string> = {
  "all-time": "All Time",
  "this-month": "This Month",
  "this-week": " This Week",
};

const options: TimeFilter[] = ["all-time", "this-week", "this-month"];

const TABLIST_BACKGROUND =
  "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0581) 0%, rgba(255, 255, 255, 0.0308) 99.66%)";

export function LeaderboardTableTriggerComp() {
  const { timeFilter } = useLeaderboardContext();
  return (
    <TabsList style={{ background: TABLIST_BACKGROUND }} className="mx-auto w-full lg:w-xl h-14 lg:h-20 rounded-full overflow-hidden boder-2 border-gray-500">
      {options.map((opt) => {
        const isActive = opt === timeFilter;
        return (
          <TabsTrigger key={opt} value={opt} asChild>
            <Button
              className={cn(
                `text-white bg-transparent ${fontPoppins.className} font-medium lg:text-xl overflow-hidden`,
                isActive && `${GRADIENT_MAIN_COLOR_TW}`
              )}
            >
              {tabLabel[opt]}
            </Button>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}
