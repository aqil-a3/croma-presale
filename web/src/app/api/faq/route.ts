import { FaqDb } from "@/featured/admin/faq/interface";
import { apiFAQ } from "@/services/db/faq";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { createNewFAQ } = apiFAQ;

  const body = await req.json();

  await createNewFAQ(body);

  return NextResponse.json({ message: "OK" });
}

export async function PUT(req: NextRequest) {
  const { editFAQ } = apiFAQ;
  const { data, old } = await req.json();

  const edittedData: FaqDb = {
    created_at: old.created_at,
    description: data.description,
    id: old.id,
    title: data.title,
  };

  await editFAQ(edittedData);
  return NextResponse.json({ message: "OK" });
}
