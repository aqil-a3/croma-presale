import { SiweMessage } from "siwe";

export async function getNonce() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/nonce`, {
    credentials: "include",
  });
  return res.json();
}

export async function verify(message: SiweMessage, signature: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message, signature }),
  });
  return res.json();
}
