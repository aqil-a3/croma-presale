import { http, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

const projectId = `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`;

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors: [walletConnect({ projectId })],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
