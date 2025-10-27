import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, bsc, mainnet, optimism, polygon } from "wagmi/chains";
import { walletConnect, injected } from "wagmi/connectors";

const projectId = `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`;

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, base, optimism, polygon],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
    key: "croma_presale_wallet_connect",
  }),
  connectors: [walletConnect({ projectId }), injected()],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
  },
});
