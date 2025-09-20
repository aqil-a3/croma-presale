"use client";
import { MainContainer } from "@/components/layout/MainContainer";
import { LeaderboardTable } from "@/featured/leaderboard/components/Table";
import { Title } from "@/featured/leaderboard/components/Title";
import { dummyTopBuyers } from "@/featured/leaderboard/dummy";
import { LeaderboardProvider } from "@/featured/leaderboard/provider";

export default function LeaderboardTemplate() {
  return (
    <LeaderboardProvider data={dummyTopBuyers}>
      <MainContainer className="min-h-screen bg-black pt-40 pb-12 space-y-8">
        <Title />
        <LeaderboardTable />
      </MainContainer>
    </LeaderboardProvider>
  );
}
