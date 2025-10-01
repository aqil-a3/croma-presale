export interface PresaleDb {
  readonly id: number;
  readonly created_at: string;
  title: string;
  end_at: string;
  current_price_usd: number;
  total_raised: number;
  target_raised: number;
  is_active: boolean;
}

export type PresaleClient = Omit<PresaleDb, "id" | "created_at">;

export interface PresaleApiTypes {
  getAllPresale: () => Promise<PresaleDb[]>;
  createNewPresale:(data:PresaleClient) => Promise<void>
}
