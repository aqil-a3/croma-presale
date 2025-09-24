import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { Session } from "@/@types/auth";

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("croma_presale_token")?.value;

  if (!token) return null;

  try {
    const payload = verify(token, process.env.JWT_SECRET ?? "");
    return payload as Session;
  } catch (error) {
    console.log(error);
    throw error;
  }

}
