import { TopBuyer, TopBuyerWithRanks } from "@/@types/user";

/**
 * Mengurutkan TopBuyer berdasarkan totalPurchased (desc)
 * dan memberi rank mulai dari 1
 */
export function mapTopBuyersWithRanks(buyers: TopBuyer[]): TopBuyerWithRanks[] {
  return [...buyers]
    .sort((a, b) => b.totalPurchased - a.totalPurchased)
    .map((buyer, index) => ({
      ...buyer,
      rank: index + 1,
    }));
}
