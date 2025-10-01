import { serverEndpoint } from "@/config/endpoint";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const clientData = await req.json();
  const header = req.headers;
  const siweFor = header.get("siwe-for");

  if (!siweFor) {
    return NextResponse.json({ error: "Siwe For is missing" }, { status: 400 });
  }

  try {
    const { data } = await axios.post(
      `${serverEndpoint}/auth/verify/${siweFor}`,
      clientData
    );

    const token = data.token as string;

    // Buat response & set cookie
    const res = NextResponse.json({ ok: true, address: data.address });
    res.cookies.set(siweFor, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Verify error:", error?.response?.data || error.message);
    }
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }
}
