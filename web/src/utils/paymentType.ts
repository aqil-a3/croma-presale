/**
 * Native coins — dikirim langsung via sendTransaction (tanpa kontrak ERC20)
 */
export const NATIVE_CURRENCIES = [
  "eth",       // Ethereum mainnet
  "bnbbsc",    // BNB Smart Chain
  "ethbase",   // Base Network
];

/**
 * Token ERC20/BEP20 yang perlu kontrak transfer()
 */
export const TOKEN_CURRENCIES = [
  "usdterc20", // USDT di Ethereum
  "usdc",      // USDC di Ethereum
  "dai",       // DAI di Ethereum
  "usdtbsc",   // USDT di BSC (BEP-20)
  "usdcbase",  // USDC di Base (ERC-20)
];

export const NON_EVM_CURRENCIES =[
  "sol",
  "usdtsol",
  "usdcsol"
]

/**
 * Cek apakah simbol pembayaran adalah native coin
 */
export function isNativeCurrency(symbol?: string): boolean {
  return !!symbol && NATIVE_CURRENCIES.includes(symbol.toLowerCase());
}

/**
 * Cek apakah simbol pembayaran adalah token ERC20/BEP20
 */
export function isTokenCurrency(symbol?: string): boolean {
  return !!symbol && TOKEN_CURRENCIES.includes(symbol.toLowerCase());
}

/**
 * Cek apakah simbol pembayaran adalah token ERC20/BEP20
 */
export function isNonEVMCurrency(symbol?: string): boolean {
  return !!symbol && NON_EVM_CURRENCIES.includes(symbol.toLowerCase());
}

