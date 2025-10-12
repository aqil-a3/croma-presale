import { UserDb } from "@/@types/auth";
import { serverEndpoint } from "@/config/endpoint";
import axios from "axios";

export async function getUserByReferralCode(
  referral_code?: string
): Promise<UserDb | null> {
  if (!referral_code) return null;
  try {
    const { data } = await axios.get(`${serverEndpoint}/user/ref-code/${referral_code}`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
