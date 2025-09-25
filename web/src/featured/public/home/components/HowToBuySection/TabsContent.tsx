import React from "react";
import Image from "next/image";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { TabsTriggerLabel } from ".";
import { CTA_BG, PANEL_BG } from "@/config/variables";

interface ContentData {
  title: string;
  description: string;
  imageSrc: string;
  CTAComp?: React.ReactNode;
}

const dataContent: Record<TabsTriggerLabel, ContentData> = {
  firtStep: {
    title: "Step 1 - Wallet Setup",
    description:
      "Welcome aboard! First, make sure you have a browser wallet (like MetaMask) or any wallet that supports WalletConnect. This will allow you to easily connect and start transacting.",
    imageSrc: "/images/dashboard/how-to-buy-step-1.png",
    CTAComp: <Button style={{ background: CTA_BG }}>Connect Wallet</Button>,
  },
  secondStep: {
    title: "Step 2 - Purchase Process",
    description: `Simply select your preferred currency on our website, enter the number of tokens you'd like to purchase, and click “Buy Now.”

Your wallet will prompt you to confirm the transaction`,
    imageSrc: "/images/dashboard/how-to-buy-step-2.png",
    CTAComp: <Button style={{ background: CTA_BG }}>Purchase Now</Button>,
  },
  thirdStep: {
    title: "Step 3 - Token Reception",
    description:
      "After the presale ends, your CRM Tokens will be automatically airdropped to your wallet. In the meantime, you can track your balance and token price directly from our dashboard.",
    imageSrc: "/images/dashboard/how-to-buy-step-3.png",
  },
};

const stepArray: TabsTriggerLabel[] = ["firtStep", "secondStep", "thirdStep"];

export function TabsContentComp() {
  return (
    <>
      {stepArray.map((step) => {
        const data = dataContent[step];

        return (
          <TabsContent
            key={`${step}-data`}
            value={step}
            style={{ background: PANEL_BG }}
            className="w-full p-6 rounded-2xl border border-orange-500/60 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6"
          >
            <div className="my-auto space-y-4">
              <h3
                className={`${fontOrbitron.className} text-xl lg:text-4xl font-semibold text-white`}
              >
                {data.title}
              </h3>

              <p
                className={`${fontPoppins.className} text-sm lg:text-lg font-medium leading-8 text-white whitespace-pre-line`}
              >
                {data.description}
              </p>

              {data.CTAComp}
            </div>

            <div className="flex items-center justify-center">
              <Image
                alt={`${step} image`}
                src={data.imageSrc}
                width={420}
                height={380}
                className="aspect-square object-cover"
                priority
              />
            </div>
          </TabsContent>
        );
      })}
    </>
  );
}
