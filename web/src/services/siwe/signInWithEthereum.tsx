// lib/siwe.ts
"use client";

import { SiweForType } from "@/@types/auth";
import { serverEndpoint } from "@/config/endpoint";
import { SiweMessage } from "siwe";
import { api } from "../axios/server";

type SignInWithSiweArgs = {
  address: `0x${string}`;
  chainId: number;
  statement: string;
  signMessageAsync: (args: { message: string }) => Promise<`0x${string}`>;
  apiBase?: string;
  siweFor: SiweForType;
};

export async function signInWithEtherium({
  address,
  chainId,
  statement,
  signMessageAsync,
  apiBase = serverEndpoint || "",
  siweFor,
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
  await api.post(
    "/api/auth/verify",
    {
      message: siwe,
      signature,
    },
    {
      headers: {
        "siwe-for": siweFor,
      },
    }
  );
}
