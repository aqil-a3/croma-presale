import { InvestmentPayStatus } from "@/@types/investment";

export interface TransactionHistory {
  order_id: string;
  date: string;
  time: string;
  pay: { amount: number; currency: string };
  receive: { amount: number; currency: string };
  batch: { stage: number; phase: number };
  status: InvestmentPayStatus;
}
