import { VerifConnectWallet } from "@/@types/auth";
import { SiweMessage } from "siwe";

export async function getSession() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function getNonce() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/nonce`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function verify(message: SiweMessage, signature: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message, signature }),
  });
  return await res.json() as VerifConnectWallet;
}
