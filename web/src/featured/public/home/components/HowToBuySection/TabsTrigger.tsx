import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsTriggerLabel } from ".";
import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { cardVariants, containerVariants } from "@/lib/variants";

const stepLabel: Record<TabsTriggerLabel, string> = {
  firtStep: "Step 1 - Wallet Setup",
  secondStep: "Step 2 - Purchase Process",
  thirdStep: "Step 3 - Token Reception",
};

const stepArray: TabsTriggerLabel[] = ["firtStep", "secondStep", "thirdStep"];

export function TabsTriggerComp({
  currValue,
}: {
  currValue: TabsTriggerLabel;
}) {
  return (
    <TabsList className="bg-transparent mx-auto h-auto lg:h-[80px] p-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-4 md:gap-2 lg:gap-4"
      >
        {stepArray.map((step) => {
          const isActive = step === currValue;
          return (
            <motion.div key={step} variants={cardVariants}>
              <TabsTrigger
                value={step}
                asChild
                className="h-[51px] p-0 data-[state=active]:bg-transparent"
              >
                <Button
                  className={cn(
                    "h-auto lg:h-[80px] w-full py-4 px-4 text-base md:text-sm lg:text-2xl font-semibold text-white bg-black/80 border-orange-500",
                    fontPoppins.className,
                    isActive &&
                      "[background:_linear-gradient(90deg,_#b72204_0%,_#fc6400_100%)] border-none"
                  )}
                >
                  {stepLabel[step]}
                </Button>
              </TabsTrigger>
            </motion.div>
          );
        })}
      </motion.div>
    </TabsList>
  );
}
