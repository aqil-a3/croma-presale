// type BaseToken = {
//   chainId: number;
//   decimals: number;
// };

// export type NativeToken = BaseToken & {
//   type: "native";
// };

// export type ERC20Token = BaseToken & {
//   type: "token";
//   address: `0x${string}`; // ✅ wajib ada address
// };

// export type TokenInfo = NativeToken | ERC20Token;

// /**
//  * Token registry untuk jaringan EVM (Ethereum, BSC, Base, OP, dsb)
//  * Menyimpan jenis, chainId, desimal, dan alamat kontrak token
//  */
// export const TOKENS: Record<string, TokenInfo> = {
//   // 🟣 ETH (Ethereum Mainnet)
//   ETH: { type: "native", chainId: 1, decimals: 18 },

//   // 🟢 USDTERC20 (USDT di Ethereum / ERC-20)
//   USDTERC20: {
//     type: "token",
//     chainId: 1,
//     decimals: 6,
//     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//   },

//   // 🔵 USDC (Ethereum / ERC-20)
//   USDC: {
//     type: "token",
//     chainId: 1,
//     decimals: 6,
//     address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
//   },

//   // 🟠 DAI (Ethereum / ERC-20)
//   DAI: {
//     type: "token",
//     chainId: 1,
//     decimals: 18,
//     address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//   },

//   // 🟡 BNBBSC (BNB native di BSC)
//   BNBBSC: { type: "native", chainId: 56, decimals: 18 },

//   // 🔵 ETHBASE (ETH native di Base)
//   ETHBASE: { type: "native", chainId: 8453, decimals: 18 },
// };


// export type TokenSymbol = keyof typeof TOKENS;

type BaseToken = {
  chainId: number;
  decimals: number;
};

export type NativeToken = BaseToken & {
  type: "native";
};

export type ERC20Token = BaseToken & {
  type: "token";
  address: `0x${string}`; // ✅ wajib ada address
};

export type TokenInfo = NativeToken | ERC20Token;

/**
 * Token registry untuk jaringan EVM (Ethereum, BSC, Base, dsb)
 * Menyimpan jenis, chainId, desimal, dan alamat kontrak token.
 *
 * Sinkron dengan metode pembayaran:
 * eth, bnbbsc, ethbase, dai, usdc, usdcbase, usdtbsc
 */
export const TOKENS: Record<string, TokenInfo> = {
  // 🟣 Ethereum Mainnet (Chain ID: 1)
  ETH: {
    type: "native",
    chainId: 1,
    decimals: 18,
  },
  DAI: {
    type: "token",
    chainId: 1,
    decimals: 18,
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  USDC: {
    type: "token",
    chainId: 1,
    decimals: 6,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  // (opsional, kalau mau USDT di Ethereum juga bisa tambahkan)
  USDTERC20: {
    type: "token",
    chainId: 1,
    decimals: 6,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },

  // 🟡 Binance Smart Chain (Chain ID: 56)
  BNBBSC: {
    type: "native",
    chainId: 56,
    decimals: 18,
  },
  USDTBSC: {
    type: "token",
    chainId: 56,
    decimals: 18,
    address: "0x55d398326f99059fF775485246999027B3197955", // ✅ USDT BEP-20
  },

  // 🔵 Base Mainnet (Chain ID: 8453)
  ETHBASE: {
    type: "native",
    chainId: 8453,
    decimals: 18,
  },
  USDCBASE: {
    type: "token",
    chainId: 8453,
    decimals: 6,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // ✅ USDC on Base
  },
};

export type TokenSymbol = keyof typeof TOKENS;
