export interface FaqDb {
  readonly id: number;
  readonly created_at: string;
  title: string;
  description: string;
}

export type FaqClient = Omit<FaqDb, "id" | "created_at">;
