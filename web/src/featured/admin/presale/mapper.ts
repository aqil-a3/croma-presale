import { toDatetimeLocalString } from "@/utils/toDatetimeLocalString";
import { PresaleDb } from "./interface";
import { PresaleFormValues } from "./schema";

export function mapDbDataToClienData(raw: PresaleDb): PresaleFormValues {
  return {
    current_price_usd: raw.current_price_usd,
    end_at: toDatetimeLocalString(raw.end_at),
    is_active: raw.is_active,
    next_price_usd: raw.next_price_usd,
    target_raised: raw.target_raised,
    phase: raw.phase,
    stage: raw.stage,
    total_raised: raw.total_raised,
    budget_estimation: raw.budget_estimation,
    cmc_bonus_per_stage: raw.cmc_bonus_per_stage,
    cmc_bonus_per_usd: raw.cmc_bonus_per_usd,
    cmc_sold: raw.cmc_sold,
    crm_allocated: raw.crm_allocated,
    crm_sold: raw.crm_sold,
    global_stage: raw.global_stage,
    headers_count: raw.headers_count,
    potential_value: raw.potential_value,
  };
}
