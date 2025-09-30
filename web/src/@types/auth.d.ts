export interface AdminTokenPayload {
  address: string;
  isAdmin: boolean;
}

export interface Session {
  address: string;
  iat: number;
  exp: number;
}

export interface VerifConnectWallet {
  ok: boolean;
  address: string;
}

export type SiweForType = "croma_presale_dashboard";
