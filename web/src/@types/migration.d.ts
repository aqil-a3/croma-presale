export interface MigrationDataDB {
  readonly id: number;
  readonly created_at: string;
  readonly user_id: string;
  wallet_address: string;
  points: number;
  from_address: string;
}

export interface TaskUser {
  id?: number;
  createdAt?: string;
  userId: string;
  taskId: string;
  status: string;
  rewardEarned: number;
  rewardType: string;
  isBonus?: boolean;
  user?: {
    email: string;
    fullName: string;
  };
  task?: {
    title: string;
    category: string;
  };
}

export interface FullMigrationData extends MigrationDataDB {
  information: {
    userId?: string;
    email: string;
    full_name: string;
    telegram_username: string;
    discord_username: string;
    twitter_username: string;
  };
  taskProgress: TaskUser[];
}

export interface MigrationPresaleDb {
  id: number;
  created_at: string;
  wallet_address: string;
  source: string;
  points: number;
  airdrop_nft_tasks: string[];
}
