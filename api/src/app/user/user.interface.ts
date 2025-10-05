export interface UserDb {
  id: string;
  created_at: string;
  wallet_address: string;
  username: string | null;
  email: string | null;
  referred_by: string | null;
}
