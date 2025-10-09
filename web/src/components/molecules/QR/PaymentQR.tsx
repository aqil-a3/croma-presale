import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { CreatePaymentResponse } from "@/services/nowpayments/interface";

interface PaymentQRProps {
  payment: CreatePaymentResponse | null;
}

export const PaymentQR: React.FC<PaymentQRProps> = ({ payment }) => {
  if (!payment) return null;

  const { pay_currency, network, pay_address, pay_amount, expiration_estimate_date } = payment;

  // konversi ke wei (untuk EVM seperti eth/bsc/polygon)
  const ethToWei = (amount: number) => BigInt(Math.floor(amount * 1e18)).toString();

  let qrValue = "";

  // Tentukan format QR berdasarkan network
  switch (network?.toLowerCase()) {
    case "eth":
    case "bsc":
    case "polygon":
    case "avax":
    case "arbitrum":
    case "optimism":
      qrValue = `ethereum:${pay_address}?value=${ethToWei(pay_amount)}`;
      break;
    case "trx":
    case "tron":
      qrValue = `tron:${pay_address}?amount=${pay_amount}`;
      break;
    case "btc":
      qrValue = `bitcoin:${pay_address}?amount=${pay_amount}`;
      break;
    default:
      qrValue = pay_address; // fallback — alamat saja
  }

  // format waktu expired agar rapi
  const expireAt = expiration_estimate_date
    ? new Date(expiration_estimate_date).toLocaleString()
    : null;

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <QRCodeSVG value={qrValue} size={180} />
      <div className="text-center text-sm space-y-1">
        <p>
          <strong>Send:</strong> {pay_amount} {pay_currency.toUpperCase()}
        </p>
        <p className="break-all">
          <strong>To:</strong> {pay_address}
        </p>
        <p>
          <strong>Network:</strong>{" "}
          {network.toUpperCase()}
        </p>
        {expireAt && (
          <p className="text-xs text-gray-500">
            Expires at: {expireAt}
          </p>
        )}
      </div>
    </div>
  );
};
