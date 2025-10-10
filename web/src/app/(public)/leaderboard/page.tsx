import LeaderboardTemplate from "@/components/templates/public/LeaderboardTemplate";
import { apiInvestment } from "@/services/db/investment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
};

interface Props {
  searchParams: Promise<{ period: "all-time" | "this-week" | "this-month" }>;
}

export default async function LeaderboardPage({ searchParams }: Props) {
  const { period } = await searchParams;
  const { getInvestmentLeaderboard } = apiInvestment;
  const data = await getInvestmentLeaderboard({
    period: period ?? "all-time",
    limit_count: 100,
    status_filter: ["finished", "confirmed"],
  });

  return <LeaderboardTemplate data={data} />;
}
