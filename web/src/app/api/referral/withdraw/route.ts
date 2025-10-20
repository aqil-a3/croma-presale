import { apiReferrals } from "@/services/db/referrals";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { createNewReferralWithdrawRequest } = apiReferrals;
  try {
    await createNewReferralWithdrawRequest(body);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
