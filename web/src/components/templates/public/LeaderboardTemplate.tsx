"use client";
import { InvestmentLeaderboardItem } from "@/@types/investment";
import { Decor } from "@/components/atoms/Decor";
import { TrophyImage } from "@/components/atoms/image-decorations/TrophyImage";
import { TwoFireImage } from "@/components/atoms/image-decorations/TwoFireImage";
import { MainContainer } from "@/components/layout/container/MainContainer";
import { LeaderboardTable } from "@/featured/public/leaderboard/components/Table";
import { Title } from "@/featured/public/leaderboard/components/Title";
// import { dummyTopBuyers } from "@/featured/public/leaderboard/dummy";
import { mapToTopBuyer } from "@/featured/public/leaderboard/mapper";
import { LeaderboardProvider } from "@/featured/public/leaderboard/provider";

interface Props {
  data: InvestmentLeaderboardItem[];
}

export default function LeaderboardTemplate({ data }: Props) {
  const topBuyers = data.map(mapToTopBuyer);
  return (
    <LeaderboardProvider data={topBuyers}>
      <MainContainer className="relative min-h-screen bg-center bg-cover bg-[url(/images/background/dashboard/bg-01.png)] pt-40 pb-12 space-y-8 overflow-hidden">
        <TrophyImage className="hidden lg:block w-[231px] h-[346px] right-0 -translate-x-[50%] -translate-y-[15%] rotate-12" />
        <TwoFireImage className="hidden lg:block lg:w-[581px] h-[1334px] absolute left-0 -translate-x-[10%] -translate-y-[25%]" />
        <TwoFireImage className="w-[581px] h-[1334px] absolute right-0 translate-x-[70%] rotate-z-60" />
        <Decor
          height={712}
          width={712}
          className="absolute top-0 right-0 lg:bottom-0 lg:left-0 lg:-translate-x-[50%] translate-x-[40%] -translate-y-[40%] lg:translate-y-[20%]"
        />

        <Title />
        <LeaderboardTable />
      </MainContainer>
    </LeaderboardProvider>
  );
}
