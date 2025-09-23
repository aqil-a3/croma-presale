interface FAQDataType {
  value: string;
  title: string;
  description: string;
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { useState } from "react";

const PANEL_BG_TW =
  "[background:linear-gradient(0deg,rgba(40,50,65,0),rgba(40,50,65,0)),linear-gradient(0deg,rgba(0,0,0,0.34),rgba(0,0,0,0.34)),linear-gradient(0deg,rgba(255,255,255,0.11),rgba(255,255,255,0.11))]";

const faqData: FAQDataType[] = [
  {
    value: "faq-01",
    title: "What is CRM Token?",
    description:
      "CRM Token is a community-driven digital asset built on blockchain, designed to provide utility, transparency, and long-term growth opportunities. It carries a unique lava-glow branding that represents energy, power, and unstoppable momentum.",
  },
  {
    value: "faq-02",
    title: "How do I buy CRM Token?",
    description:
      "CRM Token is a community-driven digital asset built on blockchain, designed to provide utility, transparency, and long-term growth opportunities. It carries a unique lava-glow branding that represents energy, power, and unstoppable momentum.",
  },
  {
    value: "faq-03",
    title: "When will I receive my tokens?",
    description:
      "CRM Token is a community-driven digital asset built on blockchain, designed to provide utility, transparency, and long-term growth opportunities. It carries a unique lava-glow branding that represents energy, power, and unstoppable momentum.",
  },
  {
    value: "faq-04",
    title: "Is there a minimum purchase requirement?",
    description:
      "CRM Token is a community-driven digital asset built on blockchain, designed to provide utility, transparency, and long-term growth opportunities. It carries a unique lava-glow branding that represents energy, power, and unstoppable momentum.",
  },
  {
    value: "faq-05",
    title: "What currencies are accepted?",
    description:
      "CRM Token is a community-driven digital asset built on blockchain, designed to provide utility, transparency, and long-term growth opportunities. It carries a unique lava-glow branding that represents energy, power, and unstoppable momentum.",
  },
];

export function FAQ() {
  const [activeValue, setActiveValue] = useState<string>("faq-01");

  return (
    <div
      className={`relative z-10 border border-orange-500 rounded-2xl space-y-4 p-4 ${PANEL_BG_TW}`}
    >
      <Accordion
        type="single"
        value={activeValue}
        onValueChange={setActiveValue}
        collapsible
        className="space-y-4"
      >
        {faqData.map((data, idx) => (
          <AccordionItem
            key={data.value}
            value={data.value}
            className={[
              "rounded-2xl border border-white/15 px-4",
              PANEL_BG_TW,

              "data-[state=open]:border-transparent",
              "data-[state=open]:[background:linear-gradient(90deg,#B72204_0%,#FC6400_100%)]",
            ].join(" ")}
          >
            <AccordionTrigger className="px-2 py-4">
              <div className="flex items-center gap-4 text-left">
                <span
                  className={`${fontOrbitron.className} text-white font-medium text-[20px]`}
                >
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <p
                  className={`${fontPoppins.className} font-semibold text-white text-lg lg:text-xl`}
                >
                  {data.title}
                </p>
              </div>
            </AccordionTrigger>

            <AccordionContent
              className={`${fontPoppins.className} text-white/95 pb-4 pl-[52px] pr-2`}
            >
              {data.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
