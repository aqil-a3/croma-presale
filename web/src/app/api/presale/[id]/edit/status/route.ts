import { apiPresale } from "@/services/db/presale";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: Promise<{ id: number }>;
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const { patchPresaleStatus } = apiPresale;
  const { id } = await params;

  try {
    await patchPresaleStatus(id);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
