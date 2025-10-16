import { apiPresale } from "@/services/db/presale";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: number }>;
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { editPresaleData } = apiPresale;
  const body = await req.json();
  const { id } = await params;

  try {
    await editPresaleData(body, id);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something error" }, { status: 400 });
  }
}
