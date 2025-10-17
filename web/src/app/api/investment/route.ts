import { apiInvestment } from "@/services/db/investment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { createNewInvestment } = apiInvestment;

  try {
    await createNewInvestment(payload);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
