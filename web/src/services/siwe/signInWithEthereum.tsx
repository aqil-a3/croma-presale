// lib/siwe.ts
"use client";

import { SiweForType } from "@/@types/auth";
import { SiweMessage } from "siwe";

type SignInWithSiweArgs = {
  address: `0x${string}`;
  chainId: number;
  statement:string;
  signMessageAsync: (args: { message: string }) => Promise<`0x${string}`>;
  apiBase?: string;
  siweFor: SiweForType
};

export async function signInWithEtherium({
  address,
  chainId,
  statement,
  signMessageAsync,
  apiBase = process.env.NEXT_PUBLIC_API_URL || "",
  siweFor
}: SignInWithSiweArgs) {
  // 1) GET nonce
  const nonceRes = await fetch(`${apiBase}/auth/nonce`, {
    method: "GET",
    credentials: "include",
  });
  if (!nonceRes.ok) throw new Error("Failed to get nonce");
  const { nonce } = (await nonceRes.json()) as { nonce: string };

  // 2) Build SIWE message
  const domain = window.location.host;
  const uri = window.location.origin;

  const siwe = new SiweMessage({
    domain,
    address,
    statement,
    uri,
    version: "1",
    chainId,
    nonce,
  });

  const messageToSign = siwe.prepareMessage();

  // 3) Sign
  const signature = await signMessageAsync({ message: messageToSign });

  // 4) POST verify (set-cookie oleh backend)
  const verifyRes = await fetch(`${apiBase}/auth/verify/${siweFor}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: siwe, signature }),
  });

  if (!verifyRes.ok) {
    const text = await verifyRes.text();
    throw new Error(`SIWE verify failed: ${text}`);
  }

  return (await verifyRes.json()) as { ok: true; address: string };
}
