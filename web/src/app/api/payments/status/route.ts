import { getWalletAuth } from "@/lib/auth/wallet";
import { apiInvestment } from "@/services/db/investment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { isAdmin } = await getWalletAuth();
  const { getPaymentStatus } = apiInvestment;

  if (!isAdmin)
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const payment_id = searchParams.get("payment_id");

  if (!payment_id) return NextResponse.json({ message: "Payment ID Required" });

  try {
    const payment = await getPaymentStatus(payment_id);
    return NextResponse.json({ message: "OK", payment });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
