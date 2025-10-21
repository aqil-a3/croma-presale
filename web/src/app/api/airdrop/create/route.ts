import { apiUser } from "@/services/db/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { createNewMigrationData } = apiUser;

  await createNewMigrationData(body);

  return NextResponse.json({ message: "OK" }, { status: 200 });
}
