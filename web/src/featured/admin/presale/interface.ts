export interface PresaleDb {
  readonly id: number;
  readonly created_at: string;
  end_at: string;
  current_price_usd: number;
  next_price_usd: number;
  total_raised: number;
  target_raised: number;
  is_active: boolean;
  stage: number;
  phase: number;
  global_stage: number;
  crm_sold: number;
  cmc_sold: number;
  potential_value: number;
  headers_count: number;
  crm_allocated: number;
  budget_estimation: number;
  cmc_bonus_per_stage: number;
  cmc_bonus_per_usd: number;
}

export type PresaleClient = Omit<PresaleDb, "id" | "created_at">;
