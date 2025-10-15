import { UserFrom } from "@/@types/user";
import { apiUser } from "@/services/db/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { searchParams } = req.nextUrl;
  const { address } = await params;
  const source = searchParams.get("source") as UserFrom;
  const { getMigrationDataByAddress } = apiUser;

  if (!source)
    return NextResponse.json(
      { message: "Please select user from" },
      { status: 400 }
    );

  const data = await getMigrationDataByAddress(address.toLowerCase(), source);

  if (!data) {
    return NextResponse.json(
      { message: "Data not found! Have you updated your wallet?" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
