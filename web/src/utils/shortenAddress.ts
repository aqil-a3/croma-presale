/**
 * Potong smart contract address biar lebih singkat
 * @param address full address (contoh: 0xF37e...E917)
 * @param start panjang prefix (default 6)
 * @param end panjang suffix (default 4)
 */
export function shortenAddress(
  address: string,
  start: number = 6,
  end: number = 4
): string {
  if (!address) return "";
  if (address.length <= start + end) return address;

  return `${address.slice(0, start)}...${address.slice(-end)}`;
}
