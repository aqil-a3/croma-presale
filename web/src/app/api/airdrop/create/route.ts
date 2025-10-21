import { apiUser } from "@/services/db/users";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { createNewMigrationData } = apiUser;

  try {
    await createNewMigrationData(body);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    return error;
  }
}
