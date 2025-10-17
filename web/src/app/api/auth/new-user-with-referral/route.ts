import { apiUser } from "@/services/db/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { createNewUserWithReferral } = apiUser;

  const { walletAddress, referral_code } = await req.json();

  try {
    await createNewUserWithReferral(walletAddress, referral_code);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
