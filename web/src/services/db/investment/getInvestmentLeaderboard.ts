import {
  GetInvestmentLeaderboardRequest,
  InvestmentLeaderboardItem,
} from "@/@types/investment";
import { api } from "@/services/axios/server";

export async function getInvestmentLeaderboard({
  period,
  limit_count,
  status_filter,
}: GetInvestmentLeaderboardRequest): Promise<InvestmentLeaderboardItem[]> {
  try {
    const { data } = await api.get("/investment/leaderboard", {
      params: {
        period,
        limit_count,
        status_filter,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
