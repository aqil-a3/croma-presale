"use client";
import { MainContainer } from "@/components/layout/MainContainer";
import { Decor } from "@/featured/leaderboard/components/misc/Decor";
import { LeftFireImage } from "@/featured/leaderboard/components/misc/LeftFireImage";
import { RightFireImage } from "@/featured/leaderboard/components/misc/RightFireImage";
import { TrophyImage } from "@/featured/leaderboard/components/misc/TrophyImage";
import { LeaderboardTable } from "@/featured/leaderboard/components/Table";
import { Title } from "@/featured/leaderboard/components/Title";
import { dummyTopBuyers } from "@/featured/leaderboard/dummy";
import { LeaderboardProvider } from "@/featured/leaderboard/provider";

export default function LeaderboardTemplate() {
  return (
    <LeaderboardProvider data={dummyTopBuyers}>
      <MainContainer className="relative min-h-screen bg-black pt-40 pb-12 space-y-8 overflow-hidden">
        <TrophyImage />
        <LeftFireImage />
        <RightFireImage />
        <Decor />

        <Title />
        <LeaderboardTable />
      </MainContainer>
    </LeaderboardProvider>
  );
}
