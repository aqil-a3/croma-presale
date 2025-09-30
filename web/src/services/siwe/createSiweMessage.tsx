import { SiweMessage } from "siwe";

const scheme = window.location.protocol.slice(0, -1);
const domain = window.location.host;

export function createSiweMessage(address: string, statement: string) {
  const message = new SiweMessage({
    scheme,
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
  });

  const result = message.prepareMessage();

  return result;
}
