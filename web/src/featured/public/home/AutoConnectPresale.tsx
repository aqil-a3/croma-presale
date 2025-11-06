"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Connector, useAccount, useConnect } from "wagmi";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface TokenPayload {
  address: string;
  connector: Connector;
}

export function AutoConnectPresale() {
  const params = useSearchParams();
  const router = useRouter();
  const { connect, connectors } = useConnect({
    mutation: {
      onSuccess() {
        toast.success("Connect Wallet Success!");
        router.push("/dashboard");
      },
      onError(error) {
        console.log(`Error`, error);
      },
    },
  });
  const token = params.get("token");

  const { isConnected } = useAccount();

  useEffect(() => {
    if (!token || connectors.length < 3) return;
    if (isConnected) {
      toast.success("Connect Wallet Success!");

      router.push("/dashboard");
      return;
    }
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const targetConnector = connectors.find(
        (c) => c.name.toLowerCase() === decoded.connector.name.toLowerCase()
      );
      if (targetConnector) connect({ connector: targetConnector });
    } catch (e) {
      console.error("Invalid token", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, connectors]);

  return null;
}
