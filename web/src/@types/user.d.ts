export interface TopBuyer {
  username: string;
  smartContract: string;
  totalPurchased: number;
}

export interface TopBuyerWithRanks extends TopBuyer {
  rank: number;
}
