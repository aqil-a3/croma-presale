import { InvestmentApiTypes } from "../interface";
import { getInvestmentSummary } from "./getInvestmentSummary";
import { createNewInvestment } from "./createNewInvestment";
import { getAllTransactionByAddress } from "./getAllTransactionByAddress";
import { getInvestmentLeaderboard } from "./getInvestmentLeaderboard";
import { getAllTransactions } from "./getTransactions";

export const apiInvestment: InvestmentApiTypes = {
  getInvestmentSummary,
  createNewInvestment,
  getAllTransactionByAddress,
  getAllTransactions,
  getInvestmentLeaderboard,
};
