export interface PresaleDb {
  readonly id: number;
  readonly created_at: string;
  end_at: string;
  current_price_usd: number;
  total_raised: number;
  target_raised: number;
  is_active: boolean;
  phase: number;
  stage: number;
}

export type PresaleClient = Omit<PresaleDb, 'id' | 'created_at'>;
