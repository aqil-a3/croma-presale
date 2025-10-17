import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { verifyMessage } from "viem";

export async function POST(req: NextRequest) {
  const { address, siweFor, signature, message } = await req.json();
  const allowedAddress: string[] = [
    `${process.env.ADMIN_WALLET_ADDRESS?.toLowerCase()}`,
    `${process.env.DEVELOPER_WALLET_ADDRESS?.toLowerCase()}`,
  ];

  const isValid = await verifyMessage({
    address,
    message,
    signature,
  });

  if (!isValid)
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });

  const isAllowed = allowedAddress.includes(address.toLowerCase());

  if (!isAllowed)
    return NextResponse.json({ message: "Access denied!" }, { status: 401 });

  const token = jwt.sign(
    {
      address,
      isAdmin: true,
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: "1d" }
  );

  const response = NextResponse.json({ message: "OK" });

  response.cookies.set({
    name: siweFor,
    value: token,
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    path: "/admin",
  });

  return response;
}
