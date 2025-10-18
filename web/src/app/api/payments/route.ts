import { apiNowPayments } from "@/services/nowpayments";
import { CreatePaymentRequest } from "@/services/nowpayments/interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { createNewPayment } = apiNowPayments;
  const body = await req.json();

  const payload: CreatePaymentRequest = {
    pay_currency: body.payCurrency,
    price_amount: body.amountBuy,
    price_currency: "usd",
    order_description: "Buy Cromachain Coin",
    is_fixed_rate: false,
    ipn_callback_url: `https://croma-presale-131e.vercel.app/investment/payments/webhook`,
    // TESTING :
    case: "success",
  };

  try {
    const data = await createNewPayment(payload);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
