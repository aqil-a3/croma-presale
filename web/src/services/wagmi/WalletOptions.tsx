import { Button } from "@/components/ui/button";
import * as React from "react";
import { useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <Button
      key={connector.uid}
      variant={"outline"}
      onClick={() => connect({ connector })}
    >
      {connector.name}
    </Button>
  ));
}
