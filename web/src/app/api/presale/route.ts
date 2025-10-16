import { apiPresale } from "@/services/db/presale";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { createNewPresale } = apiPresale;
  const body = await req.json();

  try {
    await createNewPresale(body);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
