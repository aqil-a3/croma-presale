import { Decor } from "@/components/atoms/Decor";
import { ShieldReferralImage } from "@/components/atoms/image-decorations/ShieldReferralImage";
import { TwoFireImage } from "@/components/atoms/image-decorations/TwoFireImage";
import { MainContainer } from "@/components/layout/container/MainContainer";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export function ReferralContainer({ children }: Props) {
  return (
    <MainContainer className="relative px-0 pt-52 pb-12 min-h-screen bg-center bg-cover bg-[url(/images/background/dashboard/bg-01.png)] text-white space-y-8 overflow-hidden">
      <ShieldReferralImage className="hidden lg:block w-[335px] h-[335px] right-0 rotate-z-[15deg] opacity-75 translate-x-[25%] -translate-y-[21%]" />
      <Decor
        width={472}
        height={472}
        className="top-0 left-0 -translate-x-[20%] -translate-y-[60%]"
      />
      <Decor
        width={812}
        height={812}
        className="bottom-0 left-0 -translate-x-[50%] -translate-y-[35%]"
      />
      <TwoFireImage className="w-[581px] h-[1334px] absolute right-0 translate-x-[70%] rotate-z-60" />
      {children}
    </MainContainer>
  );
}
