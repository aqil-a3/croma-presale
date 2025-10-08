import { CreatePaymentResponse } from "@/@types/investment";

/**
 * Membuat crypto payment URI (deeplink) dari data CreatePaymentResponse.
 * 
 * Contoh output:
 * ethereum:0x2271285f2771f8FCB8717F3a28b80f68fDEF7367?value=3432670000000000
 */
export function buildCryptoPaymentURI(payment: CreatePaymentResponse): string {
  const { pay_address, pay_amount, network } = payment;

  // Default ke Ethereum scheme
  let scheme = "ethereum";

  // Mapping untuk beberapa network umum
  switch (network.toLowerCase()) {
    case "bsc":
    case "bnb":
      scheme = "bsc";
      break;
    case "polygon":
    case "matic":
      scheme = "polygon";
      break;
    case "eth":
    case "ethereum":
      scheme = "ethereum";
      break;
    case "avax":
      scheme = "avalanche";
      break;
    default:
      scheme = network.toLowerCase(); // fallback, misal "tron"
      break;
  }

  // Konversi ETH → wei (1 ETH = 1e18 wei)
  const valueWei = Math.floor(pay_amount * 1e18);

  // Bentuk URI sesuai format standar EIP-681
  const uri = `${scheme}:${pay_address}?value=${valueWei}`;

  return uri;
}
