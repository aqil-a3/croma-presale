import { InvestmentLeaderboardItem } from "@/@types/investment";
import { TopBuyer } from "@/@types/user";
import { shortenAddress } from "@/utils/shortenAddress";

export function mapToTopBuyer(raw: InvestmentLeaderboardItem): TopBuyer {
  return {
    smartContract: shortenAddress(raw.wallet_address),
    username: raw.username ?? "Anonymous",
    totalPurchased: raw.total_invested_usd,
  };
}
