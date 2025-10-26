import { serverEndpoint } from "@/config/endpoint";

export async function getCryptoData() {

  const res = await fetch(`${serverEndpoint}/investment/estimated`, {
    headers: {
      "x-shared-key": `${process.env.CROMA_PRESALE_SHARED_SECRET_KEY}`,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Failed to fetch crypto prices");

  const data = await res.json();

  return data;
}
