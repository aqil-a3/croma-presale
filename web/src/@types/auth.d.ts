export interface AdminTokenPayload {
  address: string;
  isAdmin: boolean;
}

export interface Session {
  address: string;
  iat: number;
  exp: number;
}

export type SiweForType = "croma_presale_dashboard";

export interface UserDb {
  id: string;
  created_at: string;
  wallet_address: string;
  username: string | null;
  email: string | null;
  referred_by: string | null;
  referral_code:string;
}

export interface VerifConnectWallet {
  ok: boolean;
  address: string;
}
