import { InvestmentApiTypes } from "../interface";
import { getInvestmentSummary } from "./getInvestmentSummary";
import { createNewInvestment } from "./createNewInvestment";
import { getAllTransactionByAddress } from "./getAllTransactionByAddress";
import { getInvestmentLeaderboard } from "./getInvestmentLeaderboard";
import { getAllTransactions } from "./getTransactions";
import { getPaymentStatus } from "./getPaymentStatus";
import { getAllTransactionByOrderId } from "./getAllTransactionByOrderId";
import { getTotalRaised } from "./getTotalRaised";

export const apiInvestment: InvestmentApiTypes = {
  getInvestmentSummary,
  createNewInvestment,
  getAllTransactionByAddress,
  getAllTransactions,
  getInvestmentLeaderboard,
  getPaymentStatus,
  getAllTransactionByOrderId,
  getTotalRaised,
};
