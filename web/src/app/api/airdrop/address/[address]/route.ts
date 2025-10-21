import { UserFrom } from "@/@types/user";
import { apiUser } from "@/services/db/users";
import { isAxiosError } from "axios";
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

  try {
    const data = await getMigrationDataByAddress(address.toLowerCase(), source);

    if (!data || !data.source) {
      return NextResponse.json(
        { message: `Data not found from ${source} source! Try another source!` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.status);
      return NextResponse.json({ message: "User not Found!" }, { status: 404 });
    }
  }
}
