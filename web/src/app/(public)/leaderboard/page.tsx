import LeaderboardTemplate from "@/components/templates/public/LeaderboardTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
};

export default function LeaderboardPage() {
  return <LeaderboardTemplate />;
}
