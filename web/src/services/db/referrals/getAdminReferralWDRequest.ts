import { api } from "@/services/axios/server";

export async function getAdminReferralWDRequest({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  try {
    const { data } = await api.get("/referrals/withdraw", {
      params: {
        from,
        to,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
