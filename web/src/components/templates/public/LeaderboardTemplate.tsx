"use client";
import { Decor } from "@/components/atoms/Decor";
import { TrophyImage } from "@/components/atoms/image-decorations/TrophyImage";
import { TwoFireImage } from "@/components/atoms/image-decorations/TwoFireImage";
import { MainContainer } from "@/components/layout/MainContainer";
import { LeaderboardTable } from "@/featured/leaderboard/components/Table";
import { Title } from "@/featured/leaderboard/components/Title";
import { dummyTopBuyers } from "@/featured/leaderboard/dummy";
import { LeaderboardProvider } from "@/featured/leaderboard/provider";

export default function LeaderboardTemplate() {
  return (
    <LeaderboardProvider data={dummyTopBuyers}>
      <MainContainer className="relative min-h-screen bg-black pt-40 pb-12 space-y-8 overflow-hidden">
        <TrophyImage className="w-[231px] h-[346px] right-0 -translate-x-[50%] -translate-y-[15%] rotate-12" />
        <TwoFireImage className="w-[581px] h-[1334px] absolute left-0 -translate-x-[10%] -translate-y-[25%]" />
        <TwoFireImage className="w-[581px] h-[1334px] absolute right-0 translate-x-[70%] rotate-z-60" />
        <Decor
          height={712}
          width={712}
          className="absolute bottom-0 left-0 -translate-x-[50%] translate-y-[20%]"
        />

        <Title />
        <LeaderboardTable />
      </MainContainer>
    </LeaderboardProvider>
  );
}
