"use client";
import { Tabs } from "@/components/ui/tabs";
import { Title } from "./Title";
import { useState } from "react";
import { TabsTriggerComp } from "./TabsTrigger";
import { TabsContentComp } from "./TabsContent";
import { Indicator } from "./Indicator";
import { PANEL_BG } from "@/config/variables";

export type TabsTriggerLabel = "firtStep" | "secondStep" | "thirdStep";

export function HowToBuySection() {
  const [step, setStep] = useState<TabsTriggerLabel>("firtStep");

  return (
    <section className="relative z-10 w-full mt-8">
      <div className="mx-auto max-w-[1200px] px-6 space-y-6">
        <Title />

        <Tabs
          value={step}
          onValueChange={(e) => setStep(e as TabsTriggerLabel)}
          style={{ background: PANEL_BG }}
          className="w-full rounded-2xl border border-orange-500/50 p-4 space-y-4"
        >
          <TabsTriggerComp currValue={step} />
          <TabsContentComp />
          <Indicator currValue={step} />
        </Tabs>
      </div>
    </section>
  );
}
