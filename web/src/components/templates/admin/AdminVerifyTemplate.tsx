"use client";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { signInWithEtherium } from "@/services/siwe/signInWithEthereum";
import { useState } from "react";
import { useAccount, useChainId, useSignMessage } from "wagmi";

export default function AdminVerifyTemplate() {
  return (
    <AdminContainer>
      <SiweLoginButton />
    </AdminContainer>
  );
}

export function SiweLoginButton() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);

  const handleSiwe = async () => {
    if (!isConnected || !address || !chainId) return;
    try {
      setLoading(true);
      await signInWithEtherium({
        address,
        chainId,
        statement: "Sign in to accessing Admin Dashboard",
        signMessageAsync,
        siweFor: "croma_presale_dashboard",
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSiwe} disabled={!isConnected || loading}>
      {loading ? "Signing…" : "Verify wallet"}
    </button>
  );
}
