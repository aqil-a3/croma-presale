import { Separator } from "@/components/ui/separator";
import { fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR, mainGradientFont, PANEL_BG } from "@/config/variables";
import React from "react";

interface Props {
  leftSideText?: string;
  rightSideText?: string;
  divider?: boolean;
}

export function TitleBetweenAndDivider({
  divider,
  leftSideText,
  rightSideText,
}: Props) {
  return (
    <>
      <div className="flex justify-between items-center">
        <p
          className={`${fontPoppins.className} text-[#FFFFFFCC] text-2xl font-bold`}
        >
          {leftSideText}
        </p>
        {rightSideText && <RightSideTextComp text={rightSideText} />}
      </div>
      {divider && <Separator className="bg-[#606060] my-4" />}
    </>
  );
}

const RightSideTextComp: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      className="inline-flex items-center rounded-full py-1 px-4"
      style={{
        // 1) overlay PANEL_BG (transparan) di atas isi
        // 2) base solid gelap agar isi tidak “ketiban” border
        // 3) border gradient
        background: `
        ${PANEL_BG} padding-box,
        linear-gradient(0deg, rgba(40,50,65,0.9), rgba(40,50,65,0.9)) padding-box,
          ${GRADIENT_MAIN_COLOR} border-box
        `,
        border: "1.5px solid transparent",
      }}
    >
      <span
        className={`${fontPoppins.className} ${mainGradientFont} font-semibold text-transparent bg-clip-text`}
      >
        {text}
      </span>
    </div>
  );
};
