import { apiNowPayments } from "@/services/nowpayments";
import { CreatePaymentRequest } from "@/services/nowpayments/interface";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { createNewPayment } = apiNowPayments;
  const body = await req.json();

  const isSmall = Number(body.amountBuy) < 10;

  const payload: CreatePaymentRequest = {
    pay_currency: body.payCurrency,
    price_amount: body.amountBuy,
    price_currency: "usd",
    order_description: "Buy Cromachain Coin",
    is_fixed_rate: !isSmall, // jika < $10 → pakai floating
    ipn_callback_url: `https://croma-presale-131e.vercel.app/investment/payments/webhook`,
  };

  try {
    const data = await createNewPayment(payload);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data.data;

      return NextResponse.json(
        { message: data.message ?? "Something error" },
        { status: data.statusCode }
      );
    }
    throw error;
  }
}
