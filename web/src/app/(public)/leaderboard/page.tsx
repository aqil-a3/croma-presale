import { InvestmentLeaderboardItem } from "@/@types/investment";
import { SettingAdminDb } from "@/@types/setting-admin";
import LeaderboardTemplate from "@/components/templates/public/LeaderboardTemplate";
import { mapToTopBuyer } from "@/featured/public/leaderboard/mapper";
import { apiInvestment } from "@/services/db/investment";
import { apiSiteSettings } from "@/services/db/site-settings";
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
  const { getAllSiteSettings } = apiSiteSettings;
  const siteSettings = await getAllSiteSettings();

  const fakeBuyers = siteSettings.find(
    (setting) => setting.key === "fake_top_buyers"
  ) as SettingAdminDb<InvestmentLeaderboardItem[]>;

  const data = await getInvestmentLeaderboard({
    period: period ?? "all-time",
    limit_count: 100,
    status_filter: ["finished", "confirmed"],
  });

  const mixData = [...data, ...fakeBuyers.value];
  const topBuyers = mixData.map(mapToTopBuyer);

  return <LeaderboardTemplate topBuyers={topBuyers} />;
}
