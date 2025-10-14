import { apiUser } from "@/services/db/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;
  const { getMigrationDataByAddress } = apiUser;

  const data = await getMigrationDataByAddress(address);

  if (!data) {
    return NextResponse.json(
      { message: "Data not found! Have you updated your wallet?" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
