import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { AdminTokenPayload, Session } from "@/@types/auth";
import { NextResponse } from "next/server";

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("croma_presale_token")?.value;

  if (!token) return null;

  try {
    const payload = verify(token, process.env.JWT_SECRET ?? "");
    return payload as Session;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getDashboardSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("croma_presale_dashboard")?.value;

  if (!token) return null;

  try {
    const payload = verify(token, process.env.JWT_SECRET ?? "");
    return payload as AdminTokenPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function clearDashboardSession() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set("croma_presale_dashboard", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
