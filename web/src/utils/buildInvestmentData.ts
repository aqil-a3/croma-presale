import { InvestmentClient } from "@/@types/investment";
import { PresaleDb } from "@/featured/admin/presale/interface";
import { CreatePaymentResponse } from "@/services/nowpayments/interface";

export function buildInvestmentData(
  wallet_address: string,
  activePresale: PresaleDb,
  nowpayments: CreatePaymentResponse
): InvestmentClient {
  const { phase, stage, current_price_usd, cmc_bonus_per_usd } = activePresale;
  const {
    network,
    pay_amount,
    pay_currency,
    payment_id,
    payment_status,
    price_amount,
    
  } = nowpayments;

  return {
    crm_amount: price_amount / current_price_usd,
    cmc_amount: price_amount * cmc_bonus_per_usd,
    invested_usd: price_amount,
    phase,
    stage,
    network,
    pay_currency,
    pay_amount,
    order_id: String(payment_id),
    status: payment_status,
    wallet_address: wallet_address.toLowerCase(),
    receive_currency: "CRM",
  };
}
