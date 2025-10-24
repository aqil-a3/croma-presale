import { getWalletAuth } from "@/lib/auth/wallet";
import { apiInvestment } from "@/services/db/investment";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ address: string }>;
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { isAdmin } = await getWalletAuth();
  if (!isAdmin)
    return NextResponse.json({ message: "Access Dennied" }, { status: 401 });
  const { getAllTransactionByAddress } = apiInvestment;

  const { address } = await params;
  const transaction = await getAllTransactionByAddress(address);

  if (transaction.length === 0)
    return NextResponse.json({ message: "Data Not Found!" }, { status: 404 });

  return NextResponse.json(transaction);
}
