import { InvestmentStatus } from "@/@types/investment";

export interface TransactionHistory {
  date: string;
  time: string;
  pay: { amount: number; currency: string };
  receive: { amount: number; currency: string };
  batch: { stage: number; phase: number };
  status: InvestmentStatus;
}
