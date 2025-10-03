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

import { motion } from "motion/react";
import { cardVariants, containerVariants } from "@/lib/variants";
import { usePublicPresaleContext } from "../../provider";
import { FaqDb } from "@/featured/admin/faq/interface";

const PANEL_BG_TW =
  "[background:linear-gradient(0deg,rgba(40,50,65,0),rgba(40,50,65,0)),linear-gradient(0deg,rgba(0,0,0,0.34),rgba(0,0,0,0.34)),linear-gradient(0deg,rgba(255,255,255,0.11),rgba(255,255,255,0.11))]";

const mapper = (raw: FaqDb, i: number): FAQDataType => {
  return {
    value: `faq-${(i + 1).toString().padStart(2, "0")}`,
    title: raw.title,
    description: raw.description,
  };
};

export function FAQ() {
  const [activeValue, setActiveValue] = useState<string>("faq-01");
  const { faqData: raw } = usePublicPresaleContext();
  const faqData = raw?.map((d, i) => mapper(d, i));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative z-10 border border-orange-500 rounded-2xl space-y-4 p-4 ${PANEL_BG_TW}`}
    >
      <Accordion
        type="single"
        value={activeValue}
        onValueChange={setActiveValue}
        collapsible
        className="space-y-4"
      >
        {faqData && faqData.map((data, idx) => (
          <motion.div key={data.value} variants={cardVariants}>
            <AccordionItem
              value={data.value}
              className={[
                "rounded-2xl border border-white/15 px-4",
                PANEL_BG_TW,
                "data-[state=open]:border-transparent",
                "data-[state=open]:[background:linear-gradient(90deg,#B72204_0%,#FC6400_100%)]",
              ].join(" ")}
            >
              <AccordionTrigger className=" py-4">
                <div className="flex items-center gap-2 lg:gap-4 text-left">
                  <span
                    className={`${fontOrbitron.className} text-white font-medium text-base lg:text-xl`}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <p
                    className={`${fontPoppins.className} font-semibold text-white text-base lg:text-xl`}
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
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
