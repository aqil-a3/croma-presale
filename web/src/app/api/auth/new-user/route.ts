import { apiUser } from "@/services/db/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { createNewUser } = apiUser;
  const data = await req.json();

  try {
    await createNewUser(data.address);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
