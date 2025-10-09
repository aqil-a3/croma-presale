import { InvestmentDb } from "@/@types/investment";
import { TransactionHistory } from "./interface";
import { formatPostgresTimestampUTC } from "@/utils/formatPostgresTimestampUTC";

export function mapToTransactionHistory(raw: InvestmentDb): TransactionHistory {
  const { date, time } = formatPostgresTimestampUTC(raw.created_at);
  return {
    batch: {
      phase: raw.phase,
      stage: raw.stage,
    },
    date,
    pay: {
      amount: raw.pay_amount,
      currency: raw.pay_currency,
    },
    receive: {
      amount: raw.crm_amount,
      currency: raw.receive_currency,
    },
    status: raw.status,
    time,
  };
}
