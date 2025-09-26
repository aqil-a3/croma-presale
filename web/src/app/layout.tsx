import { type ReactNode } from "react";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { Providers } from "@/provider/MainProvider";
import { wagmiConfig } from "@/services/wagmi/wagmiConfig";

export default async function Layout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    (await headers()).get("cookie")
  );
  return <Providers initialState={initialState}>{children}</Providers>;
}
