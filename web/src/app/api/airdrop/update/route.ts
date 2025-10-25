import { api } from "@/services/axios/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const wallet_address = searchParams.get("address");

  if (!wallet_address)
    return NextResponse.json({ message: "Address Required!" }, { status: 400 });

  try {
    const { data } = await api.patch(`/migration/airdrop/${wallet_address}`);

    return NextResponse.json({ message: "OK", data });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
