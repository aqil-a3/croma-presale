export interface Session {
  address: string;
  iat: number;
  exp: number;
}

export interface VerifConnectWallet { ok: boolean, address: string }