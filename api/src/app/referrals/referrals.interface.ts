export type ReferralStatus = 'pending' | 'confirmed' | 'failed';

export interface ReferralDb {
  id: number;
  updated_at: string;
  created_at: string;
  wallet_address: string;
  referred_by: string;
  status: ReferralStatus;
}

export type ReferralInsert = Omit<
  ReferralDb,
  'id' | 'updated_at' | 'created_at'
>;
