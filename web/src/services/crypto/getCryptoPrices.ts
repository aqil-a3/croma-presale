const BASE_URL = "https://min-api.cryptocompare.com/data/pricemulti";

const ASSETS = [
  { value: "BNB", label: "Binance Coin", icon: "/logo/binance.png" },
  { value: "BTC", label: "Bitcoin", icon: "/logo/bitcoin.png" },
  { value: "COMP", label: "Compound", icon: "/logo/compound.png" },
  { value: "ETH", label: "Ethereum", icon: "/logo/eth.png" },
  { value: "ZRX", label: "0x", icon: "/logo/ox.png" },
  { value: "SOL", label: "Solana", icon: "/logo/solana.png" },
  { value: "TRX", label: "Tron", icon: "/logo/trx.png" },
  { value: "TUSD", label: "TrueUSD", icon: "/logo/tusd.png" },
  { value: "XRP", label: "XRP", icon: "/logo/xrp.png" },
];

export async function getCryptoData() {
  const symbols = ASSETS.map((a) => a.value).join(",");

  const res = await fetch(`${BASE_URL}?fsyms=${symbols}&tsyms=USD`, {
    headers: {
      authorization: `Apikey ${process.env.CRYPTOCOMPARE_API_KEY!}`,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Failed to fetch crypto prices");

  const data = await res.json();

  const prices: Record<string, number> = {};
  for (const asset of ASSETS) {
    prices[asset.value] = data[asset.value]?.USD ?? 0;
  }

  return prices;
}
