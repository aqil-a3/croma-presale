import { apiPresale } from "@/services/db/presale";
import { getActivePresale } from "@/services/db/presale/getActivePresale";
import { apiNowPayments } from "@/services/nowpayments";
import { CreatePaymentRequest } from "@/services/nowpayments/interface";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { createNewPayment } = apiNowPayments;
  const { getRemainingCRM } = apiPresale;
  const body = await req.json();
  const { current_price_usd } = await getActivePresale();
  const totalCrm = body.amountBuy / current_price_usd;
  const remainingCRM = await getRemainingCRM();

  if (remainingCRM < totalCrm)
    return NextResponse.json(
      { message: "Purchase amount exceeds remaining CRM allocation" },
      { status: 400 }
    );

  const payload: CreatePaymentRequest = {
    pay_currency: body.payCurrency,
    price_amount: body.amountBuy,
    price_currency: "usd",
    order_description: "Buy Cromachain Coin",
    ipn_callback_url: `https://croma-presale-131e.vercel.app/investment/payments/webhook`,
  };

  try {
    const data = await createNewPayment(payload);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data.data;

      console.log(data)

      return NextResponse.json(
        { message: data.message ?? "Something error" },
        { status: data.statusCode }
      );
    }
    throw error;
  }
}
