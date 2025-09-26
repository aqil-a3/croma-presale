export interface WagmiCookie {
  state: {
    connections: {
      __type: "Map";
      value: [string, WagmiConnection][];
    };
    chainId: number;
    current: string | null;
  };
  version: number;
}

export interface WagmiConnection {
  accounts: string[];
  chainId: number;
  connector: {
    id: string;
    name: string;
    type: string;
    uid: string;
  };
}
